const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.UUID, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: String,
    address: String,
    joined_date: { type: Date, default: Date.now },
    user_type: String
});

// Explicitly specify the collection name 'UserProfile' instead of the default pluralized 'userprofiles'
module.exports = mongoose.model('UserProfile', userProfileSchema, 'UserProfile');
