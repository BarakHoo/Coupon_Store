import "./Coupons.css";
import React, { useEffect, useState } from "react";
import Coupon from "../../../Models/Coupon";
import generalService from "../../../Services/GeneralService";
import CouponCard from "../CouponCard/CouponCard";
import errorHandler from "../../../Services/ErrorHandler";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";


function Coupons(): JSX.Element {
    const [couponList, setCouponList] = useState<Coupon[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        generalService
            .getAllCoupons()
            .then((c) => setCouponList(c))
            .catch((e) => errorHandler.showError(e));
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Display 3 items at a time
        slidesToScroll: 1,
        nextArrow: <ArrowForwardIcon />,
        prevArrow: <ArrowBackIcon />,
    };

    return (
        <div className="Coupons">
            <Button variant="contained" color="primary" component={NavLink} to="/coupons/filters">
                Advanced Search
            </Button>
            <Slider {...settings}>
                {couponList.map((c) => (
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
                ))}
            </Slider>
        </div>
    );
}

export default Coupons;
