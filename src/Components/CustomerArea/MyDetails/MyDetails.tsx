import React, { useEffect, useState } from "react";
import { Typography, Paper } from "@mui/material";
import Customer from "../../../Models/Customer";
import customerService from "../../../Services/CustomerService";
import errorHandler from "../../../Services/ErrorHandler";
import { styled } from "@mui/system";
import {NavLink} from "react-router-dom";
import Coupon from "../../../Models/Coupon";

// Styled components for styling
const StyledPaper = styled(Paper)(({ theme }) => ({
    textAlign: "center",
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
    maxWidth: 400,
    margin: "auto",
    marginTop: theme.spacing(2),
}));

const StyledDetailsContainer = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
});

const StyledDetails = styled("div")({
    width: 300,
    margin: 16,
    padding: 16,
    border: "1px solid #ccc",
    borderRadius: 8,
});

const StyledDetailsInfo = styled("div")({
    marginTop: 8,
});

const StyledDetailsTitle = styled(Typography)({
    marginBottom: 8,
});

// Main functional component
function MyDetails(): JSX.Element {
    const [customer, setCustomer] = useState<Customer | undefined>();
    const [customerCoupons, setCustomerCoupons] = useState<Coupon[]>([]);

    useEffect(() => {
        customerService
            .getCustomerDetails()
            .then((c) => {
                setCustomer(c);
                // Assuming there is a method in customerService to get the customer's coupons
                return customerService.getCustomerCoupons();
            })
            .then((coupons) => {
                setCustomerCoupons(coupons);
            })
            .catch((e) => errorHandler.showError(e));
    }, []);

    return (
        <StyledDetailsContainer className="StyledDetailsContainer">
            <StyledPaper elevation={3}>
                <StyledDetails>
                    <StyledDetailsTitle variant="h4" gutterBottom>
                        My Details:
                    </StyledDetailsTitle>
                    <StyledDetailsInfo>
                        <Typography variant="h6" gutterBottom>
                            <strong>Full Name: {customer?.firstName} {customer?.lastName}</strong>
                        </Typography>
                        <Typography variant="body2">
                            Email: {customer?.email}
                        </Typography>
                        {customerCoupons.length > 0 ? (
                            <NavLink to="/mycoupons">
                                <Typography>
                                    My Coupons
                                </Typography>
                            </NavLink>
                        ) : (
                            <Typography>
                                You currently have no coupons!
                            </Typography>
                        )}
                    </StyledDetailsInfo>
                </StyledDetails>
            </StyledPaper>
        </StyledDetailsContainer>
    );
}

export default MyDetails;