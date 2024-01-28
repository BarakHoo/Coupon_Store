import "./CustomerCard.css";
import { NavLink } from "react-router-dom";
import adminService from "../../../../Services/AdminService";
import { SyntheticEvent } from "react";
import errorHandler from "../../../../Services/ErrorHandler";

interface CustomerProps {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

function CustomerCard(props: CustomerProps): JSX.Element {
    function deleteMe(event: SyntheticEvent) {
        const id = (event.target as HTMLButtonElement).value;
        adminService
            .deleteCustomer(id)
            .then(() => console.log("Customer deleted"))
            .catch((error) => errorHandler.showError(error));
    }

    return (
        <div className="CustomerCard">
            <NavLink to={"/customers/updatecustomer/" + props.id}>
                <input type="button" value="Update" />
            </NavLink>
            <div className="CustomerDetails">
                <button onClick={deleteMe} value={props.id}>
                    Delete Me
                </button>
                <h3>ID: {props.id}</h3>
                <NavLink to={"/customers/" + props.id}>
                    <h1>{props.firstName} {props.lastName}</h1>
                </NavLink>
                <h2>Email: {props.email}</h2>
            </div>
        </div>
    );
}

export default CustomerCard;
