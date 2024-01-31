import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import "./CouponCard.css";

interface CouponProps {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    price: number;
    image: string;
}



function CouponCard({
                        id,
                        title,
                        description,
                        startDate,
                        endDate,
                        amount,
                        price,
                        image,
                    }: CouponProps): JSX.Element {
    const location = useLocation();

    return (
        <Card className="CouponCard">
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt={title}
                sx={{ '&.MuiCardMedia-img': { objectFit: 'cover' }, '&.MuiCardMedia-root': { color: 'black' } }}
            />
            <Typography variant="body1" color="text.secondary">
                <strong>Coupon ID:{id}</strong>
            </Typography>
            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    <strong>{title}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: ${price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Available: {amount} left in stock
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Available since: {startDate.toString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Expires at: {endDate.toString()}
                </Typography>

                {location.pathname !== `/coupons/${id}` && (
                    <NavLink to={`/coupons/${id}`}>More Details</NavLink>
                )}
            </CardContent>
        </Card>
    );
}

export default CouponCard;
