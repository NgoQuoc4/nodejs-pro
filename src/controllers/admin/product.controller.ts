import { COMPUTER_BRANDS, LAPTOP_TYPES } from "config/constant";
import { Request, Response } from "express"
import { handleCreateProduct, handleDeleteProduct, handleGetProductByID, handleUpdateProduct } from "services/product.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";
const SOLD = {
    "SOLD_OUT": "SOLD_OUT",
    "AVAILABLE": "AVAILABLE"
}

const getCreateProductPage = async (req: Request, res: Response) => {
    const errors= []
    const oldData = {}
    return res.render("admin/product/create.ejs", {
        SOLD: SOLD,
        COMPUTER_BRANDS: COMPUTER_BRANDS,
        LAPTOP_TYPES: LAPTOP_TYPES,
        errors: errors,
        oldData: oldData
    } )
}

const postCreateProduct = async (req: Request, res: Response) => {
    const file  = req?.file;
    const image = file?.filename ?? "image-not-found.png";
    const {name, price, detailDesc, shortDesc, quantity, factory, target} = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);
    if(!validate.success){
        const errorsZod = validate.error.issues;
        const errors = errorsZod.map((item) => `${item.message} (${item.path[0]})`);
        const oldData = { ...req.body };
        return res.status(400).render("admin/product/create.ejs", {
            SOLD: SOLD,
            COMPUTER_BRANDS: COMPUTER_BRANDS,
            LAPTOP_TYPES: LAPTOP_TYPES,
            errors: errors,
            oldData: oldData
        });
    }

    await handleCreateProduct(name, price, image, detailDesc, shortDesc, quantity, factory, target)
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
    const {id, name, price, detailDesc, shortDesc, quantity, factory, target} = req.body;
    const file  = req?.file;
    const image  = file?.filename ?? undefined;
    await handleUpdateProduct(id, name, price, image, detailDesc, shortDesc, quantity, factory, target)
    return res.redirect('/admin/product')
}

export { postCreateProduct, getViewProduct, postDeleteProduct ,postUpdateProduct ,getCreateProductPage }