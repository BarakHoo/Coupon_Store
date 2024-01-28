import React from "react";
import "./CompanyDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Company from "../../../../Models/Company";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import CouponCard from "../../../DefaultArea/CouponCard/CouponCard";

function CompanyDetails(): JSX.Element {
    const params = useParams();
    const id = +params.id!;

    const [company, setCompany] = useState<Company | undefined>();

    useEffect(() => {
        adminService.getOneCompany(id)
            .then(c => setCompany(c))
            .catch(e => errorHandler.showError(e));
    }, [id]);

    return (
        <div className="CompanyDetails">
            <h3>{company?.id}</h3>
            <h1>{company?.name}</h1>
            <h2>Contact: {company?.email}</h2>

        </div>
    );
}

export default CompanyDetails;
