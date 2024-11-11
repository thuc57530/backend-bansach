module.exports.dashboard =  (req,res) => 
    {
        res.render("admin/pages/dashboard/index.pug", 
            {pageTitle:"Trang tong quan"} // data dong. truyen thang tu cotroller ->view 
        );
    }