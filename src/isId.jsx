import { jwtDecode } from "jwt-decode";

const isId = ( Token ) => {
    if (Token === undefined || Token === "undefined") {
        return false
    } else {
        const decoded = jwtDecode(res.data.Token);
        return decoded.jwtPayLoad.id
    }
  };

export default isId;
