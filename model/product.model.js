const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);


const Productschema = new mongoose.Schema(

    {
        title:String, // san pham 1
        description:String,
        price:Number,
        discountPercentage:Number,
        stock:Number,
        Status:String,
        position:Number,
        slug: { type: String ,
             slug :"title",
              unique : true}, //an theo bien title ( san pham 1)
        deleted:{
            type:Boolean,
            default : false
        },
        thumbnail:String,
        deleteAt: Date
    },
    {
        timestamps:true //mongoose
    }
);

const Product = mongoose.model("Product", Productschema,"products");

module.exports = Product;