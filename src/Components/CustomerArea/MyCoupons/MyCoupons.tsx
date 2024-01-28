import "./MyCoupons.css";
import { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import customerService from "../../../Services/CustomerService";
import errorHandler from "../../../Services/ErrorHandler";
import CouponCard from "../../DefaultArea/CouponCard/CouponCard";
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";

function MyCoupons(): JSX.Element {
    const [couponList, setCouponList] = useState<Coupon[] | undefined>();

    useEffect(() => {
        customerService
            .getCustomerCoupons()
            .then((c) => setCouponList(c))
            .catch((e) => errorHandler.showError(e));
    }, []);

    return (
        <div className="MyCoupons">
            <Button variant="contained" color="primary" component={NavLink} to="/mycoupons/filters">
                Advanced Search
            </Button>
            <br/>
            {couponList ? (
                couponList.map((c) => (
                    <CouponCard
                        key={c.id}
                        id={c.id}
                        title={c.title}
                        description={c.description}
                        startDate={c.startDate}
                        endDate={c.endDate}
                        amount={c.amount}
                        price={c.price}
                        image={c.image}
                    />
                ))
            ) : (
                <p>Loading coupons...</p>
            )}
        </div>
    );
}

export default MyCoupons;
