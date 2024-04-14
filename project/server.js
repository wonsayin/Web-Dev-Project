// Import required modules
import express from 'express';
import { urlencoded } from 'body-parser';

// Create an Express application
const app = express();

// Set up middleware to parse request bodies
app.use(urlencoded({ extended: true }));

// Define a route to handle form submissions
app.post('/submit-form', (req, res) => {
    // Extract form data from the request
    const formData = req.body;

    // Log the form data to the console for testing
    console.log('Form data:', formData);

    // Send a response back to the client
    res.send('Form submitted successfully!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
