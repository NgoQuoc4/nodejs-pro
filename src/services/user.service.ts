import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
// import getConnection from "config/database"; 
const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashPassword = async (password: string) => {
   return await bcrypt.hash(password, saltRounds);
}

const getAllUsers = async () => {
    const user = await prisma.user.findMany()
    return user
}

const getAllRole = async () => {
    const roles = await prisma.role.findMany()
    return roles
}

const handleCreateUser = async (username: string, password: string, fullName: string, address: string, phone: string, accountType: string, role: string, avatar: string) => {
    const defaultPassword = await hashPassword(password);
    const createUser = await prisma.user.create({
        data:{
            username: username, 
            password: defaultPassword, 
            fullName: fullName, 
            address: address, 
            phone: phone,
            accountType: ACCOUNT_TYPE.SYSTEM, 
            roleId: +role,
            avatar: avatar,
        },
    })
    return createUser;
}

 
const handleDeleteUser = async (id: string) => {
    const deleteById = await prisma.user.delete({
        where: {
            id: +id
        }
    })
    return deleteById
}

const getUsersById = async (id: string) => {
    const userById = await prisma.user.findUnique({
        where:{
            id: +id,
        }
    })
    return userById
}

const updateUserById =  async (id: string, fullName: string, address: string, phone: string, role: string,avatar: string) => {
    const updateUser = await prisma.user.update({
        where: {
            id: +id,
        },
        data:{
            fullName: fullName, 
            address: address, 
            phone: phone,
            roleId: +role,
            avatar: avatar,
            ...(avatar !== undefined && { avatar: avatar })
        }
    })
    return updateUser;
}

export { handleCreateUser, getAllUsers, handleDeleteUser, getUsersById, updateUserById , getAllRole, hashPassword}