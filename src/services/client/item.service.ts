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

const handleAddProductToCart = async (productId: number, quantity: number, user: Express.User) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: user.id
        }
    })
    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    })

    if (!product) {
        throw new Error("Product not found"); 
        // Or you can return null / a specific error object depending on how your Express controller handles responses.
    }

    if (cart) {
        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                sum: {
                    increment: quantity,
                }, 
            }
        })

        const currentCartDetail = await prisma.cartDetail.findFirst({
            where: {
                productId: productId,
                cartId: cart.id
            }
        })
        await prisma.cartDetail.upsert({
            where: {
                id: currentCartDetail?.id ?? 0
            },
            update: {
                quantity: {
                    increment: quantity
                }
            },
            create: {
                price: product.price,
                quantity: quantity,
                productId: productId,
                cartId: cart.id
            }
        })
    } else{
        await prisma.cart.create({
            data: {
                sum: quantity,
                userId: user.id,
                cartDetails: {
                    create: [
                        {
                            price: product.price,
                            quantity: quantity,
                            productId: productId
                        }
                    ]
                }
            }
        })

    }
    return cart
}

const getProductInCart = async (userId:number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId: +userId,
        },
    })
    if (cart) {
        const currentCartDetail = await prisma.cartDetail.findMany({
            where: {
                cartId : cart?.id
            },
            include: {
                product: true 
            }
        })
        return currentCartDetail
    }
    return []
}
const postDeleteDetailInCart = async (id : number, userId : number, sumCart: number) => {
    const currentCartDetail = await prisma.cartDetail.findUnique({
            where: {
                id : +id
            }
    })
    if (!currentCartDetail) {
        throw new Error("Cart detail not found");
    }
    await prisma.cartDetail.delete({
        where: {
            id: id
        }
    })

    if (sumCart === 1){
        await prisma.cart.delete({
            where: {
                userId: userId
            }
        })
    } else {
        await prisma.cart.update({
            where: {
                userId: userId
            },
            data: {
                sum: {
                    decrement: currentCartDetail?.quantity
                }
            }
        })
    }
}

export { handleAllProducts, handleGetProductByID, handleAddProductToCart, getProductInCart , postDeleteDetailInCart}