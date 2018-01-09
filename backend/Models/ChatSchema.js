var ChatSchema = mongoose.Schema({
  created: Date,
  content: String,
  username: String,
  room: String
});