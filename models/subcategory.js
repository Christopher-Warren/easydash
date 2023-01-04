const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

export default mongoose.models.Subcategory ||
  mongoose.model("Subcategory", subcategorySchema);
