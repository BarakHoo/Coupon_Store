import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";
import Company from "../../../../Models/Company";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import Coupon from "../../../../Models/Coupon";
import CouponCard from "../../../DefaultArea/CouponCard/CouponCard";

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
    const [couponList, setCouponList] = useState<Coupon[]>([]);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const companyDetails = await adminService.getOneCompany(id);
                setCompany(companyDetails);

                // Fetch company's coupons
                const coupons = await adminService.getCompanyCoupons(id);
                setCouponList(coupons);
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
                            {company?.name}
                        </Typography>
                        <Typography variant="body2">
                            Email: {company?.email}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Company Coupons:
                            {couponList.length > 0 ? (
                                <div className="CouponsList">
                                    {couponList.map((coupon) => (
                                        <CouponCard key={coupon.id} {...coupon} />
                                    ))}
                                </div>
                            ) : (
                                <span>No coupons available.</span>
                            )}
                        </Typography>
                    </StyledCompanyInfo>
                </StyledCompanyDetails>
            </StyledPaper>
        </StyledCompanyDetailsContainer>
    );
}

export default CompanyDetails;
