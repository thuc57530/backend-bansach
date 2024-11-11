const filterStatusHepler = require("../../heplers/filterStatus");
const systemConfig = require("../../config/system");
const Product = require("../../model/product.model");
const searchHepler = require("../../heplers/search");
const paginationHepler = require("../../heplers/pagination");

module.exports.index = async (req,res) => 
    {   
        //bo loc
        const filterStatus = filterStatusHepler(req.query);
        // console.log(filterStatus);

        let find = {
            deleted: false,
            
        };
        if(req.query.status)
        {
            find.Status = req.query.status;
        }

        const objectsearch = searchHepler(req.query);
        console.log(req.query);
       
        if(objectsearch.keyword)
        {
            
            
            find.title = objectsearch.regex;
        }
    //Phan trang
    const countProducts = await Product.countDocuments(find);
        let objectPagination = paginationHepler(
            {
                limitItems : 4,
                currentPage:1
            },
            req.query,
            countProducts
        ) 
           
        
        const Products = await Product.find(find)
        .sort({position : "desc"})
        .limit(objectPagination.limitItems).skip(objectPagination.skip);
        // console.log(objectPagination.skip);
        //  console.log(Products);

        res.render("admin/pages/products/index.pug", 
            {pageTitle:"Trang danh sach san pham ",
                products:Products,
                filterStatus: filterStatus,
                keyword:objectsearch.keyword,
                pagination:objectPagination


            } // data dong. truyen thang tu cotroller ->view 
        );
    }

//admin/product/change-status
 module.exports.ChangeStatus = async (req,res) =>
{

   
    const status = req.params.status;
    const id = req.params.id;
    
   

    const ProductUpdate = await Product.updateOne({_id: id}, { Status: status }); 

    req.flash("success", "cap nhat trang thai san pham thanh cong!");
    
    res.redirect("back");
    

}   

//multi 
module.exports.changeMulti = async (req,res) =>
    {
    
    const type = req.body.type;
    const ids = req.body.ids.split(", "); //chuyen thanh 1 mang 

    switch (type) {
        case "active":
            await Product.updateMany({ _id: {$in:ids}}, {Status : "active" });
            req.flash("success", "cap nhat trang thai san pham thanh cong!");
            break;
        case "inactive":
            await Product.updateMany({ _id: {$in:ids}}, {Status : "inactive" });
            req.flash("success", "cap nhat trang thai san pham thanh cong!");
            break;
        case "delete-all":
            await Product.updateMany({ _id: {$in:ids}}, {
                deleted : true,
                deleteAt:new Date()
             });
            break;
        case "change-position":
            
             for(item of ids)
             {
                let[id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({_id: id}, { 
                    position : position
                 });
               
             }
           
            
            break;
             
        default:
            break;
    }
    res.redirect("back");
    };  

    //delete
    module.exports.deleteItem = async (req,res) =>
        {
        
           
            
            const id = req.params.id;
            
           
        
            const ProductUpdate = await Product.updateOne({_id: id}, {
                deleted : true,
                deleteAt: new Date() // ham lay ra thoi gian hien tai
            }); 
            
            res.redirect("back"); 
            
        
        }  
    

//create

module.exports.create = (req,res) =>
{
res.render("admin/pages/products/create",
    {pageTitle:"Them moi san pham"

    }
)
};
// create [Post]
module.exports.createPost = async (req,res) =>
    {      
        req.body.price = parseInt(req.body.price);
        req.body.discountPercentage = parseInt(req.body.discountPercentage);
        req.body.stock=parseInt(req.body.stock);
        

        if(req.body.position == "") {
            const countProducts = await Product.countDocuments();
            req.body.position = countProducts + 1;
            console.log(countProducts);
        }
        else
        {
            req.body.position = parseInt(req.body.position);
        }
        if(req.file)
        {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
         
        }
        const product = new Product(req.body);
        await product.save();


        res.redirect(`${systemConfig.prifixAdmin}/products`);
    };

    //edit
    module.exports.edit = async (req,res) =>
        {
            

            const find = {
                deleted : false,
                _id: req.params.id
            };

            const product = await Product.findOne(find);
            console.log(product);

        res.render("admin/pages/products/edit",
            {pageTitle:"Chinh sua  san pham",
                product:product
                
            }
        )
        };
//edit {patch}
module.exports.editPatch = async (req,res) =>
{
    
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock=parseInt(req.body.stock);
    

    
    if(req.file)
    {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
       
     
    }
     await Product.updateOne({_id:req.params.id}, req.body);
     req.flash("success","cap nhat thanh cong!");


    res.redirect(`${systemConfig.prifixAdmin}/products`);
    
}
//detail
module.exports.detail = async(req,res) =>
    {
        const find = {
            deleted : false,
            _id:req.params.id
        }
 

    const product = await Product.findOne(find);
    console.log(product);
    res.render("admin/pages/products/detail",
        {
            pageTitle:"chi tiet san pham",
            product : product
        }
    )

};
