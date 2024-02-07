const isAuth = ( Token ) => {
    if (Token === undefined || Token === "undefined" || Token === "") {
        return false
    } else {
        return true
    }
  };

export default isAuth;
