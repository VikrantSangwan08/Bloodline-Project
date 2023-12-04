const User = require("../models/userModel");

module.exports.profile = function (req, res) {
  return res.end("<h1>user profile</h1>");
};

module.exports.registrationform = function (req, res) {
  return res.render("registration", {
    title: "Registration",
  });
};

module.exports.loginform = function (req, res) {
  return res.render("login-all", {
    title: "BloodBanl | Login",
  });
};
module.exports.register = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/users/login");
  }
  const userData = req.body;
  console.log(userData);
  const user = new User(userData);
  user
    // .save()
    // .then(() =>
    //   res.status(201).json({ message: "User registered successfully" })
    // )
    .save()
    .then(() => res.redirect("/users/login"))

    .catch((err) => {
      console.error(err); // Log the error
      res.status(500).json({ error: "Error registering user" });
    });
};
// render the sign in page
module.exports.login = function (req, res) {
  if (req.isAuthenticated()) {
    res.redirect("/users/profile");
  }
  return res.render("login-all", {
    title: "BloodBanl | Login",
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

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};
