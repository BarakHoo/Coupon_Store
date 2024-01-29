import "./Customers.css";
import React, { useEffect, useState } from "react";
import Customer from "../../../../Models/Customer";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import CustomerCard from "../CustomerCard/CustomerCard";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

function Customers(): JSX.Element {
    const [customerList, setCustomerList] = useState<Customer[]>([]);

    useEffect(() => {
        adminService
            .getAllCustomers()
            .then((c) => setCustomerList(c))
            .catch((e) => errorHandler.showError(e));
    }, [customerList]);

    return (
        <div className="AddCustomerButton">
        <NavLink to="/addcustomer">
            <Button
                variant="contained"
                color="success"

            >
                Add a new customer
            </Button>
        </NavLink>
        <div className="Customers">
            {customerList.map((c) => (
                <CustomerCard
                    key={c.id}
                    id={c.id}
                    firstName={c.firstName}
                    lastName={c.lastName}
                    email={c.email}
                />
            ))}
        </div>
        </div>
    );
}

export default Customers;
