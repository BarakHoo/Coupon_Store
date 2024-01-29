// CompanyCard.tsx

import React, { SyntheticEvent } from "react";
import Coupon from "../../../../Models/Coupon";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import { styled } from "@mui/system";

interface CompanyProps {
    id: number;
    name: string;
    email: string;
    coupons?: Coupon[];
}

const StyledCard = styled(Card)(({ theme }) => ({
    width: 300,
    margin: theme.spacing(2),
    border: "1px solid #ccc",
    borderRadius: theme.spacing(1),
}));

const CenteredCardActions = styled(CardActions)({
    justifyContent: "center",
});

function deleteMe(event: SyntheticEvent) {
    const id = (event.target as HTMLButtonElement).value;
    adminService
        .deleteCompany(id)
        .then(() => console.log("Company deleted"))
        .catch((error) => errorHandler.showError(error));
}

function CompanyCard(props: CompanyProps): JSX.Element {
    return (
        <StyledCard>
            <CardContent>
                <NavLink to={"updatecompany/" + props.id}>
                    <Button variant="contained" color="primary">
                        Update
                    </Button>
                </NavLink>
                <div className="CompanyDetails">
                    <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                        ID: {props.id}
                    </Typography>
                    <Typography variant="h5" component="div" color="primary">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Email: {props.email}
                    </Typography>
                </div>
            </CardContent>
            <CenteredCardActions>
                <Button onClick={deleteMe} value={props.id} variant="contained" color="error">
                    Delete Me
                </Button>
                <NavLink to={`/companies/${props.id}`}>
                    <Button size="small" color="primary" variant="contained">
                        More Details
                    </Button>
                </NavLink>
            </CenteredCardActions>
        </StyledCard>
    );
}

export default CompanyCard;
