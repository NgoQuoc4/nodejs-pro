import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/dashboard.controller';
import { getCreateUserPage, getHomePage, getViewUser, postUpdateUser , postCreateUser, postDeleteUser } from 'controllers/user.controller';
import express, {Express} from 'express'
import fileUploadMiddleware from 'src/middlerware/molter';

const router = express.Router(); 

const webRoutes = (app : Express) => {
    router.get("/" , getHomePage )

    router.get("/create-user", getCreateUserPage)
    router.post("/handle-delete-user/:id", postDeleteUser)
    router.get("/handle-view-user/:id", getViewUser)
    router.post("/handle-update-user", postUpdateUser)
// admin route
    router.get("/admin", getDashboardPage)

    router.get("/admin/user", getAdminUserPage)
    router.get("/admin/create-user", getCreateUserPage)
    router.post("/admin/handle-create-user", fileUploadMiddleware("avatar"), postCreateUser)
   
    router.get("/admin/product", getAdminProductPage)
    router.get("/admin/order", getAdminOrderPage)

    app.use("/", router)
}

export default webRoutes