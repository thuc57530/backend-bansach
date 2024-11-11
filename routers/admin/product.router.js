const express = require("express");
const multer =require("multer");
const router = express.Router();
const storageMulter = require("../../heplers/storageMulter")
const upload = multer({storage : storageMulter()}); // duo`ng dan~ 
const validate =require("../../validates/admin/product.validate");

const controller = require("../../controllers/admin/product.controller");


router.get("/", controller.index);
router.patch("/change-status/:status/:id", controller.ChangeStatus); //: bien dong.
router.delete("/delete/:id", controller.deleteItem); //: bien dong.
router.patch("/change-multi", controller.changeMulti); //: bien dong.
router.get("/create", controller.create);

router.post(
    "/create",
    upload.single('thumbnail'),
    validate.createPost,
     controller.createPost
    );   
    router.get("/edit/:id",
         controller.edit);
    router.patch(
        "/edit/:id",
        upload.single('thumbnail'),
        validate.createPost,
         controller.editPatch);


    router.get("/detail/:id",
            controller.detail);




module.exports = router;