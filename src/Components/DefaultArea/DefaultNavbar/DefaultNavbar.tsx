import React from "react";
import "./DefaultNavbar.css";
import { BottomNavigation, BottomNavigationAction, Avatar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthStore";
import { useEffect, useState } from "react";
import authService from "../../../Services/AuthService";
import errorHandler from "../../../Services/ErrorHandler";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

function DefaultNavbar(): JSX.Element {
    const [name, setName] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const user = authStore.getState().user;

        if (user) {
            if (user.name) {
                setName(user.name);
            } else if (user.firstName) {
                setName(user.firstName);
            }
        }

        const unsubscribe = authStore.subscribe(() => {
            const updatedUser = authStore.getState().user;
            if (updatedUser) {
                if (updatedUser.name) {
                    setName(updatedUser.name);
                } else if (updatedUser.firstName) {
                    setName(updatedUser.firstName);
                } else {
                    setName("Guest");
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, [name]);

    function logout() {
        authService
            .logout()
            .then(() => {
                setName("Guest");
                navigate("/");
            })
            .catch((err) => errorHandler.showError(err));
    }

    return (
        <BottomNavigation className="DefaultNavbar" showLabels style={{ backgroundColor: "inherit" }}>
            <BottomNavigationAction
                label={`Hello ${name ? `${name}!` : "Guest"}`}
                icon={<Avatar><AccountCircleIcon /></Avatar>}
            />
            {authStore.getState().token.length > 0 ? (
                <BottomNavigationAction label="Logout" icon={<ExitToAppIcon />} onClick={logout} />
            ) : (
                <BottomNavigationAction label="Login" icon={<VpnKeyIcon />} component={NavLink} to="" />
            )}
            <BottomNavigationAction icon={<LocalOfferIcon />} label="All Coupons" component={NavLink} to="/coupons" />
        </BottomNavigation>
    );
}

export default DefaultNavbar;
