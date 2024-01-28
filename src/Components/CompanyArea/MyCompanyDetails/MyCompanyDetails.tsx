import React, { useEffect, useState } from "react";
import Company from "../../../Models/Company";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import { Container, Typography } from "@mui/material";
import CouponCard from "../../DefaultArea/CouponCard/CouponCard";
import "./MyCompanyDetails.css";
import errorHandler from "../../../Services/ErrorHandler";
import { toast } from "react-toastify";

function MyCompanyDetails(): JSX.Element {
    const [company, setCompany] = useState<Company | undefined>(undefined);
    const [couponList, setCouponList] = useState<Coupon[]>([]);

    useEffect(() => {
        companyService.getCoupons().then((c) => setCouponList(c)).catch((err) => {
            (errorHandler.showError(err));
        });
    }, []);

    useEffect(() => {
        companyService.getCompanyDetails().then((c) => setCompany(c)).catch((err) => {
           (errorHandler.showError(err));
        });
    }, []);

    return (
        <div className="MyCompanyDetails">
            <Container className="CompanyDetails" maxWidth="md">
                {company && (
                    <>
                        <Typography variant="h4" gutterBottom>
                            {company.name}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {company.email}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Coupons:
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
                    </>
                )}
            </Container>
        </div>
    );
}

export default MyCompanyDetails;
