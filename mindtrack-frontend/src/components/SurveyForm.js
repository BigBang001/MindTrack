import React, { useState } from 'react';
import apiService from '../services/apiService';

const SurveyForm = () => {
    const [surveyData, setSurveyData] = useState({
        mood: '',
        symptoms: '',
        weight: '',
        hours_of_sleep: '',
        thoughts: ''
    });

    const handleChange = (e) => {
        setSurveyData({ ...surveyData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await apiService.submitSurvey(surveyData);
            if (response.success) {
                alert(`Survey submitted successfully. Sentiment: ${response.sentiment}`);
            } else {
                alert('Failed to submit survey.');
            }
        } catch (error) {
            console.error('Error submitting survey:', error);
            alert('An error occurred while submitting the survey.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="mood" placeholder="Enter mood" onChange={handleChange} />
            <textarea name="symptoms" placeholder="Enter symptoms" onChange={handleChange}></textarea>
            <input type="number" name="weight" placeholder="Enter weight" onChange={handleChange} />
            <input type="number" name="hours_of_sleep" placeholder="Enter hours of sleep" onChange={handleChange} />
            <textarea name="thoughts" placeholder="Enter thoughts" onChange={handleChange}></textarea>
            <button type="submit">Submit Survey</button>
        </form>
    );
};

export default SurveyForm;
