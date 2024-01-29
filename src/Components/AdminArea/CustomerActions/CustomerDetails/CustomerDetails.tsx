// CustomerDetails.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import Customer from "../../../../Models/Customer";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import "./CustomerDetails.css";

const StyledPaper = styled(Paper)(({ theme }) => ({
    textAlign: "center",
    color: theme.palette.text.secondary,
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

function CustomerDetails(): JSX.Element {
    const params = useParams();
    const id: number = +params.id!;

    const [customer, setCustomer] = useState<Customer | undefined>();

    useEffect(() => {
        adminService.getOneCustomer(id)
            .then((c) => setCustomer(c))
            .catch((e) => errorHandler.showError(e));
    }, [id]);

    return (
        <StyledCustomerDetailsContainer className="StyledCustomerDetailsContainer">
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
                </StyledCustomerInfo>
            </StyledCustomerDetails>
        </StyledCustomerDetailsContainer>
    );
}

export default CustomerDetails;
