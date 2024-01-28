import "./CustomerDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Customer from "../../../../Models/Customer";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";

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
        <div className="CustomerDetails">
            <h3>{customer?.id}</h3>
            <h1>{customer?.firstName} {customer?.lastName}</h1>
            <h2>{customer?.email}</h2>
        </div>
    );
}

export default CustomerDetails;
