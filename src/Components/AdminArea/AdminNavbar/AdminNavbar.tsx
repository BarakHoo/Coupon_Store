// AdminNavbar component
import "./AdminNavbar.css";
import { NavLink } from "react-router-dom";

function AdminNavbar(): JSX.Element {
    return (
        <div className="AdminNavbar">
            <NavLink to="/customers">Customers</NavLink>
            <br/>
            <NavLink to="/companies">Companies</NavLink>
        </div>
    );
}

export default AdminNavbar;
