import { ValidationError } from "joi";
import ErrorHandlerClass from "../services/ErrorHandlerClass";
//this middleware with catch all errors thrown in the express 

const errorHanddler = (err, req, res, next) => {
  
    let data = {
        statusCode: 500,
        message: "internal error",
        originalError: err.message
    }

    if (err instanceof ValidationError) {
      
        data={
            statusCode:422,
            message: "error from middlewareError",
            originalError: err.message
        }
    }

    if(err instanceof ErrorHandlerClass)
    {
        data={
            statusCode:err.status,
            message: "error from middlewareError customErrorClass",
            originalError: err.message
        }
    }
    return res.status(data.statusCode).json(data)
}
//after creating middleware u have to resistor it
export default errorHanddler