import { Request, Response } from "express"
import { getAllRole, getAllUsers, getUsersById, handleCreateUser, handleDeleteUser, updateUserById } from "services/user.service";

const getHomePage = async (req : Request, res : Response) =>{
    const users = await getAllUsers();
  return res.render("home", {
    users : users
  })
}

const getCreateUserPage = async (req : Request, res : Response) => {
    const roles = await getAllRole();
    return res.render("admin/user/create.ejs",{
        roles: roles
    })
}
const postCreateUser = async (req : Request, res : Response) => { 
    const {username, password, fullName, address, phone, accountType} = req.body 
    const file  = req?.file;
    const avatar = file?.filename ?? "image-non.png";
    await handleCreateUser(username, password, fullName, address, phone, accountType, avatar);

    return res.redirect("/admin/user")  
}
 
const postDeleteUser = async (req : Request, res : Response) => { 
    const { id } = req.params;
    const safeId = Array.isArray(id) ? id[0] : id;
    if (!safeId) {
        return res.status(400).send("User ID is required");
    }
    await handleDeleteUser(safeId);

    return res.redirect("/")
}
const getViewUser = async (req : Request, res : Response) => {
    const { id } = req.params;
    const safeId = Array.isArray(id) ? id[0] : id;
    if (!safeId) {
        return res.status(400).send("User ID is required");
    }

   const user = await getUsersById(safeId)
  return res.render("view-user.ejs", { id : id , user : user})
}

const postUpdateUser = async (req : Request, res : Response) => {
  const { id , name, email, address} = req.body;

  await updateUserById( id , name, email, address);

  return res.redirect("/")
}
export {getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getViewUser, postUpdateUser }