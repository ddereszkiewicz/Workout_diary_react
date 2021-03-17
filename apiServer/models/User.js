const { Schema, model } = require("mongoose");

// Schema domyślnie dodaje unikalne pole _id, dlatego pomijamy je w deklaracji
const userSchema = new Schema(
  {
    login: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (password) {
          return password.length < 20;
        },
      },
    },
  },
  { collection: "users" }
);

module.exports = model("User", userSchema);
