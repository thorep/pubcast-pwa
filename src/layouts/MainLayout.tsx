import {Outlet} from "react-router";
import BottomNav from "../components/BottomNav.tsx";

const MainLayout = ()=>{
    return (
        <>
            <Outlet />
            <BottomNav />
        </>
    )
}

export default MainLayout;