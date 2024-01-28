import React from "react";
import "./CouponDetails.css";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import generalService from "../../../Services/GeneralService";
import CouponCard from "../CouponCard/CouponCard";
import {Button} from "@mui/material";
import {authStore} from "../../../Redux/AuthStore";
import customerService from "../../../Services/CustomerService";
import {toast} from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";

function CouponDetails(): JSX.Element {
    const params = useParams();
    const id = +params.id!;
    const [coupon, setCoupon] = useState<Coupon | undefined>();
    const navigate = useNavigate();
    useEffect(() => {
        generalService.getOneCoupon(id)
            .then(c => setCoupon(c))
            .catch(error => console.error("Error fetching coupon:", error));
    }, [id]);

    if (!coupon) {
        return <p>Loading...</p>; // You can replace this with a loading spinner or other loading indicator
    }

    function PurchaseCoupon() {
        customerService
            .purchaseCoupon(coupon)
            .then(() => {
                toast.success("Coupon purchased successfully!");
                navigate("/coupons");
            })
            .catch((e) => errorHandler.showError(e));
    }


    return (
        <div className="CouponDetails">
            <h3>Coupon ID: {coupon?.id}</h3>
            <h1>{coupon?.title}</h1>
            <h2>${coupon?.price}</h2>
            <p>{coupon?.description}</p>
            <h2>There are only {coupon?.amount} left in stock!</h2>
            <h3>Available since: {coupon?.startDate?.toString()}</h3>
            <h3>Expires at: {coupon?.endDate?.toString()}</h3>
            <img src={coupon?.image} alt={coupon.title} />
            <br/>
            {authStore.getState().user?.role === "CUSTOMER" && <Button onClick={PurchaseCoupon} >BUY NOW!</Button>}
        </div>
    );
}

export default CouponDetails;
