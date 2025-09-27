# Eco-Tourism-website
Project Documentation: Eco-Tourism Website
This document provides an overview of the "Your Website Name" project, a multipage website built to showcase a fictional eco-tourism company's mission, destinations, and community impact.

1. Project Overview
The primary goal of this project was to design, code, and deploy a responsive, multipage website. The site is intended to serve as a digital hub for eco-conscious travelers, allowing them to explore destinations, learn about the company's commitment to sustainability, and track their personal environmental impact through a member dashboard.

The website demonstrates a full-stack approach by integrating a Firebase backend for user authentication and data storage, providing a dynamic and personalised user experience.

2. Key Features
Multipage Architecture: The site is structured with multiple, distinct pages, including a homepage, a member login/signup page, a personalized member dashboard, and a profile page.

User Authentication: Users can securely sign up and log in using Firebase Authentication. This feature allows for a personalized experience, directing authenticated users to their private dashboard.

Member Dashboard: The core interactive component of the site. The dashboard displays a user's personal impact counters (Trees Planted, Lbs of Waste Collected, Tons of CO2 Offset) and earned certifications.

Impact Logging: A key interactive feature is the "I Planted a Tree!" button, which updates a user's tree count in real-time within the Firestore database.

Dynamic Content: The website fetches and displays user-specific data from the Firestore database, such as the member's name and their impact statistics.

Responsive Design: The layout is designed using CSS to be fully responsive, ensuring a seamless user experience on desktops, tablets, and mobile devices.

3. Technologies Used
Frontend:

HTML5: Used for the semantic and structural layout of each webpage.

CSS3: Utilized for styling the entire site, including a professional color palette, font choices, and responsive layouts.

JavaScript: Powers all interactive elements, including user authentication, data fetching, counter animations, and database interactions.

Backend:

Firebase Authentication: Manages user sign-up and login securely.

Firebase Firestore: A cloud-hosted NoSQL database used to store and retrieve user data, including personal impact metrics and certifications.

Firebase Hosting: The platform used for deploying the static website files, providing a reliable and fast live URL.

4. File Structure
The project's file structure is organized to be clean and manageable:

/your-project-folder
├── css/
│   ├── components.css
│   └── style.css
├── js/
│   ├── charts.js
│   └── firebase-auth.js
├── img/
│   ├── icons/
│   ├── logos/
│   └── destinations/
├── members/
│   └── dashboard.html
├── pages/
│   ├── about-us.html
│   └── login.html
├── index.html
├── .firebaserc
├── firebase.json
├── firestore.rules
└── ... (other files)
5. Deployment & Updates
The website has been successfully deployed using Firebase Hosting.

Live Website URL: [https://github.com/Ganga-J/Eco-Tourism-website.git
](https://eco-tourism-adcc8.web.app/)
