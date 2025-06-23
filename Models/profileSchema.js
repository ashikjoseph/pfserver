const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  githubLink: {
    type: String,
    default: ''
  },
  linkedinLink: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const profiles = mongoose.model('profiles', profileSchema);
module.exports = profiles;
