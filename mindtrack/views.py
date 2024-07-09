from django.shortcuts import render
from django.http import JsonResponse
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import tokenizer_from_json
from tensorflow.keras.preprocessing.sequence import pad_sequences
import json

# Load tokenizer
with open('tokenizer.json', 'r', encoding='utf-8') as f:
    tokenizer_json = f.read()
    tokenizer = tokenizer_from_json(json.loads(tokenizer_json))

# Load model
model = load_model('model.h5')

# Example view function
def predict_sentiment(request):
    if request.method == 'POST':
        mood = request.POST.get('mood', '')
        thoughts = request.POST.get('thoughts', '')

        # Preprocess input
        input_text = [mood + ' ' + thoughts]
        sequences = tokenizer.texts_to_sequences(input_text)
        padded_sequences = pad_sequences(sequences, maxlen=100)

        # Predict sentiment
        prediction = model.predict(padded_sequences)[0][0]

        # Return prediction
        return JsonResponse({'sentiment': prediction})

    return render(request, 'survey_form.html')
