import React, { useEffect, useState } from "react";
import Company from "../../../Models/Company";
import Coupon from "../../../Models/Coupon";
import companyService from "../../../Services/CompanyService";
import {Typography, Paper } from "@mui/material";
import "./MyCompanyDetails.css";
import errorHandler from "../../../Services/ErrorHandler";
import { styled } from "@mui/system";
import { NavLink } from "react-router-dom";

// Styled components for styling
const StyledPaper = styled(Paper)(({ theme }) => ({
    textAlign: "center",
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
    maxWidth: 400,
    margin: "auto",
    marginTop: theme.spacing(2),
}));

const StyledCompanyDetailsContainer = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
});

const StyledCompanyDetails = styled("div")({
    width: 300,
    margin: 16,
    padding: 16,
    border: "1px solid #ccc",
    borderRadius: 8,
});

const StyledCompanyInfo = styled("div")({
    marginTop: 8,
});

const StyledCompanyTitle = styled(Typography)({
    marginBottom: 8,
});

// Main functional component
function MyCompanyDetails(): JSX.Element {
    const [company, setCompany] = useState<Company | undefined>(undefined);
    const [couponList, setCouponList] = useState<Coupon[]>([]);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                // Fetch company details
                const companyDetails = await companyService.getCompanyDetails();
                setCompany(companyDetails);

                // Fetch company's coupons
                const coupons = await companyService.getCoupons();
                setCouponList(coupons);
            } catch (e) {
                errorHandler.showError(e);
            }
        };

        fetchCompanyDetails();
    }, []);

    return (
        <StyledCompanyDetailsContainer className="StyledCompanyDetailsContainer">
            <StyledPaper elevation={3}>
                <StyledCompanyDetails>
                    <StyledCompanyTitle variant="h4" gutterBottom>
                        Company Details:
                    </StyledCompanyTitle>
                    <StyledCompanyInfo>
                        {company && (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    {company.name}
                                </Typography>
                                <Typography variant="body2">
                                    {company.email}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {couponList.length > 0 ? (
                                        <NavLink to={`/companycoupons/`} className="CompanyCouponsLink">
                                            Company Coupons
                                        </NavLink>
                                    ) : (
                                        <span>No coupons available.</span>
                                    )}
                                </Typography>
                            </>
                        )}
                    </StyledCompanyInfo>
                </StyledCompanyDetails>
            </StyledPaper>
        </StyledCompanyDetailsContainer>
    );
}

export default MyCompanyDetails;
