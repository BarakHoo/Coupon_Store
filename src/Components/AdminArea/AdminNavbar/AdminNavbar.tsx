import React from "react";
import "./AdminNavbar.css";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { NavLink } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";

function AdminNavbar(): JSX.Element {
    return (
        <BottomNavigation className="AdminNavbar" showLabels style={{ backgroundColor: "inherit" }}>
            <BottomNavigationAction label="Customers" icon={<PeopleIcon />} component={NavLink} to="/customers" />
            <BottomNavigationAction label="Companies" icon={<BusinessIcon />} component={NavLink} to="/companies" />
        </BottomNavigation>
    );
}

export default AdminNavbar;
