const { model, Schema } = require("mongoose");
const jwt = require("jsonwebtoken");
let AuthSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

AuthSchema.methods.getJWTtoken = function () {
  return jwt.sign({ id: this.id }, "praneeth", { expiresIn: 30 });
};

module.exports = model("schemaAuthentication", AuthSchema);
