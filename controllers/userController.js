const User = require("../models/userModel");

module.exports.user = function (req, res) {
  return res.end("<h1>user profile</h1>");
};

module.exports.registrationform = function (req, res) {
  return res.render("registration");
};

module.exports.loginform = function (req, res) {
  return res.render("login-all");
};
module.exports.register = function (req, res) {
  const userData = req.body;
  console.log(userData);
  const user = new User(userData);
  user
    // .save()
    // .then(() =>
    //   res.status(201).json({ message: "User registered successfully" })
    // )
    .save()
    .then(() => res.redirect("/users/loginform"))

    .catch((err) => {
      console.error(err); // Log the error
      res.status(500).json({ error: "Error registering user" });
    });
};

module.exports.login = function (req, res) {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(404).json({ error: "User not found" });
      } else {
        // Check if the password matches
        if (user.password === password) {
          res.status(200).json({ message: "Login successful" });
        } else {
          res.status(401).json({ error: "Invalid password" });
        }
      }
      return res.redirect("/");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error logging in" });
    });
};
//update a user
exports.update = async function (req, res) {
  try {
    const email = req.params.email; // Assuming you are passing the user ID in the request parameters
    const updateData = req.body; // New data to update

    if (req.body.username) {
      return res.status(400).send({ message: "username cannot be updated" });
    }
    // Use the User model to find and update the user
    let user = await User.findOneAndUpdate(
      { email },
      { $set: updateData },
      { new: true }
    );

    if (!user) {
      // If no user was found with the given ID
      return res.status(404).send({ error: "User not found" });
    }
    return res
      .status(200)
      .send({ message: "User updated successfully", user: user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ error: err, message: "internbal server error" });
  }
};
//absert:true

// router.delete("/delete", async (req, res) => {
//   try {
//     let user = await findByIdAndDelete(req.id);
//     return res
//       .status(200)
//       .send({ message: "Data Deleted sucessfully", data: user });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send("Server Error");
//   }
// });
