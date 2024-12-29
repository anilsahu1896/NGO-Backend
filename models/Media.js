const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    media_id: { type: mongoose.Schema.Types.UUID, required: true, unique: true },
    user_id: { type: mongoose.Schema.Types.UUID, ref: 'UserProfile', required: true },
    media_type: String,
    media_url: { type: String, required: true },
    uploaded_date: { type: Date, default: Date.now },
    description: String
});

// Explicitly specify the collection name 'Media' instead of the default pluralized 'media'
module.exports = mongoose.model('Media', mediaSchema, 'Media');
