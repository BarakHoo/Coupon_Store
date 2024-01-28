import "./DefaultNavbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { authStore } from "../../../Redux/AuthStore";
import { useEffect, useState } from "react";
import authService from "../../../Services/AuthService";
import errorHandler from "../../../Services/ErrorHandler";

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
        <div className="DefaultNavbar">
            Hello {name ? `${name}!` : "Guest"}
            <br />
            {authStore.getState().token.length > 0 ? (
                <a href="#" onClick={logout}>
                    Logout
                </a>
            ) : (
                <NavLink to="">Login</NavLink>
            )}
            <br />
            <NavLink to="/coupons">Coupons</NavLink>
        </div>
    );
}

export default DefaultNavbar;
