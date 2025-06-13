# 🥗 Arogya-Bite – Smart Dietary & Allergen Assistant

Arogya-Bite is an intelligent food analysis and recommendation system that empowers users to make safe and informed dietary decisions. Using **OCR**, **NLP**, and **Machine Learning**, it scans food labels, detects allergens, and provides personalized diet recommendations — making it a life-saver for users with food allergies or chronic health conditions.

---

## Motivation

With food allergies, chronic conditions, and dietary restrictions on the rise, millions struggle with reading complex food labels. Arogya-Bite bridges this gap by delivering **real-time, AI-powered insights**, helping users make smarter food choices with ease.

---

## Features

- **Profile Creation** – Store user data like allergies, preferences, and health goals.
- **OCR-based Label Scanning** – Extract text from food labels using Tesseract OCR with OpenCV preprocessing.
- **Allergen Detection** – NLP techniques (using SpaCy) identify allergens from extracted ingredients.
- **Personalized Recommendations** – ML models (KNN, Random Forest) suggest allergen-free meals and diet plans.
- **Nutritional Visualization** – Display dietary insights and allergen exposure using Matplotlib.
- **Feedback Loop** – Continuously improve recommendations based on user input.

---

## Tech Stack

### **Frontend**
- **React.js** – For building a dynamic, user-friendly interface  
- **Tailwind CSS** – For modern, responsive styling  
- **Tesseract OCR** – Open-source OCR engine used to extract text from food label images

### **Backend**
- **Python** – Used for backend development, specifically for integrating machine learning models  
- **Flask** – A lightweight Python framework for building the backend and handling API requests  
- **Django REST Framework** – For building robust APIs to manage the data flow between frontend and backend  
- **Express.js** – A fast, minimal web framework for building the backend in JavaScript  
- **Node.js** – A JavaScript runtime used for backend development

### **OCR & NLP**
- **Tesseract OCR** – For extracting text from food label images  
- **OpenCV** – For image preprocessing before OCR  
- **SpaCy** – For natural language processing and allergen detection

### **Machine Learning**
- **K-Nearest Neighbors (KNN)**  
- **Random Forest Classifier**  
Used for diet recommendations based on nutritional profiles, allergies, and preferences

### **Database**
- **MongoDB** – NoSQL database to store user profiles, food info, and allergen data

### **Visualization**
- **Matplotlib** – For visual representation of dietary and allergen data

---

## Methodology

1. **User Profile Creation**  
   Users input allergies, preferences, and health goals — stored securely in MongoDB.

2. **OCR-based Label Reading**  
   Users upload food label images → Preprocessed with OpenCV → Text extracted using Tesseract OCR.

3. **Allergen Detection via NLP**  
   SpaCy processes extracted text and matches it against a trained allergen database.

4. **Personalized Diet Recommendations**  
   Machine learning models generate customized plans considering calories, macros, allergies, and goals.

5. **Statistical Representation**  
   Matplotlib is used to visualize allergen exposure and nutritional trends.

6. **Feedback-Based Learning**  
   User feedback helps retrain models, improving accuracy and personalization.

---

## Result

- **80% accuracy** in detecting allergens from food labels  
- **90% success rate** in delivering personalized dietary recommendations  
- Reliable performance across varied food packaging and input quality

---

## Contributions

- **Avlokita Singh** – Developed recipe, nutrition and diet recommendation models  
- **Nidhi Jha** – Designed the frontend and built nutrition recommendation logic  
- **Tanya Lakhani** – Handled OCR functionality and MongoDB integration  
