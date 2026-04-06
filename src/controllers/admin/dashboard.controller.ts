import { Request, Response } from "express"
import { getCount } from "services/dashboard.service"
import { handleGetAllOrders, handleGetOrdersDetail } from "services/order.service"
import { handleGetAllProducts } from "services/product.service"
import { getAllUsers } from "services/user.service"

const getDashboardPage = async (req : Request, res : Response) =>{
    const count = await getCount()
    return res.render("admin/dashboard/show.ejs",
        {
            count: count
        }
    )
}
const getAdminUserPage = async (req : Request, res : Response) =>{
    const users = await getAllUsers();
    return res.render("admin/user/show.ejs", {
        users: users
    })
}
const getAdminProductPage = async (req : Request, res : Response) =>{
    const products = await handleGetAllProducts();
    return res.render("admin/product/show.ejs", {
        products: products
    })
}
const getAdminOrderPage = async (req : Request, res : Response) =>{
    const orders = await handleGetAllOrders();
    console.log(orders)
    return res.render("admin/order/show.ejs",{
        orders: orders
    })
}
const getViewOrderDetail = async (req : Request, res : Response) =>{
    const {id} = req.params;
    const orderDetail = await handleGetOrdersDetail(+id);
    console.log("quoc",orderDetail)
    return res.render("admin/order/detail.ejs",{
        orderDetail: orderDetail,
        id: id
    })
}

export {getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage, getViewOrderDetail}