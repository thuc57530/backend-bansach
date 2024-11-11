const express = require("express");
const database = require("./config/database");
const systemConfig = require("./config/system");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");


require("dotenv").config();

const route = require("./routers/client/index.router");
const routeAdmin = require("./routers/admin/index.router");

database.connect();
const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));


app.use(cookieParser(`keyboard cat`));//luu vao cookie (string ramdoam)
app.use(session({cookie: {maxAge: 6000 }}));//thoi gian ton tai 6000s
app.use(flash());
app.use(bodyParser.urlencoded({extended: false}));
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(express.static(`${__dirname}/public`));// di vao file public = file chua cac file tinh~ css js 

//Khao bien local de su dung ben bug ( bien toan` cuc.)
app.locals.prifixAdmin = systemConfig.prifixAdmin;

//routers
route(app); 
routeAdmin(app);

app.listen(port, ()=>
{
    console.log(`App listening on port ${port}`);
}
);