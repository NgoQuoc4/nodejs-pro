import { COMPUTER_BRANDS, LAPTOP_TYPES } from "config/constant";
import { Request, Response } from "express"
import { handleCreateProduct, handleDeleteProduct, handleGetProductByID, handleUpdateProduct } from "services/product.service";
const SOLD = {
    "SOLD_OUT": "SOLD_OUT",
    "AVAILABLE": "AVAILABLE"
}

const getCreateProductPage = async (req: Request, res: Response) => {
    return res.render("admin/product/create.ejs", {
        SOLD: SOLD,
        COMPUTER_BRANDS: COMPUTER_BRANDS,
        LAPTOP_TYPES: LAPTOP_TYPES
    } )
}

const postCreateProduct = async (req: Request, res: Response) => {
    const {name, price, detailDesc, shortDesc, quantity, sold, factory, target} = req.body;
    const file  = req?.file;
    const image = file?.filename ?? "image-not-found.png";
    await handleCreateProduct(name, price, image, detailDesc, shortDesc, quantity, sold, factory, target)
    return res.redirect('/admin/product')
}
const getViewProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const safeId = Array.isArray(id) ? id[0] : id;
    if (!safeId) {
        return res.status(400).send("User ID is required");
    }
    const product = await handleGetProductByID(safeId);
    return res.render("admin/product/detail.ejs", {
        product: product,
        SOLD: SOLD,
        COMPUTER_BRANDS: COMPUTER_BRANDS,
        LAPTOP_TYPES: LAPTOP_TYPES
    })
}
const postDeleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const safeId = Array.isArray(id) ? id[0] : id;
    if (!safeId) {
        return res.status(400).send("User ID is required");
    }
    await handleDeleteProduct(safeId);
    return res.redirect("/admin/product")
}

const postUpdateProduct = async (req: Request, res: Response) => {
    const {id, name, price, detailDesc, shortDesc, quantity, sold, factory, target} = req.body;
    const file  = req?.file;
    const image  = file?.filename ?? undefined;
    await handleUpdateProduct(id, name, price, image, detailDesc, shortDesc, quantity, sold, factory, target)
    return res.redirect('/admin/product')
}

export { postCreateProduct, getViewProduct, postDeleteProduct ,postUpdateProduct ,getCreateProductPage }