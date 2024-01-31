import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import Company from "../../../../Models/Company";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";

const StyledPaper = styled(Paper)(({ theme }) => ({
    textAlign: "center",
    color: theme.palette.text.secondary,
    padding: theme.spacing(2),
    maxWidth: 400,
    margin: "auto",
    marginTop: theme.spacing(2),
}));

const StyledCompanyDetailsContainer = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
});

const StyledCompanyDetails = styled("div")({
    width: 300,
    margin: 16,
    padding: 16,
    border: "1px solid #ccc",
    borderRadius: 8,
});

const StyledCompanyInfo = styled("div")({
    marginTop: 8,
});

const StyledCompanyTitle = styled(Typography)({
    marginBottom: 8,
});

function CompanyDetails(): JSX.Element {
    const params = useParams();
    const id: number = +params.id!;

    const [company, setCompany] = useState<Company | undefined>();

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const companyDetails = await adminService.getOneCompany(id);
                setCompany(companyDetails);
            } catch (e) {
                errorHandler.showError(e);
            }
        };

        fetchCompanyDetails();
    }, [id]);

    return (
        <StyledCompanyDetailsContainer className="StyledCompanyDetailsContainer">
            <StyledPaper elevation={3}>
                <StyledCompanyDetails>
                    <StyledCompanyTitle variant="h5" gutterBottom>
                        Company Details:
                    </StyledCompanyTitle>
                    <StyledCompanyInfo>
                        <Typography variant="subtitle1" gutterBottom>
                            ID: {company?.id}
                        </Typography>
                        <Typography variant="h6" component="div">
                            Company Name: {company?.name}
                        </Typography>
                        <Typography variant="h6">
                            Email: {company?.email}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            <NavLink to={`/companycoupons/${id}`}>Company Coupons</NavLink>
                        </Typography>
                    </StyledCompanyInfo>
                </StyledCompanyDetails>
            </StyledPaper>
        </StyledCompanyDetailsContainer>
    );
}

export default CompanyDetails;
