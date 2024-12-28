const mongoose = require('mongoose');

const followUpSchema = new mongoose.Schema({
    followup_id: { type: mongoose.Schema.Types.UUID, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.UUID, ref: 'UserProfile', required: true },
    followup_date: { type: Date, required: true },
    followup_medium: String,
    followup_notes: String,
    status: String
});

module.exports = mongoose.model('FollowUp', followUpSchema);