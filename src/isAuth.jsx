const isAuth = ( Token ) => {
    if (Token === undefined || Token === "undefined") {
        return false
    } else {
        return true
    }
  };

export default isAuth;
