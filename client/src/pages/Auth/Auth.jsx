import { useEffect } from "react";

const Auth = () => {

    useEffect(() => {
        document.title = "Authenticate";
    }, [])


    return (
        <>
            Auth
        </>
    )
}

export default Auth;