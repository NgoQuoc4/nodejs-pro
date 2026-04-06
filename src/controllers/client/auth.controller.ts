import { Request, Response } from "express"
import { userRoles, registerNewUser, handleGetOrderHistory } from "services/client/auth.service"
import { RegisterSchema, TRegisterSchema } from "../../validation/auth.schema";

const getLoginPage = async (req: Request, res: Response) => {
    const { session } = req as any;
    const messages = session?.messages ?? [];
    return res.render("client/auth/login.ejs", { 
        messages: messages
    })
}
const getRegisterPage = (req: Request, res: Response) => {
    const errors: string[] = [];
    const oldInput = {
        username: "",
        fullName: "",
        password: "",
        password_confirmation: ""
    }
    return res.render("client/auth/register.ejs", {
        errors: errors,
        oldInput: oldInput
    })
}

const getRegister = async (req: Request, res: Response) => {
    const { username, fullName, password, password_confirmation } = req.body as TRegisterSchema;
    const validationResult = await RegisterSchema.safeParseAsync( req.body);
    if (!validationResult.success) {
        const errorZod = validationResult.error.issues;
        const errors = errorZod.map((err) => `${err.message} ${err.path[0]}`);
        // return res.status(400).json({ errors });
        const  oldInput =  {
                username,
                fullName,
                password,
                password_confirmation
            }
        return res.render("client/auth/register.ejs", {
            errors: errors,
            oldInput: oldInput
        })
    }
    await registerNewUser(username, fullName, password);
    return res.redirect("/login");
}
const getSuccessRedirectPage = (req: Request, res: Response) => {
    const user = req.user as any;
    if (user?.role?.name === "ADMIN") {
       return res.redirect("/admin");
    }else {
       return res.redirect("/")
    }
}
const postLogout = (req: Request, res: Response, next: Function) => {
    req.logout(() => {
        return res.redirect("/login");
    } );
}

const getHistoryPage = async (req: Request, res: Response) => {
    const user = req.user;
    if(!user) {
        return res.redirect("/login")
    }   
    const history = await handleGetOrderHistory(user.id)
    console.log( "history",history)
    console.log(history.map((item) => item.orderDetails ))
    return res.render("client/cart/history.ejs",{
        history: history
    })
}
export { getLoginPage, getRegisterPage, getRegister, getSuccessRedirectPage, postLogout , getHistoryPage}