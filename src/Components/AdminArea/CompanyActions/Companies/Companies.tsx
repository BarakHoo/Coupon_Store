import "./Companies.css";
import { useEffect, useState } from "react";
import Company from "../../../../Models/Company";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import CompanyCard from "../CompanyCard/CompanyCard";
import { NavLink } from "react-router-dom";



function Companies(): JSX.Element {
    const [companyList, setCompanyList] = useState<Company[]>([]);

    useEffect(() => {
        adminService
            .getAllCompanies()
            .then((companies) => setCompanyList(companies))
            .catch((error) => errorHandler.showError(error));
    }, []);

    return (
            <div className="Companies">
                <NavLink to="/addcompany" >
                    <input type="button" value="Add a new company"/>
                </NavLink>
                <br/>
                {companyList.map((company) => (
                    <CompanyCard
                        key={company.id}
                        id={company.id}
                        name={company.name}
                        email={company.email}
                    />
                ))}
            </div>

    );
}

export default Companies;
