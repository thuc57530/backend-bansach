const dashboardRouter = require("./dashboard.router");
const systemConfix = require("../../config/system");
const productRouter = require("./product.router");
    module.exports = (app) =>
    {
            const PAST_ADMIN = systemConfix.prifixAdmin;
        
        app.use(PAST_ADMIN + "/dashboard", dashboardRouter);
        app.use(PAST_ADMIN + "/products",productRouter);    
        
             
    }