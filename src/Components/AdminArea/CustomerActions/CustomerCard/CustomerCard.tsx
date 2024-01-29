import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";
import { styled } from "@mui/system";

interface CustomerProps {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
    width: 300, // Adjust the width as needed
    margin: theme.spacing(2),
    border: "1px solid #ccc", // Border color
    borderRadius: theme.spacing(1), // Border radius
}));

const CardsContainer = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around", // You can use "space-between" or other values
});

const CenteredCardActions = styled(CardActions)({
    justifyContent: "center",
});

function CustomerCard(props: CustomerProps): JSX.Element {
    const deleteMe = () => {
        adminService
            .deleteCustomer(props.id)
            .then(() => console.log("Customer deleted"))
            .catch((error) => errorHandler.showError(error));
    };

    return (
        <CardsContainer>
            <StyledCard>
                <CardContent>
                    <NavLink to={`/customers/updatecustomer/${props.id}`}>
                        <Button variant="contained" color="primary">
                            Update
                        </Button>
                    </NavLink>
                    <div className="CustomerDetails">
                        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                            ID: {props.id}
                        </Typography>
                        <Typography variant="h5" component="div" color="primary">
                            {props.firstName} {props.lastName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Email: {props.email}
                        </Typography>
                    </div>
                </CardContent>
                <CenteredCardActions>
                    <Button
                        size="small"
                        onClick={deleteMe}
                        color="error"
                        variant="contained"
                    >
                        Delete Me
                    </Button>
                    <NavLink to={`/customers/${props.id}`}>
                        <Button size="small" color="primary" variant="contained">
                            More Details
                        </Button>
                    </NavLink>
                </CenteredCardActions>
            </StyledCard>
        </CardsContainer>
    );
}

export default CustomerCard;
