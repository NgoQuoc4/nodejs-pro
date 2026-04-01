import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller';
import { getCreateProductPage, getViewProduct, postCreateProduct, postUpdateProduct, postDeleteProduct } from 'controllers/admin/product.controller';
import { getLoginPage, getRegisterPage, getRegister } from 'controllers/client/auth.controller';
import { getProductPage, getAllProductPage, getHomePage } from 'controllers/client/product.controller';
import { getCreateUserPage, getViewUser, postUpdateUser , postCreateUser, postDeleteUser } from 'controllers/user.controller';
import express, {Express} from 'express'
import passport from 'passport';
import fileUploadMiddleware from 'src/middlerware/multer';


const router = express.Router(); 

const webRoutes = (app : Express) => {
    // client route
    router.get("/" , getHomePage )
    router.get("/products" , getAllProductPage )
    router.get("/product/:id" , getProductPage)

    // login, register route
    router.get("/login", getLoginPage)
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureMessage: true
    }))
    router.get("/register", getRegisterPage)
    router.post("/register", getRegister)

    // router.get("/create-user", getCreateUserPage)

    // admin route
    //user
    router.get("/admin", getDashboardPage)

    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/create-user", getCreateUserPage)
    router.post("/admin/handle-create-user", fileUploadMiddleware("avatar", "images/user"), postCreateUser)
   
    router.post("/admin/handle-delete-user/:id", postDeleteUser)
    router.get("/admin/handle-view-user/:id", getViewUser)
    router.post("/admin/handle-update-user", fileUploadMiddleware("avatar", "images/user") , postUpdateUser)

    //product
    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/create-product", getCreateProductPage)
    router.post("/admin/handle-create-product", fileUploadMiddleware("image", "images/product"), postCreateProduct)
    router.get("/admin/handle-view-product/:id", getViewProduct)
    router.post("/admin/handle-delete-product/:id", postDeleteProduct)
    router.post("/admin/handle-update-product", fileUploadMiddleware("image", "images/product"), postUpdateProduct)

    
    //order
    router.get("/admin/order", getAdminOrderPage)

    app.use("/", router)
}

export default webRoutes