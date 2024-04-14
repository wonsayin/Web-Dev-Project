// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Set up middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define correct answers for the quiz
const correctAnswers = {
    question1: 'a', // Correct answer for Question 1
    question2: 'b', // Correct answer for Question 2
    question3: 'a'  // Correct answer for Question 3
};

// Define a route to handle form submissions
app.post('/submit-form', (req, res) => {
    // Extract form data from the request
    const formData = req.body;

    // Calculate the user's score
    let score = 0;
    Object.keys(formData).forEach(question => {
        if (formData[question] === correctAnswers[question]) {
            score++;
        }
    });

    // Generate a response based on the user's score
    let message;
    if (score === 3) {
        message = "Congratulations! You'll survive a zombie apocalypse!";
    } else {
        message = "Unfortunately, you wouldn't last long in a zombie apocalypse.";
    }

    // Send the response back to the client
    res.send(message);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
