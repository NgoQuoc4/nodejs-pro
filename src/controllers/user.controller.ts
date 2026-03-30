import { Request, Response } from "express"
import { getAllRole, getAllUsers, getUsersById, handleCreateUser, handleDeleteUser, updateUserById } from "services/user.service";

const getHomePage = async (req : Request, res : Response) =>{
    return res.render("client/home/show.ejs")
}

const getCreateUserPage = async (req : Request, res : Response) => {
    const roles = await getAllRole();
    return res.render("admin/user/create.ejs",{
        roles: roles
    })
}

const postCreateUser = async (req : Request, res : Response) => { 
    const {username, password, fullName, address, phone, accountType, role} = req.body 
    const file  = req?.file;
    const avatar = file?.filename ?? "image-not-found.png";
    await handleCreateUser(username, password, fullName, address, phone, accountType,role, avatar );

    return res.redirect("/admin/user")  
}
 
const postDeleteUser = async (req : Request, res : Response) => { 
    const { id } = req.params;
    const safeId = Array.isArray(id) ? id[0] : id;
    if (!safeId) {
        return res.status(400).send("User ID is required");
    }
    await handleDeleteUser(safeId);

    return res.redirect("/admin/user")
}
const getViewUser = async (req : Request, res : Response) => {
    const { id } = req.params;
    const safeId = Array.isArray(id) ? id[0] : id;
    if (!safeId) {
        return res.status(400).send("User ID is required");
    }
    const roles = await getAllRole();
    const user = await getUsersById(safeId)
    return res.render("admin/user/detail.ejs", { id : id , user : user, roles : roles })
}

const postUpdateUser = async (req : Request, res : Response) => {
    const { id , fullName, address, phone, role} = req.body;
    const file  = req?.file;
    const avatar = file?.filename ?? undefined;
    await updateUserById( id , fullName, address, phone, role, avatar);

  return res.redirect("/admin/user")
}
export {getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser }