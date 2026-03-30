import { Request, Response } from "express"

const getProductPage = async (req : Request, res : Response) => {
    const { id } = req.params;
    return res.render("client/product/show.ejs")
}
const getAllProductPage = async (req : Request, res : Response) => {
    return res.render("client/product/index.ejs")
}

export { getProductPage, getAllProductPage }