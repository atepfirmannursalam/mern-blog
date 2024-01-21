import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fdefault-avatar-profile-icon-social-media-1913928688&psig=AOvVaw1L9Feyk76J_fWaRb9FVgIq&ust=1705943603193000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCLC-qKf97oMDFQAAAAAdAAAAABAE",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
