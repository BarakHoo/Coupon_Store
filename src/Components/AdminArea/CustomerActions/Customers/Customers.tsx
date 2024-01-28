import "./Customers.css";
import { useEffect, useState } from "react";
import Customer from "../../../../Models/Customer";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import CustomerCard from "../CustomerCard/CustomerCard";
import { NavLink } from "react-router-dom";

function Customers(): JSX.Element {
    const [customerList, setCustomerList] = useState<Customer[]>([]);

    useEffect(() => {
        adminService
            .getAllCustomers()
            .then((c) => setCustomerList(c))
            .catch((e) => errorHandler.showError(e));
    }, [customerList]);

    return (
        <div className="getAllCustomers">
            <NavLink to="/addcustomer">
                <input type="button" value="Add a new customer" />
            </NavLink>
            <br />
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
    );
}

export default Customers;
