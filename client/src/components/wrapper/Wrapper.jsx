import { Outlet } from "react-router-dom"
import Footer from "../footer/Footer"
import Header from "../header/Header"

const Wrapper = () => {
    return <>
        <Header />
        <main className="min-h-screen">
            <Outlet />
        </main>
        <Footer />
    </>
}

export default Wrapper;