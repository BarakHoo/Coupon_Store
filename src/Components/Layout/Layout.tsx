import React, { useEffect, useState } from "react";
import "./Layout.css";
import Header from "../Header/Header";
import DefaultNavbar from "../DefaultArea/DefaultNavbar/DefaultNavbar";
import AdminNavbar from "../AdminArea/AdminNavbar/AdminNavbar";
import CompanyNavbar from "../CompanyArea/CompanyNavbar/CompanyNavbar";
import { ToastContainer } from "react-toastify";
import { authStore } from "../../Redux/AuthStore";
import CustomerNavbar from "../CustomerArea/CustomerNavbar/CustomerNavbar";
import Footer from "../Footer/Footer";

function Layout(): JSX.Element {
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const updateRole = () => {
            const role = authStore.getState().user?.role || null;
            setUserRole(role);
        };

        updateRole(); // Initial call to set the initial role

        const unsubscribe = authStore.subscribe(updateRole);

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="Layout">
            <Header />
            <DefaultNavbar />
            {userRole === "ADMIN" && <AdminNavbar />}
            {userRole === "COMPANY" && <CompanyNavbar />}
            {userRole === "CUSTOMER" && <CustomerNavbar />}
            <ToastContainer />
        </div>
    );
}

export default Layout;
