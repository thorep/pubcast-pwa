import {NavLink} from "react-router";

const Header = () => {
    return (
        <nav>
            <NavLink to="/login" className={"bg-amber-400"}>Login </NavLink>
        </nav>
    )
}

export default Header