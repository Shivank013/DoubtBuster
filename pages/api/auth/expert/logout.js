import { errorHandler } from "@/middlewares/error";
import { cookieSetter } from "@/utils/feature";

export default async function handler(req, res) {
    if(req.method!='GET'){
        return errorHandler(res,null,false);
    }
    cookieSetter(res,null,false);
    res.status(200).json({
        success: true,
        message:"logout sucessfully"
    });
};