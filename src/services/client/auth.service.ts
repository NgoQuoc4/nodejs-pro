import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { comparePassword, hashPassword } from "services/user.service";

const userRoles = async () => {
    const userRole = await prisma.role.findUnique(
        {
            where: {
                name: "USER"
            }
        }
    )
    return userRole
}

const isEmailExist = async (username: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    });
    if (user) {
        return true;
    }
    return false
};

const registerNewUser = async (username: string, fullName: string, password: string) => {
    const userRole = await prisma.role.findUnique({where: { name: "USER"}});
    if (!userRole) {
        throw new Error("Role not found");
    }
    const newPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
        data: {
            username: username,
            fullName: fullName,
            password : newPassword,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: userRole.id,
        }
    });
    return newUser
}

const handleLogin = async (username: string, password: string, callback: any) => {
    //check if user exist
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        }
    });
    if (!user) {
        // throw new Error(`Username: ${username} not found`);
        return callback(null, false, { message: `Username: ${username} not found` });
    }
    //check if password is correct
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        // throw new Error(`Invalid password`);
        return callback(null, false, { message: "Invalid password" });
    }
    return callback(null, user);
}

const getUserWithRoleById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id: +id
        },
        include: {
            role: true
        },
        omit: {
            password: true
        }
    });
    return user;
}
const getUserSumCart = async (id: string) => {
    const user = await prisma.cart.findUnique({
        where: {
            userId: +id
        }
    })
    return user?.sum ?? 0;
}

const handleGetOrderHistory = async (userId: number) => {
    const orders = await prisma.order.findMany({
        where: {
            userId: userId
        },
        include: {
            orderDetails: {
                include: {
                    product: true
                }
            }
        }
    })
    return orders
}
export { isEmailExist, registerNewUser, userRoles , handleLogin, getUserWithRoleById, getUserSumCart, handleGetOrderHistory}