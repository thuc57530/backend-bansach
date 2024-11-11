module.exports.index =  (req,res) => 
    {
        res.render("client/pages/home/index.pug", 
            {pageTitle:"Trang chu"} // data dong. truyen thang tu cotroller ->view 
            
        );
        
    }