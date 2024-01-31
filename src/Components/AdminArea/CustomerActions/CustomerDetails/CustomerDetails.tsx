// Import the necessary components and styles
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import Customer from "../../../../Models/Customer";
import Coupon from "../../../../Models/Coupon";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import "./CustomerDetails.css";

// Styled components for styling
const StyledPaper = styled(Paper)(({ theme }) => ({
    textAlign: "center",
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
    maxWidth: 400,
    margin: "auto",
    marginTop: theme.spacing(2),
}));

const StyledCustomerDetailsContainer = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
});

const StyledCustomerDetails = styled("div")({
    width: 300,
    margin: 16,
    padding: 16,
    border: "1px solid #ccc",
    borderRadius: 8,
});

const StyledCustomerInfo = styled("div")({
    marginTop: 8,
});

const StyledCustomerTitle = styled(Typography)({
    marginBottom: 8,
});

const StyledCouponContainer = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    maxWidth: "100%", // Ensure the container doesn't exceed 100% width
});

// Main functional component
function CustomerDetails(): JSX.Element {
    const params = useParams();
    const id: number = +params.id!;

    const [customer, setCustomer] = useState<Customer | undefined>();
    const [couponList, setCouponList] = useState<Coupon[]>([]);

    useEffect(() => {
        const fetchCustomerDetails = async () => {
            try {
                // Fetch customer details
                const customerDetails = await adminService.getOneCustomer(id);
                setCustomer(customerDetails);

                // Fetch customer's coupons
                const coupons = await adminService.getCustomerCoupons(id);
                setCouponList(coupons);
            } catch (e) {
                errorHandler.showError(e);
            }
        };

        fetchCustomerDetails();
    }, [id]);

    return (
        <StyledCustomerDetailsContainer className="StyledCustomerDetailsContainer">
            <StyledPaper elevation={3}>
                <StyledCustomerDetails>
                    <StyledCustomerTitle variant="h5" gutterBottom>
                        Customer Details:
                    </StyledCustomerTitle>
                    <StyledCustomerInfo>
                        <Typography variant="subtitle1" gutterBottom>
                            ID: {customer?.id}
                        </Typography>
                        <Typography variant="h6" component="div">
                            {customer?.firstName} {customer?.lastName}
                        </Typography>
                        <Typography variant="body2">
                            Email: {customer?.email}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {couponList.length > 0 ? (
                                <NavLink to={`/customercoupons/${id}`} className="CustomerCouponsLink">
                                    Customer Coupons
                                </NavLink>
                            ) : (
                                <span>No coupons available.</span>
                            )}
                        </Typography>

                    </StyledCustomerInfo>
                </StyledCustomerDetails>
            </StyledPaper>
        </StyledCustomerDetailsContainer>
    );
}

export default CustomerDetails;