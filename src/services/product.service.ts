import { prisma } from "config/client"
import { Request, Response } from "express"

const handleGetAllProducts = async () => {
    const products = await prisma.product.findMany()
    return products
}

const handleCreateProduct = async (name: string, price: number, image: string, detailDesc: string, shortDesc: string, quantity: number, sold: string, factory: string , target: string) => {
    const createdProduct = await prisma.product.create({
        data: {
            name: name,
            price: +price,
            image: image,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: +quantity,
            sold: sold,
            factory: factory,
            target: target
        },
    })
    return createdProduct
}

const handleGetProductByID = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: +id
        }
    })
    return product
}

const handleDeleteProduct = async (id: string) => {
    const deletedProduct = await prisma.product.delete({
        where: {
            id: +id
        }
    })
    return deletedProduct
}

const handleUpdateProduct = async (id: string, name: string, price: number, image: string, detailDesc: string, shortDesc: string, quantity: number, sold: string, factory: string , target: string) => {
    const updateProduct = await prisma.product.update({
        where: {
            id: +id
        },
        data: {
            name: name,
            price: +price,
            detailDesc: detailDesc,
            shortDesc: shortDesc,
            quantity: +quantity,
            sold: sold,
            factory: factory,
            target: target,
            ...(image !== undefined && { image: image })
        },
    })
    return updateProduct
}

export { handleGetAllProducts , handleGetProductByID, handleCreateProduct, handleUpdateProduct, handleDeleteProduct }