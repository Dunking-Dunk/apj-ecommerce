import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter Billboard Title"],
  },
  image: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  link: {
    type: String,
  },
});

const Billboard = mongoose.model("Billboard", categorySchema);

export default Billboard;
