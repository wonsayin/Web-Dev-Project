// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // Import the 'fs' module for file operations

// Create an Express application
const app = express();

// Set up middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define correct answers for the quiz
const correctAnswers = {
    question1: 'a', // Correct answer for Question 1
    question2: 'c', // Correct answer for Question 2
    question3: 'b', // Correct answer for Question 3
    question4: 'b', // Correct answer for Question 4
    question5: 'a', // Correct answer for Question 5
    question6: 'b', // Correct answer for Question 6
    question7: 'c', // Correct answer for Question 7
    question8: 'b'  // Correct answer for Question 8
};

// Define the minimum score required for the "Congratulations" message
const minScoreForCongrats = 5;

// Define a function to save the results to a file
function saveResults(username, score, wrongAnswers) {
    const data = {
        username: username,
        score: score,
        wrongAnswers: wrongAnswers
    };
    try {
        fs.writeFileSync('quiz_results.json', JSON.stringify(data));
        console.log('Results saved successfully:', data);
    } catch (err) {
        console.error('Error saving results:', err);
    }
}

// Define the route to handle quiz submissions
app.post('/submit-form'), (req, res) => {
    const formData = req.body;

// Calculate the user's score
let score = 0;
let wrongAnswers = [];
Object.keys(formData).forEach(question => {
    if (formData[question] === correctAnswers[question]) {
        score++;
    } else {
        wrongAnswers.push(question);
    }
});

// Generate a response based on the user's score
let message;
if (score >= minScoreForCongrats) {
    message = "Congratulations! You'll survive a zombie apocalypse!";
} else {
    message = `Unfortunately, you wouldn't last long in a zombie apocalypse. You got ${score} out of ${Object.keys(correctAnswers).length} questions correct.`;
    if (wrongAnswers.length > 0) {
        message += " You got these questions wrong: " + wrongAnswers.join(", ");
    }
}

 // Save the results to a file
 saveResults(formData.username, score, wrongAnswers);

// Send the response back to the client
res.send(message);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
}
