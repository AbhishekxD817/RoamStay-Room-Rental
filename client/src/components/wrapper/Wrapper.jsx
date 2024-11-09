import { Outlet } from "react-router-dom"
import Footer from "../footer/Footer"
import Header from "../header/Header"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../store/slice/authSlice"
import { isAuthenticated } from "../../api/authApi"

const Wrapper = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.auth.user)

    useEffect(() => {
        (async function () {
            await checkIsAuthenticated();
        })()
    }, [])

    const checkIsAuthenticated = async () => {
        try {
            console.log("checking auth status...")
            let response = await isAuthenticated();
            if (response.status != 200) {
                console.log(response)
                return;
            }
            if (response.data.isAuthenticated && response.data.user) {
                await dispatch(setUser(response.data));
                return;
            }
            console.log("user => null")
        } catch (error) {
            console.log("Error => ", error);
        }
    }

    useEffect(() => {
        if (user) {
            console.log("Updated user:", user);
        }
    }, [user]);

    return <>
        <Header />
        <main className="min-h-screen">
            <Outlet />
        </main>
        <Footer />
    </>
}

export default Wrapper;