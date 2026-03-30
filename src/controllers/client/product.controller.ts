import { Request, Response } from "express"
import { handleAllProducts, handleGetProductByID } from "services/client/item.service"

const getHomePage = async (req: Request, res: Response) => {
    const products = await handleAllProducts()
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
    //postman: http://localhost:3000/product/1
    // return res.status(200).json(product)
}

export { getProductPage, getAllProductPage, getHomePage }