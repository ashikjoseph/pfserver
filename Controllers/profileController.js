const profiles = require('../Models/profileSchema');






// Add new profile
exports.addProfile = async (req, res) => {
  try {
    const userId = req.payload;  
    const { githubLink, linkedinLink } = req.body;
    const profileImage = req.file ? req.file.filename : '';

    
    const existingProfile = await profiles.findOne({ userId });
    if (existingProfile) {
      return res.status(406).json("Profile already exists");
    }

    const newProfile = new profiles({
      githubLink,
      linkedinLink,
      profileImage,
      userId,
    });

    await newProfile.save();
    return res.status(200).json("Profile added successfully");
  } catch (err) {
    return res.status(500).json("Server error: " + err.message);
  }
};






// Get profile for logged-in user
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.payload;

    const userProfile = await profiles.findOne({ userId });
    if (!userProfile) {
      return res.status(404).json("Profile not found");
    }

    return res.status(200).json(userProfile);
  } catch (err) {
    return res.status(500).json("Request failed: " + err.message);
  }
};







// Edit profile by id
exports.editUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.payload;
    const { githubLink, linkedinLink } = req.body;
    const profileImage = req.file ? req.file.filename : req.body.profileImage;

    
    const updatedProfile = await profiles.findOneAndUpdate(
      { _id: id, userId },
      { githubLink, linkedinLink, profileImage },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json("Profile not found or unauthorized");
    }

    return res.status(200).json("Profile updated successfully");
  } catch (err) {
    return res.status(500).json("Update failed: " + err.message);
  }
};
