import { prisma } from "config/client";
import getConnection from "config/database";

const handleCreateUser = async (name: string , email: string, address : string) => {
    await prisma.user.create({
        data:{
            name: name,
            email: email,
            address: address
        },
    })
}
const getAllUsers = async () => {
    const user = await prisma.user.findMany()
    return user
}
 
const handleDeleteUser = async (id: string) => {
    try{
        const connection = await getConnection();
        const sql = 'DELETE FROM `user` WHERE `id` = ?';
        const values = [id]
        const [result, fields] = await connection.execute(sql, values);
        
        return result
    } catch(err){
        console.log(err)
        return []
    }
}

const getUsersById = async (id: string) => {
    const userById = await prisma.user.findUnique({
        where:{
            id: +id,
        }
    })
    return userById
}

const updateUserById =  async (id: string, name: string , email: string, address : string) => {
    const updateUser = await prisma.user.update({
        where: {
            id: +id,
        },
        data:{
            name: name,
            email: email,
            address: address
        }
    })
    return updateUser;
}

export { handleCreateUser, getAllUsers, handleDeleteUser, getUsersById, updateUserById }