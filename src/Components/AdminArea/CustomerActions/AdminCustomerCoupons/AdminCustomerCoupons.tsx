import React, { useEffect, useState } from "react";
import Coupon from "../../../../Models/Coupon";
import adminService from "../../../../Services/AdminService";
import { useParams } from "react-router-dom";
import errorHandler from "../../../../Services/ErrorHandler";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CouponCard from "../../../DefaultArea/CouponCard/CouponCard";

import "./AdminCustomerCoupons.css";

function AdminCustomerCoupons(): JSX.Element {
    const params = useParams();
    const id = +params.id!;
    const [couponList, setCouponList] = useState<Coupon[]>();

    useEffect(() => {
        adminService
            .getCustomerCoupons(id)  // Assuming there's a method to get customer coupons
            .then((c) => setCouponList(c))
            .catch((e) => errorHandler.showError(e));
    }, [id]);

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
        <div className="AdminCustomerCoupons">
            <Slider {...settings}>
                {couponList?.map((coupon) => (
                    <CouponCard
                        key={coupon.id}
                        id={coupon.id}
                        title={coupon.title}
                        description={coupon.description}
                        startDate={coupon.startDate}
                        endDate={coupon.endDate}
                        amount={coupon.amount}
                        price={coupon.price}
                        image={coupon.image}
                    />
                ))}
            </Slider>
        </div>
    );
}

export default AdminCustomerCoupons;
