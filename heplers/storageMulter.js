
const multer =require("multer");
module.exports = () =>
{
    const storage = multer.diskStorage({
        destination: function(req,file,cb)
        {
            cb(null, "./public/uploads/")
        },
        filename : function(req,file,cb){
            const uniquesuffix = Date.now();
            cb(null,`${uniquesuffix}-${file.originalname}`)
        }

    })
    return storage;
};