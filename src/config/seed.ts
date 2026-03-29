import { prisma } from "config/client";
import { hashPassword } from "services/user.service";
import { ACCOUNT_TYPE } from "config/constant";

const initDataUser = async () => {
    const countUser = await prisma.user.count();
    const countRole = await prisma.role.count();
    const defaultPassword = await hashPassword("123456");
    if(countUser === 0){
        await prisma.user.createMany({
            data: [
                {
                    username: "henry@gmail.com",
                    fullName: "Henry",
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    phone: "09091111",
                    address: "HCM",
                    password: defaultPassword,
                    roleId: 1
                },  
                {
                    username: "alex@gmail.com",
                    fullName: "Alex",
                    accountType: ACCOUNT_TYPE.SYSTEM,
                    phone: "09090000",
                    address: "VN",
                    password: defaultPassword,
                    roleId: 2
                }
            ]
        })
    } 
    if(countRole === 0){
        await prisma.role.createMany({
            data: [
                {
                    name: "ADMIN",
                    description : "Admin full quyền" 
                },  
                {
                    name: "USER",
                    description : "User thông thường"
                },  
            ]
        })
    } 
    if (countUser !== 0 && countRole !== 0) {
        console.log("Data Already Initialized");
    }
}
export default initDataUser;