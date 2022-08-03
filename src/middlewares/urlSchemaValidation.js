import { urlSchema } from "../schemas/urlSchema.js";

export async function ValidateURL(req, res, next){

    const validation = urlSchema.validate(req.body, { abortEarly: false});

    if (validation.error){
        console.log(validation.error.details);
        res.sendStatus(422);
        return;
    }
    next();
}