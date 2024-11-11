const Product = require("../../model/product.model");

module.exports.index = async (req,res)=>
    {
        const products = await Product.find({
            Status : "active",
            deleted : false,
            
        }).sort({position : "desc"});
        

         const newProducts = products.map(item =>
        {
            item.priceNew = (item.price*(100-item.discountPercentage)/100).toFixed(0);
            return item;
        }
        );
        
        console.log(products);

        res.render("client/pages/products/index.pug",
            {pageTitle:"Trang san pham",
                products:newProducts
            } //lay data 
        );
    }

    //detail
    module.exports.detail = async (req,res)=>
        {
            console.log(req.params);

            const slug = req.params.slug;

            const find ={
                deleted : false,
                slug : slug,
                Status : "active"
            }
            const product  = await Product.findOne(find);
            console.log(product);
            res.render("client/pages/products/detail.pug",
                {pageTitle:product.title,
                product : product
                } //lay data 
            );
        }