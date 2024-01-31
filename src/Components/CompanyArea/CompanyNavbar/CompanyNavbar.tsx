import React from "react";
import "./CompanyNavbar.css";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { NavLink } from "react-router-dom";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BusinessIcon from "@mui/icons-material/Business";

function CompanyNavbar(): JSX.Element {
    return (
        <BottomNavigation className="CompanyNavbar" showLabels style={{ backgroundColor: "inherit" }}>
            <BottomNavigationAction label="Company Coupons" icon={<LocalOfferIcon />} component={NavLink} to="/companycoupons" />
            <BottomNavigationAction label="Company Details" icon={<BusinessIcon />} component={NavLink} to="/companydetails" />
        </BottomNavigation>
    );
}

export default CompanyNavbar;
