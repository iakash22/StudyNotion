const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
} = require("../controllers/Profile");

// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)

// Update Profile details
router.put("/updateProfile", auth, updateProfile)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

router.get("/getUserDetails", auth, getAllUserDetails)



module.exports = router;
