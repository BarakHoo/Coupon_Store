// CouponCard.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./CouponCard.css";
import company from "../../../Models/Company";

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




function CouponCard({ id, title, description, startDate, endDate, amount, price, image }: CouponProps): JSX.Element {
    return (
        <Card className="CouponCard">
            <NavLink to={"/coupons/" + id}>
                <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt={title}
                />
            </NavLink>
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
            </CardContent>
        </Card>
    );
}

export default CouponCard;
