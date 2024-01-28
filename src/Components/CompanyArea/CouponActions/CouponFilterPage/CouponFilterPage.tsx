import "./CouponFilterPage.css";
import CompanyCouponsByCategory from "../CompanyCouponsByCategory/CompanyCouponsByCategory";
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";

function CouponFilterPage(): JSX.Element {
    return (
        <div className="CouponFilterPage">
            <CompanyCouponsByCategory/>
        </div>
    );
}

export default CouponFilterPage;
