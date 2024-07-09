const API_BASE_URL = 'http://localhost:8000/api';  // Replace with your backend API URL

const apiService = {
    async submitSurvey(data) {
        const response = await fetch(`${API_BASE_URL}/surveys/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    },
    // Add more API functions as needed
};

export default apiService;
