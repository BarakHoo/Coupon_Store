import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import Coupon from "../../../Models/Coupon";
import customerService from "../../../Services/CustomerService";
import errorHandler from "../../../Services/ErrorHandler";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CouponCard from "../../DefaultArea/CouponCard/CouponCard";

import "./MyCoupons.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Search} from "@mui/icons-material";

function MyCoupons(): JSX.Element {
    const [couponList, setCouponList] = useState<Coupon[] | undefined>();

    useEffect(() => {
        customerService
            .getCustomerCoupons()
            .then((c) => setCouponList(c))
            .catch((e) => errorHandler.showError(e));
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <ArrowForwardIcon />,
        prevArrow: <ArrowBackIcon />,
    };

    return (
        <div className="MyCoupons">
            <Button variant="contained" color="primary" component={NavLink} to="/mycoupons/filters"  startIcon={<Search />}>
                Advanced Search
            </Button>
            <br />
            <Slider {...settings}>
                {couponList ? (
                    couponList.map((c) => (
                        <CouponCard
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
                    ))
                ) : (
                    <p>Loading coupons...</p>
                )}
            </Slider>
        </div>
    );
}

export default MyCoupons;
