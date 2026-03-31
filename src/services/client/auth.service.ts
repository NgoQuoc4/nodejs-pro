import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { hashPassword } from "services/user.service";

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

export { isEmailExist, registerNewUser, userRoles }