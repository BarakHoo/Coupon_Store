import "./CustomerNavbar.css";
import {NavLink} from "react-router-dom";

function CustomerNavbar(): JSX.Element {
    return (
        <div className="CustomerNavbar">
			<NavLink to="/mydetails">My Details</NavLink>
            <br/>
            <NavLink to="/mycoupons">My Coupons</NavLink>
        </div>
    );
}

export default CustomerNavbar;
