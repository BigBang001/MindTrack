import React, { useState } from 'react';
import apiService from './services/apiService';  // Assuming you have an API service

function SurveyForm() {
  const [mood, setMood] = useState('');
  const [thoughts, setThoughts] = useState('');
  const [sentiment, setSentiment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.post('/predict_sentiment/', { mood, thoughts });
      setSentiment(response.data.sentiment);
    } catch (error) {
      console.error('Error predicting sentiment:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Mood" value={mood} onChange={(e) => setMood(e.target.value)} />
        <textarea placeholder="Thoughts" value={thoughts} onChange={(e) => setThoughts(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      {sentiment && <p>Sentiment: {sentiment}</p>}
    </div>
  );
}

export default SurveyForm;
