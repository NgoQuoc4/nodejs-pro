import { Request, Response } from "express"
import { getProductInCart, handleAddProductToCart, handleAllProducts, handleGetProductByID, postDeleteDetailInCart } from "services/client/item.service"

const getHomePage = async (req: Request, res: Response) => {
    const products = await handleAllProducts()
    const user = req.user as any;
    console.log("user: ", user);
    return res.render("client/home/show.ejs",{
        products: products
    })
}

const getAllProductPage = async (req : Request, res : Response) => {
    await handleAllProducts()
    return res.render("client/product/index.ejs")
}
const getProductPage = async (req : Request, res : Response) => {
    const { id }  = req.params;
    const product = await handleGetProductByID(id as string);
    return res.render("client/product/show.ejs", {
        product: product
    })
}

const postAddToCartProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const User = req.user;
    if(User){
        await handleAddProductToCart(+id, 1, User);
    } else{
        return res.redirect("/login")
    }
    return res.redirect("/")
}

const getCartPage = async (req: Request, res: Response) => {
    const user = req.user; 
    if(!user) {
        return res.redirect("/login")
    }
    const cartDetail = await getProductInCart(+user.id)
    const totalCart = await cartDetail?.map((item) =>  +item.quantity * +item.price)?.reduce((a , b) => a + b , 0)

    return res.render("client/cart/show.ejs",{
        cartDetail : cartDetail,
        totalCart
    })
}
const postDeleteProductInCart = async (req: Request, res: Response) =>{
    const {id} = req.params
    const user = req.user; 
    if(!user) {
        return res.redirect("/login")
    }
    await postDeleteDetailInCart(+id, +user.id, user.sumCart)
    return res.redirect("/cart")
}
postDeleteProductInCart

export { getProductPage, getAllProductPage, getHomePage, getCartPage, postAddToCartProduct, postDeleteProductInCart }