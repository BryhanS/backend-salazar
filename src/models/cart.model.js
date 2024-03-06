const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: [
    {
      _id: false,
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  ],
});

//middleware pre population
cartSchema.pre("findOne", function (next) {
  this.populate("products.product", "_id title price");
  next();
});

const CartModel = mongoose.model("carts", cartSchema);

module.exports = CartModel;
