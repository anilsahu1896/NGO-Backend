const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS module

// Import Models
const UserProfile = require('./models/UserProfile');
const FollowUp = require('./models/FollowUp');
const Media = require('./models/Media');

// Initialize the Express App
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect('mongodb+srv://anilsahu1896:Madhushukla1!@cluster0.zklau.mongodb.net/ngo?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Sample Routes to interact with the MongoDB Models

// 1. Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await UserProfile.find(); // Fetch all user records
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users', message: err.message });
    }
});

// 2. Get all media content
app.get('/media', async (req, res) => {
    try {
        const mediaContent = await Media.find(); // Fetch all media content
        res.status(200).json(mediaContent);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch media content', message: err.message });
    }
});

// 3. Get all follow-up list
app.get('/followups', async (req, res) => {
    try {
        const followups = await FollowUp.find(); // Fetch all follow-up records
        res.status(200).json(followups);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch follow-ups', message: err.message });
    }
});

// 4. Get all user details with their follow-up details
app.get('/user-followups', async (req, res) => {
    try {
        // Checkpoint 1: Log when the API is hit
        console.log("API hit: /user-followups");

        // Fetch all users (correcting the reference to 'UserProfile' model)
        const users = await UserProfile.find();
        console.log("Fetched users:", users); // Checkpoint 2: Log the fetched users

        // Map users to include their follow-up details
        const result = await Promise.all(users.map(async (user) => {
            console.log("Processing user:", user.user_id); // Checkpoint 3: Log user being processed

            // Find the follow-up details for each user
            const followups = await FollowUp.find({ user_id: user.user_id });
            console.log(`Follow-ups for user ${user.user_id}:`, followups); // Checkpoint 4: Log follow-ups fetched for the user

            if (followups.length === 0) {
                console.log(`No follow-ups for user ${user.user_id}`); // Checkpoint 5: Log when no follow-ups are found
            }

            // Return user details with their follow-up data
            return followups.map(followup => ({
                name: `${user.first_name} ${user.last_name}`,
                contact_no: user.phone_number,
                followup_date: followup.followup_date,
                followup_medium: followup.followup_medium,
                followup_notes: followup.followup_notes,
                status: followup.status,
            }));
        }));

        console.log("Result before flattening:", result); // Checkpoint 6: Log the result before flattening

        // Flatten the result array of arrays and send the response
        const flatResult = result.flat();
        console.log("Flattened result:", flatResult); // Checkpoint 7: Log the flattened result

        res.json(flatResult);
    } catch (err) {
        console.error('Error fetching user follow-ups:', err); // Checkpoint 8: Log any errors
        res.status(500).send('Server Error');
    }
});
;

// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
