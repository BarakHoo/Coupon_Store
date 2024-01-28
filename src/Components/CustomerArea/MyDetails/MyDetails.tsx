import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import Customer from "../../../Models/Customer";
import errorHandler from "../../../Services/ErrorHandler";
import customerService from "../../../Services/CustomerService";
import CouponCard from "../../DefaultArea/CouponCard/CouponCard";
import Coupon from "../../../Models/Coupon";

function MyDetails(): JSX.Element {
    const [customer, setCustomer] = useState<Customer | undefined>();
    const [couponList, setCouponList] = useState<Coupon[]>([]);

    useEffect(() => {
        customerService.getCustomerDetails()
            .then((c) => {
                setCustomer(c);
                // Assuming there is a method in customerService to get the customer's coupons
                return customerService.getCustomerCoupons();
            })
            .then((coupons) => setCouponList(coupons))
            .catch((e) => errorHandler.showError(e));
    }, []);

    return (
        <div className="MyDetails" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70vh" }}>
            <Card className="CouponCard"> {/* Apply CouponCard styling to MyDetails */}
                <CardContent>
                    <Typography variant="h6" color="black" className="CouponCard-title">
                        <strong>{customer?.firstName} {customer?.lastName}</strong>
                    </Typography>
                    <Typography variant="body2" color="black" className="CouponCard-description">
                        {customer?.email}
                    </Typography>
                    <Typography variant="h6" gutterBottom color="black">
                        My Coupons:
                        {couponList.length > 0 ? (
                            <div className="CouponsList">
                                {couponList.map((coupon) => (
                                    <CouponCard key={coupon.id} {...coupon} />
                                ))}
                            </div>
                        ) : (
                            <span>No coupons available.</span>
                        )}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default MyDetails;
