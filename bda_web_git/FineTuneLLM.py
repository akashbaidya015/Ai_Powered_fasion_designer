import os
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, TrainingArguments, Trainer
from datasets import load_dataset
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training

# Replace with the path to your dataset
DATASET_PATH = "Dataset/llm_dataset.csv"

# Replace with your Hugging Face model details
MODEL_NAME = "meta-llama/Llama-2-7b-hf"
TOKEN = "your_huggingface_token_here"  # Replace with your actual Hugging Face token

# Load the tokenizer
print("Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(
    MODEL_NAME,
    token=TOKEN
)

# Load the model and prepare for LoRA
print("Loading model...")
model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    token=TOKEN,
    device_map="auto",      # Automatically map model layers to devices
    load_in_8bit=True       # Use 8-bit precision
)

# Prepare the model for k-bit training
print("Preparing model for LoRA...")
model = prepare_model_for_kbit_training(model)

# Configure LoRA
lora_config = LoraConfig(
    r=8,                  # Rank of the LoRA adaptation
    lora_alpha=32,        # Scaling factor
    target_modules=["q_proj", "v_proj"],  # Target modules for adaptation
    lora_dropout=0.1,     # Dropout probability
    bias="none",          # Bias type
    task_type="CAUSAL_LM" # Task type
)

# Wrap the model with LoRA
model = get_peft_model(model, lora_config)
print("LoRA configuration applied.")

# Assign a padding token to the tokenizer
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token  # Use the end-of-sequence token as the padding token

# Load dataset
print("Loading dataset...")
dataset = load_dataset("csv", data_files=DATASET_PATH)

# Rename the columns to match the expected keys
dataset = dataset["train"].rename_column("prompt", "input_ids").rename_column("response", "labels")

# Tokenize dataset
def tokenize_function(example):
    inputs = tokenizer(
        example["input_ids"],
        padding="max_length",
        truncation=True,
        max_length=128
    )
    labels = tokenizer(
        example["labels"],
        padding="max_length",
        truncation=True,
        max_length=128
    )
    inputs["labels"] = [
        -100 if token == tokenizer.pad_token_id else token for token in labels["input_ids"]
    ]
    return inputs

print("Tokenizing dataset...")
tokenized_dataset = dataset.map(tokenize_function, batched=True, remove_columns=dataset.column_names)

# Define training arguments
training_args = TrainingArguments(
    output_dir="./results",
    evaluation_strategy="no",  # Disable evaluation for now
    save_strategy="epoch",
    logging_dir="./logs",
    num_train_epochs=3,
    per_device_train_batch_size=4,  # Adjust for memory constraints
    gradient_accumulation_steps=8,
    learning_rate=5e-4,
    warmup_steps=100,
    weight_decay=0.01,
    logging_steps=10,
    save_total_limit=2,
    fp16=True,  # Use mixed precision
    dataloader_pin_memory=True  # Ensure efficient memory usage
)

# Initialize Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset,
    tokenizer=tokenizer,
)

# Train model
print("Starting fine-tuning with LoRA...")
trainer.train()

# Save the fine-tuned model
print("Saving the fine-tuned model...")
model.save_pretrained("./fine_tuned_llm")
tokenizer.save_pretrained("./fine_tuned_llm")
print("Fine-tuning complete!")