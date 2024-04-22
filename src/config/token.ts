import jwt from "jsonwebtoken";
import { Payload } from "../types/userTypes";

export const generateToken = (payload: Payload): string => {
  const token = jwt.sign({ user: payload }, process.env.JWT_SECRET || "", {
    expiresIn: "2d",
  });
  return token;
};
export const validateToken = (token: string): Payload | null | any => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      user: Payload;
    };
    return decoded.user;
  } catch (error) {
    console.error("Error al validar el token:", error);
    return error; // Devuelve el error para obtener más detalles
  }
};

// import {sign,verify} from "jsonwebtoken";
// import { Payload } from "../types/userTypes";

// export const generateToken = (payload: Payload): string => {
//   const secret = process.env.JWT_SECRET as string
// const token = sign({user: {id:payload.id, isAdmin:payload.isAdmin}}, secret, {expiresIn : "2d"});
// if(!token) throw new Error
// return token
// }

// export const validateToken = (token: string) => {
//   try {
//     const user= verify(token, process.env.JWT_SECRET as string);
//     return user;
//   } catch (error) {
//     return null;
//   }
// };
