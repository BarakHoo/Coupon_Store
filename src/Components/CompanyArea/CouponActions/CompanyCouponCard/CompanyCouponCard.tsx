import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CompanyCouponCard.css";
import companyService from "../../../../Services/CompanyService";
import { toast } from "react-toastify";
import errorHandler from "../../../../Services/ErrorHandler";
import { red } from "@mui/material/colors";
import generalService from "../../../../Services/GeneralService";

interface CompanyCouponCardProps {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    amount: number;
    price: number;
    image: string;
}

function CompanyCouponCard({
                               id,
                               title,
                               description,
                               startDate,
                               endDate,
                               amount,
                               price,
                               image,
                           }: CompanyCouponCardProps): JSX.Element {
    const navigate = useNavigate();

    const handleUpdateClick = () => {
        navigate("/companycoupons/updatecoupon/" + id);
    };

    function deleteMe(id: number) {
        const coupon = generalService.getOneCoupon(id);
        companyService
            .deleteCoupon(id)
            .then(() => {
                toast.success("Coupon deleted!");
                navigate("/companycoupons");
            })
            .catch((e) => errorHandler.showError(e));
    }

    return (
        <Card className="CompanyCouponCard">
            <NavLink to={"/coupons/" + id}>
                <CardMedia component="img" height="140" image={image} alt={title} />
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
                <Button variant="contained" onClick={handleUpdateClick}>
                    Update
                </Button>
                <Button
                    variant="contained"
                    style={{ color: red[500] }}
                    onClick={() => deleteMe(id)}
                    startIcon={<DeleteIcon />}
                >
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
}

export default CompanyCouponCard;
