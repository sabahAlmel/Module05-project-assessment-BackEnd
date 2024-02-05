import fs from "fs";
import User from "../models/user.model.js";

function removeImage(image) {
  fs.unlink(image, (err) => {
    if (err) {
      console.log(`we can't delete the image`);
    } else {
      console.log("image deleted");
    }
  });
}

async function getAllUsers(req, res) {
  try {
    let getAll = await User.find();
    return res.status(200).json(getAll);
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteUser(req, res) {
  let id = req.body.id;
  try {
    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const image = user.image;
    removeImage(image);
    console.log("Successfully deleted record.");
    return res.status(200).json("deleted");
  } catch (error) {
    console.error("Failed to delete record:", error);
    return res.status(400).json("not deleted");
  }
}

async function getOneUser(req, res) {
  try {
    const data = await User.findById({
      _id: req.user.userId,
    });
    console.log(data);
    if (!data) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: data });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateUser(req, res) {
  const user = req.body;

  let newImage;
  user.id = req.user.userId;
  console.log(user.id);
  const found = await User.findById({ _id: user.id });
  if (!req.file) {
    newImage = found.image;
  } else if (req.file) {
    const oldImage = found.image;
    newImage = req.file.path;
    removeImage(oldImage);
  }
  if (!found) {
    if (newImage) {
      removeImage(newImage);
    }
    return res.status(400).json({ error: "user not found" });
  }
  if (user.email) {
    return res.status(400).json({ error: "you can't update your email" });
  }
  if (req.user.role !== "admin") {
    if (user.role) {
      return res.status(400).json({ error: "you can't change your role" });
    }
  }
  try {
    user.image = newImage;
    if (user.password) {
      const hashedPass = await bcrypt.hash(user.password, 10);
      user.password = hashedPass;
    }
    await User.findByIdAndUpdate({ _id: user.id }, { ...user });
    return res.status(200).json(user);
  } catch (err) {
    console.error("could not update user " + err);
    if (newImage) {
      removeImage(newImage);
    }
    return res.status(500).json({ error: "Server error while updating user" });
  }
}

export { getAllUsers, updateUser, deleteUser, getOneUser };
