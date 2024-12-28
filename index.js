const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import Models
const UserProfile = require('./models/UserProfile');
const FollowUp = require('./models/FollowUp');
const Media = require('./models/Media');

// Initialize the Express App
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://anilsahu1896:Madhushukla1!@cluster0.zklau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Sample Routes to interact with the MongoDB Models

// Add a new user
app.post('/user', async (req, res) => {
    const { user_id, first_name, last_name, email, phone_number, address, user_type } = req.body;
    try {
        const user = new UserProfile({ user_id, first_name, last_name, email, phone_number, address, user_type });
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add a new follow-up
app.post('/followup', async (req, res) => {
    const { followup_id, user_id, followup_date, followup_medium, followup_notes, status } = req.body;
    try {
        const followUp = new FollowUp({ followup_id, user_id, followup_date, followup_medium, followup_notes, status });
        await followUp.save();
        res.status(201).json(followUp);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add a new media record
app.post('/media', async (req, res) => {
    const { media_id, user_id, media_type, media_url, description } = req.body;
    try {
        const media = new Media({ media_id, user_id, media_type, media_url, description });
        await media.save();
        res.status(201).json(media);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a user profile
app.get('/user/:user_id', async (req, res) => {
    try {
        const user = await UserProfile.findOne({ user_id: req.params.user_id });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/users-with-followups', async (req, res) => {
    try {
        const usersWithFollowUps = await UserProfile.aggregate([
            {
                $lookup: {
                    from: 'followups', // The collection name for FollowUp
                    localField: 'user_id', // UserProfile's user_id field
                    foreignField: 'user_id', // FollowUp's user_id field
                    as: 'followups' // This will contain the matching follow-ups for the user
                }
            },
            {
                $project: {
                    user_id: 1,
                    first_name: 1,
                    last_name: 1,
                    email: 1,
                    phone_number: 1,
                    address: 1,
                    joined_date: 1,
                    user_type: 1,
                    followups: 1 // Include the followups array in the response
                }
            }
        ]);

        res.json(usersWithFollowUps);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users with follow-ups', message: err.message });
    }
});


// Start the server
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
