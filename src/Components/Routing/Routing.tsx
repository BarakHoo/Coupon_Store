import React from 'react';
import {Navigate, Route, Routes, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {authStore} from '../../Redux/AuthStore';
import Customers from '../AdminArea/CustomerActions/Customers/Customers';
import CustomerDetails from '../AdminArea/CustomerActions/CustomerDetails/CustomerDetails';
import Companies from '../AdminArea/CompanyActions/Companies/Companies';
import CompanyDetails from '../AdminArea/CompanyActions/CompanyDetails/CompanyDetails';
import CompanyCoupons from '../CompanyArea/CouponActions/CompanyCoupons/CompanyCoupons';
import Login from '../DefaultArea/Login/Login';
import MyCompanyDetails from '../CompanyArea/MyCompanyDetails/MyCompanyDetails';
import UpdateCoupon from '../CompanyArea/CouponActions/UpdateCoupon/UpdateCoupon';
import AddCoupon from '../CompanyArea/CouponActions/AddCoupon/AddCoupon';
import CouponFilterPage from '../CompanyArea/CouponActions/CouponFilterPage/CouponFilterPage';
import MyDetails from '../CustomerArea/MyDetails/MyDetails';
import MyCoupons from '../CustomerArea/MyCoupons/MyCoupons';
import CouponFilter from '../CustomerArea/CouponFilter/CouponFilter';
import AddCustomer from '../AdminArea/CustomerActions/AddCustomer/AddCustomer';
import UpdateCustomer from '../AdminArea/CustomerActions/UpdateCustomer/UpdateCustomer';
import AddCompany from '../AdminArea/CompanyActions/AddCompany/AddCompany';
import UpdateCompany from '../AdminArea/CompanyActions/UpdateCompany/UpdateCompany';
import Coupons from "../DefaultArea/Coupons/Coupons";
import CouponDetails from "../DefaultArea/CouponDetails/CouponDetails";
import CouponsFilter from "../DefaultArea/CouponsFilter/CouponsFilter";

function Routing(): JSX.Element {
    const navigate = useNavigate();
    const userRole = authStore.getState().user?.role;

    // Function to handle forbidden access
    const handleForbiddenAccess = () => {
        toast.error('User forbidden!');
        navigate('/');
    };

    return (
        <div className="Routing">
            <Routes>
                {userRole === 'ADMIN' ? (
                    <>
                        <Route path="/customers" element={<Customers/>}/>
                        <Route path="/customers/:id" element={<CustomerDetails/>}/>
                        <Route path="/addcustomer" element={<AddCustomer/>}/>
                        <Route
                            path="/customers/updatecustomer/:id"
                            element={<UpdateCustomer/>}
                        />

                        <Route path="/companies/" element={<Companies/>}/>
                        <Route path="/companies/:id" element={<CompanyDetails/>}/>
                        <Route path="/addcompany" element={<AddCompany/>}/>
                        <Route
                            path="companies/updatecompany/:id"
                            element={<UpdateCompany/>}
                        />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/"/>}/>
                )}

                {userRole === 'COMPANY' ? (
                    <>
                        <Route path="/companycoupons" element={<CompanyCoupons/>}/>
                        <Route path="/companydetails" element={<MyCompanyDetails/>}/>
                        <Route
                            path="/companycoupons/updatecoupon/:id"
                            element={<UpdateCoupon/>}
                        />
                        <Route
                            path="/companycoupons/addcoupon/"
                            element={<AddCoupon/>}
                        />
                        <Route
                            path="/companycoupons/filters/"
                            element={<CouponFilterPage/>}
                        />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/"/>}/>
                )}

                {userRole === 'CUSTOMER' ? (
                    <>
                        <Route path="/mydetails" element={<MyDetails/>}/>
                        <Route path="/mycoupons" element={<MyCoupons/>}/>
                        <Route
                            path="/mycoupons/filters"
                            element={<CouponFilter/>}
                        />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/"/>}/>
                )}

                <Route path="/" element={<Login/>}/>
                <Route path="/coupons" Component={Coupons}/>
                <Route path="/coupons/:id" Component={CouponDetails}/>
                <Route path="/coupons/filters" Component={CouponsFilter}/>
            </Routes>
        </div>
    );
}

export default Routing;
