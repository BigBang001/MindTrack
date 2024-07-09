from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Survey
from .serializers import SurveySerializer
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.text import tokenizer_from_json

# Load sentiment analysis model and tokenizer
model = load_model('path_to_your_sentiment_analysis_model.h5')
with open('path_to_your_tokenizer.json', 'r') as f:
    tokenizer = tokenizer_from_json(f.read())

class SurveyView(APIView):
    def post(self, request):
        serializer = SurveySerializer(data=request.data)
        if serializer.is_valid():
            survey_data = serializer.validated_data
            mood_text = survey_data['mood'] + ' ' + survey_data['thoughts']  # Combine mood and thoughts for analysis
            mood_sequence = tokenizer.texts_to_sequences([mood_text])
            mood_sequence_padded = tf.keras.preprocessing.sequence.pad_sequences(mood_sequence, maxlen=100)
            prediction = model.predict(mood_sequence_padded)
            sentiment = 'Positive' if prediction > 0.5 else 'Negative'
            survey_data['sentiment'] = sentiment
            serializer.save()
            return Response({'success': True, 'sentiment': sentiment}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
