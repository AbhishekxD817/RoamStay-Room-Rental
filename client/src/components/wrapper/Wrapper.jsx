import { Outlet } from "react-router-dom"
import Footer from "../footer/Footer"
import Header from "../header/Header"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "../../store/slice/authSlice"
import { isAuthenticated } from "../../api/authApi"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            toast.info("Checking Auth status...")
            let response = await isAuthenticated();
            if (response && response.data.isAuthenticated && response.data.user) {
                dispatch(setUser(response.data.user));
                toast.success("Already Logged In")
                return;
            }
            if(response == undefined){
                toast.error("We use Render FREE service for backend serve and it takes upto 1-2 mins to start...");
                return;
            }
            toast.warning(response.data.message);
        } catch (error) {
            const { message = "Error"} = error;
            toast.error(message);
            return;
        }
    }

    return <>
        <Header />
        <main className="min-h-screen">
            <Outlet />
        </main>
        <Footer />
        <ToastContainer
            position="bottom-right"
            draggable
            theme="dark"
            
        />
    </>
}

export default Wrapper;