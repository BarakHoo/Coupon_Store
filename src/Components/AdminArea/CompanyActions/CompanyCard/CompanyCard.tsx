import React, {SyntheticEvent} from "react";
import Coupon from "../../../../Models/Coupon";
import {NavLink} from "react-router-dom";
import updateCompany from "../UpdateCompany/UpdateCompany";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";

interface CompanyProps {
    id: number;
    name: string;
    email: string;
    coupons?: Coupon[]; // Make coupons optional
}

function deleteMe(event: SyntheticEvent) {
    const id = (event.target as HTMLButtonElement).value;
    adminService
        .deleteCompany(id)
        .then(() => console.log("Company deleted"))
        .catch((error) => errorHandler.showError(error));
}


function CompanyCard(props: CompanyProps): JSX.Element {
    return (
        <>
            <button onClick={deleteMe} value={props.id}>Delete Me</button>
            <div className="CompanyCard">
                <NavLink to={"updatecompany/" +props.id}>
                    <input type="button" value="Update"/>
                </NavLink>
                <h3>{props.id}</h3>
                <NavLink to={"/companies/" + props.id}>
                    <h1>{props.name}</h1>
                </NavLink>
                <h2>Contact: {props.email}</h2>
            </div>
        </>
    );
}

export default CompanyCard;