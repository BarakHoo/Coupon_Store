import React from "react";
import "./CustomerNavbar.css";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

function CustomerNavbar(): JSX.Element {
    return (
        <BottomNavigation className="CustomerNavbar" showLabels style={{ backgroundColor: "inherit" }}>
            <BottomNavigationAction label="My Details" icon={<PersonIcon />} component={NavLink} to="/mydetails" />
            <BottomNavigationAction label="My Coupons" icon={<LocalOfferIcon />} component={NavLink} to="/mycoupons" />
        </BottomNavigation>
    );
}

export default CustomerNavbar;
