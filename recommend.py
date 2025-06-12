import pandas as pd
import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def preprocess_ingredients(ingredient_list):
    return [ingredient.strip().lower() for ingredient in ingredient_list]

def average_vector(ingredients, model):
    vectors = [model.wv[word] for word in ingredients if word in model.wv]
    return np.mean(vectors, axis=0) if vectors else np.zeros(model.vector_size)

def recommend_recipes(allergies, preferences, df, word2vec_model):
    allergies = preprocess_ingredients(allergies)
    preferences = preprocess_ingredients(preferences)

    print("Generating preference vector...")
    preference_vector = average_vector(preferences, word2vec_model)

    print("Computing similarities for all recipes...")

    recipe_vectors = []
    for ingredients in df['Ingredients_name']:
        if not isinstance(ingredients, str):  # Handle missing or non-string values
            recipe_vectors.append(np.zeros(word2vec_model.vector_size))
            continue
        ingredient_list = [i.strip().lower() for i in ingredients.split(',')]
        vec = average_vector(ingredient_list, word2vec_model)
        recipe_vectors.append(vec)

    similarity_scores = cosine_similarity([preference_vector], recipe_vectors)[0]

    df['similarity_score'] = similarity_scores

    # Filter out recipes that contain allergens
    def contains_allergen(ingredients):
        if not isinstance(ingredients, str):
            return False
        return any(allergen in ingredients.lower() for allergen in allergies)

    filtered_df = df[~df['Ingredients_name'].apply(contains_allergen)]

    top_recommendations = filtered_df.sort_values(by='similarity_score', ascending=False).head(5)

    return top_recommendations[['Name', 'Ingredients_name', 'similarity_score']]

def run_recommendation_system(df, word2vec_model):
    user_allergy_ingredients = input("--> Enter allergy ingredients (comma separated): ").lower().split(',')
    user_preference_ingredients = input("--> Enter preferred ingredients (comma separated): ").lower().split(',')

    recommendations = recommend_recipes(user_allergy_ingredients, user_preference_ingredients, df, word2vec_model)
    return recommendations

if __name__ == "__main__":
    print("Script started...")

    try:
        print("Loading Word2Vec model...")
        with open('word2vec_model.pkl', 'rb') as f:
            word2vec_model = pickle.load(f)

        print("Loading recipe dataset...")
        df = pd.read_csv('Datasets/Food_Recipes_Cleaned.csv')

        print("Models and data loaded successfully!\n")

        recommendations = run_recommendation_system(df, word2vec_model)

        print("\nTop Recommendations:")
        print(recommendations.to_string(index=False))

    except Exception as e:
        print("Could not start recommendation system.")
        print("Error:", e)
