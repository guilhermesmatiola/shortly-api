import { signInSchema } from "../schemas/userSchema.js";
import { signUpSchema } from "../schemas/userSchema.js";

export async function ValidateSignUp(req, res, next){

    const validation = signUpSchema.validate(req.body, {abortEarly: false});

    if (validation.error){
        console.log(validation.error.details);
        res.sendStatus(422);
        return;
    }
    next();
}

export async function ValidateSignIn(req, res, next){

    const validation = signInSchema.validate(req.body, {abortEarly:false});
    
    if (validation.error){
        console.log(validation.error.details);
        res.sendStatus(422);
        return;
    }
    next();
}