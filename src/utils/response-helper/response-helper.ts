import { RequestHandler, Response, Request, response } from "express";

const ResponseHandler = (statusCode: number, status: string, message: string, data: any = null) => {
    (res: Response) => {
        return res.status(statusCode).send({
            status: status,
            message: message,
            data: data
        });
    }
}

export default ResponseHandler;