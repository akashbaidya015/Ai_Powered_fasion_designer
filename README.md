# AI-Powered Fashion Designer

## Overview
The **AI-Powered Fashion Designer** is an innovative project designed to generate personalized fashion recommendations. By integrating **Stable Diffusion** and **Gemini Generative AI**, it produces stylish outfit designs tailored to the user’s preferences, such as gender, mood, and occasion. This application combines an interactive front-end with a robust back-end for seamless data processing.

---

## Features
- **Personalized Fashion Recommendations**: Tailored designs based on user-defined mood and preferences.
- **Gender-Specific Outputs**: Provides designs for males and females.
- **Seamless Cloud Integration**: Stores and retrieves images using Google Cloud Storage.
- **AI-Powered Styling**: Utilizes Gemini AI to refine prompts for creative design outputs.
- **Cached Designs**: Reuses cached outputs via Pinecone for faster results.
- **Purchase Links**: Optionally provides purchase links for generated outfits.

---

## Steps to Get Fashion Recommendations

### Backend Setup
1. Clone the repository and navigate to the backend folder.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt

   Add your API keys in the backend code:
Google Cloud API
Hugging Face API
Pinecone API
Start the FastAPI server:
bash
Copy code
uvicorn main:app --reload
Note the server URL displayed in the terminal.
Deploy the Frontend:

Navigate to the frontend folder.
Install dependencies using:
bash
Copy code
npm install
Configure the NEXT_PUBLIC_API_URL environment variable in .env with the backend server URL.
Start the frontend:
bash
Copy code
npm run dev
Use the Application:

Open the frontend in a browser.
Enter your preferences:
Gender
Mood/Occasion
Optionally enable "Link to Buy."
Click on Generate Stylish Designs.
Wait for the AI to generate and display the designs.
Retrieve the Designs:

View the generated images on the frontend.
If enabled, use the provided purchase links to buy similar outfits.
How It Works
User Input:

Users enter their preferences (gender, mood, etc.) in the frontend.
Prompt Refinement:

The backend refines the user input using Gemini AI to create detailed prompts for the Stable Diffusion model.
Image Generation:

Stable Diffusion generates unique designs based on the refined prompts.
Image Caching:

Generated designs are cached using Pinecone for quick retrieval during subsequent requests.
Image Hosting:

Generated images are uploaded to Google Cloud Storage, and their URLs are shared with the frontend.
Enhanced UX:

The frontend displays generated designs, offering a seamless experience.
Technologies Used
Frontend: React (Next.js)
Backend: FastAPI
AI Models:
Stable Diffusion for image generation
Gemini AI for prompt refinement
Cloud Services:
Google Cloud Storage
Pinecone for vector-based caching
Other Libraries: PIL, LangChain, OpenAI Embeddings
