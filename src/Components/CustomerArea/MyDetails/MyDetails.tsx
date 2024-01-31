import React, { useEffect, useState } from "react";
import { Typography} from "@mui/material";
import Customer from "../../../Models/Customer";
import errorHandler from "../../../Services/ErrorHandler";
import customerService from "../../../Services/CustomerService";

import "./MyDetails.css"; // Assuming you have a CSS file for styling

function MyDetails(): JSX.Element {
    const [customer, setCustomer] = useState<Customer | undefined>();

    useEffect(() => {
        customerService
            .getCustomerDetails()
            .then((c) => {
                setCustomer(c);
                // Assuming there is a method in customerService to get the customer's coupons
                return customerService.getCustomerCoupons();
            })
            .catch((e) => errorHandler.showError(e));
    }, []);

    return (
        <div className="MyDetails">

                <Typography variant="h4" color="secondary" >
                    My Details:
                </Typography>
                <Typography variant="h6"  color="secondary">
                    <strong>Full Name: {customer?.firstName} {customer?.lastName}</strong>
                </Typography>
                <Typography variant="body1"  color="secondary">
                    Email: {customer?.email}
                </Typography>
        </div>
    );
}

export default MyDetails;
