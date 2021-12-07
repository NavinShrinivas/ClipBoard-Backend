const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  name: String,
  size: String,
  type: String,
  lastModified: String,
})
const FilesSchema = new mongoose.Schema({
  username: String,
  authID: String,
  files: [FileSchema],
});

module.exports = {
  Files: mongoose.model("Files", FilesSchema)
};
