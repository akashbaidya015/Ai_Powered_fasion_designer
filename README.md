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
