import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Coupon from "../../../Models/Coupon";
import generalService from "../../../Services/GeneralService";
import CouponCard from "../CouponCard/CouponCard";
import { authStore } from "../../../Redux/AuthStore";
import customerService from "../../../Services/CustomerService";
import { toast } from "react-toastify";
import errorHandler from "../../../Services/ErrorHandler";

import "./CouponDetails.css";

function CouponDetails(): JSX.Element {
    const params = useParams();
    const id = +params.id!;
    const [coupon, setCoupon] = useState<Coupon | undefined>();
    const [customerCoupons, setCustomerCoupons] = useState<Coupon[]>([]);
    const [isCouponInCustomerList, setIsCouponInCustomerList] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the current coupon
        generalService
            .getOneCoupon(id)
            .then((c) => setCoupon(c))
            .catch((error) => console.error("Error fetching coupon:", error));

        // Fetch the customer's coupons
        customerService
            .getCustomerCoupons()
            .then((coupons) => {
                setCustomerCoupons(coupons);
                // Check if the current coupon exists in the customer's coupon list
                const isInList = coupons.some((c) => c.id === id);
                setIsCouponInCustomerList(isInList);
            })
            .catch((error) => console.error("Error fetching customer coupons:", error));
    }, [id]);

    if (!coupon) {
        return <p>Loading...</p>;
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
            <CouponCard
                id={coupon.id}
                title={coupon.title}
                description={coupon.description}
                startDate={coupon.startDate}
                endDate={coupon.endDate}
                amount={coupon.amount}
                price={coupon.price}
                image={coupon.image}
            />
            <br />
            {authStore.getState().user?.role === "CUSTOMER" && !isCouponInCustomerList && (
                <Button variant="contained" onClick={PurchaseCoupon}>
                    BUY NOW!
                </Button>
            )}
            {isCouponInCustomerList && (
                <Typography variant="subtitle1" color="primary">
                    You already own this coupon!
                </Typography>
            )}
        </div>
    );
}

export default CouponDetails;
