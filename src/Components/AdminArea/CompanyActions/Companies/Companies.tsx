import "./Companies.css";
import React, { useEffect, useState } from "react";
import Company from "../../../../Models/Company";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import CompanyCard from "../CompanyCard/CompanyCard";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

function Companies(): JSX.Element {
    const [companyList, setCompanyList] = useState<Company[]>([]);

    useEffect(() => {
        adminService
            .getAllCompanies()
            .then((companies) => setCompanyList(companies))
            .catch((error) => errorHandler.showError(error));
    }, []);

    return (
        <div className="AddCompanyButton"> {/* Changed class name to match AddCustomerButton */}
            <NavLink to="/addcompany">
                <Button
                    variant="contained"
                    color="success"
                >
                    Add a new company
                </Button>
            </NavLink>
            <br />
            <div className="Companies">
                {companyList.map((company) => (
                    <CompanyCard
                        key={company.id}
                        id={company.id}
                        name={company.name}
                        email={company.email}
                    />
                ))}
            </div>
        </div>
    );
}

export default Companies;
