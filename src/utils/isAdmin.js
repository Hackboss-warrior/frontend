import { jwtDecode } from "jwt-decode";

const isAdmin = ( Token ) => {
    try {
        const decoded = jwtDecode(Token);
        if (decoded.jwtPayLoad.role === "user") {
            return false;
        }
        return decoded.jwtPayLoad.role;
    } catch (error) {
        return false
    }
  };

export default isAdmin;
