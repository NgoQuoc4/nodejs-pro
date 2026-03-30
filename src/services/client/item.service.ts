import { prisma } from "config/client"

const handleAllProducts = async () => {
    const products = await prisma.product.findMany()
    return products
}
const handleGetProductByID = async (id: string) => {
    const product = await prisma.product.findUnique({
        where: {
            id: +id
        }
    })
    return product
}

export { handleAllProducts, handleGetProductByID }