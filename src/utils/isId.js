import { jwtDecode } from "jwt-decode";

const isId = ( Token ) => {
    if (Token === undefined || Token === "undefined" || Token === "") {
        return false
    } else {
        const decoded = jwtDecode(Token);
        return decoded.jwtPayLoad.id
    }
  };

export default isId;
