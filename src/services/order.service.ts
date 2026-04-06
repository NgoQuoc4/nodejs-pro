import { prisma } from "config/client"

const handleGetAllOrders = async () => {
    const orders = await prisma.order.findMany({
        include: {
            user: true
        }
    })
    return orders
}
const handleGetOrdersDetail = async (orderId: number) => {
     return await prisma.orderDetail.findMany({
        where: {
            orderId: orderId
        },
        include: {
            product: true
        }
    })
}
export {handleGetAllOrders,handleGetOrdersDetail}