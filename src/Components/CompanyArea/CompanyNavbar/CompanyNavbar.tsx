import "./CompanyNavbar.css";
import {NavLink} from "react-router-dom";

function CompanyNavbar(): JSX.Element {
    return (
        <div className="CompanyNavbar">
			<NavLink to={"/companycoupons"}>Company Coupons</NavLink>
            <br/>
            <NavLink to={"/companydetails"}>Company Details</NavLink>
        </div>
    );
}

export default CompanyNavbar;
