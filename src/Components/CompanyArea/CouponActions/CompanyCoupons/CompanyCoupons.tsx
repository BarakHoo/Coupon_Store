import "./CompanyCoupons.css";
import { useEffect, useState } from "react";
import Coupon from "../../../../Models/Coupon";
import companyService from "../../../../Services/CompanyService";
import errorHandler from "../../../../Services/ErrorHandler";
import CompanyCouponCard from "../CompanyCouponCard/CompanyCouponCard";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { Add, Search } from "@mui/icons-material";

function CompanyCoupons(): JSX.Element {
    const [couponList, setCouponList] = useState<Coupon[]>([]);

    useEffect(() => {
        companyService
            .getCoupons()
            .then((c) => setCouponList(c))
            .catch((err) => errorHandler.showError(err));
    }, [couponList]);

    return (
        <div className="CompanyCoupons">
            <Button
                variant="contained"
                color="primary"
                component={NavLink}
                to="/companycoupons/filters"
                startIcon={<Search />}
            >
                Advanced Search
            </Button>
            <br />
            <br />
            <Button
                variant="contained"
                color="primary"
                component={NavLink}
                to="/companycoupons/addcoupon"
                startIcon={<Add />}
            >
                Add a new coupon
            </Button>
            <br />
            {couponList.map((c) => (
                <CompanyCouponCard
                    key={c.id}
                    id={c.id}
                    title={c.title}
                    description={c.description}
                    startDate={c.startDate}
                    endDate={c.endDate}
                    amount={c.amount}
                    price={c.price}
                    image={c.image}
                />
            ))}
        </div>
    );
}

export default CompanyCoupons;
