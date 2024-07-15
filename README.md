<h2 align="center">Mental Health Tracking Application (MindTrack)</h2>

<p align="center">
  <em>It is a web application designed to facilitate easy and convenient tracking of daily mood and mental health symptoms. Utilizing AI and a user-friendly interface, MindTrack aims to provide comprehensive mental health monitoring for users with ADHD and other neuro-divergences.</em>
</p><br><br>

### Purpose

The main objectives behind developing MindTrack are as follows:

1. **Simplify Mental Health Tracking:** Provide a clean and intuitive interface to make tracking mental health symptoms accessible for all users.
2. **Leverage AI for Insights:** Utilize AI to analyze user inputs and provide meaningful insights and trends in mental health data.
3. **Promote User Engagement:** Send daily survey reminders via text message to ensure consistent tracking and engagement.
4. **Track Progress:** Allow users to visualize their mental health trends and review data over time.<br>

### Key Features

- **Daily Surveys:** Receive a survey link via text message each day to track mood, symptoms, weight, hours of sleep, and thoughts.
- **Sentiment Analysis:** Uses a TensorFlow model to analyze and provide feedback on user input.
- **Future Features:** Home page, account creation/login, medication tracking, and a user dashboard for visualizing trends.
- **User-Friendly Design:** Designed to be easy to use, even for individuals with ADHD or other neuro-divergences.<br>

### Technical Details

- **Backend:** Django (Python), MySQL
- **Frontend:** React.js (JavaScript)
- **AI:** TensorFlow for sentiment analysis
- **Deployment:** Docker, Azure Kubernetes Service (AKS)

### Azure Deployment

1. **Create Azure Resources**:
   
   - **Container Registry**: Create an Azure Container Registry (ACR) to store your Docker images.
   - **Kubernetes Cluster**: Create an Azure Kubernetes Service (AKS) cluster to host and manage your containerized application.

2. **Push Docker Images to ACR**:
   
   - Build your Docker images locally and push them to your ACR:
     ```bash
     docker build -t your-acr-name.azurecr.io/mindtrack-backend ./mindtrack-backend
     docker push your-acr-name.azurecr.io/mindtrack-backend

     docker build -t your-acr-name.azurecr.io/mindtrack-frontend ./mindtrack-frontend
     docker push your-acr-name.azurecr.io/mindtrack-frontend
     ```

3. **Deploy to AKS**:
   
   - Deploy your application to AKS using Kubernetes manifests (`deployment.yaml`, `service.yaml`). Ensure to update these files with your ACR details.
   - Example `deployment.yaml` for backend:
     ```yaml
     apiVersion: apps/v1
     kind: Deployment
     metadata:
       name: mindtrack-backend
     spec:
       replicas: 1
       selector:
         matchLabels:
           app: mindtrack-backend
       template:
         metadata:
           labels:
             app: mindtrack-backend
         spec:
           containers:
             - name: mindtrack-backend
               image: your-acr-name.azurecr.io/mindtrack-backend:latest
               ports:
                 - containerPort: 8000
     ```
   - Example `service.yaml` for backend:
     ```yaml
     apiVersion: v1
     kind: Service
     metadata:
       name: mindtrack-backend-service
     spec:
       selector:
         app: mindtrack-backend
       ports:
         - protocol: TCP
           port: 80
           targetPort: 8000
       type: LoadBalancer
     ```
   - Apply these manifests:
     ```bash
     kubectl apply -f deployment.yaml
     kubectl apply -f service.yaml
     ```


### How to Use

1. **Clone the Repository:**
   
   ```
   git clone https://github.com/yourusername/mindtrack.git
   ```

2. **Navigate to the Project Directory:**
   
   ```
   cd mindtrack
   ```

3. **Backend Setup:**

   - Create a virtual environment and activate it:
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```
   - Install Python dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Setup MySQL database and configure database settings in `mindtrack-backend/mindtrack_backend/settings.py`.
   - Apply migrations and start the Django server:
     ```bash
     python manage.py makemigrations
     python manage.py migrate
     python manage.py runserver
     ```

4. **Frontend Setup:**

   - Navigate to the frontend directory:
     ```bash
     cd ../mindtrack-frontend
     ```
   - Install npm packages:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```
   - Access the application at `http://localhost:3000` in your web browser.

5. **TensorFlow Setup:**

   - Train and save a TensorFlow model for sentiment analysis (`model.h5`).
   - Save the tokenizer used for preprocessing (`tokenizer.json`).
   - Place these files in appropriate directories and update paths in `mindtrack-backend/api/views.py`.

### Contributing

If you'd like to contribute to the MindTrack project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -m "Add new feature"`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Create a pull request.
