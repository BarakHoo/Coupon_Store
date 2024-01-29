import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Customer from "../../../../Models/Customer";
import errorHandler from "../../../../Services/ErrorHandler";
import adminService from "../../../../Services/AdminService";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: 400,
    margin: "auto",
}));

function AddCustomer(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<Customer>();
    const navigate = useNavigate();

    const sendForm = (customer: Customer) => {
        adminService
            .addCustomer(customer)
            .then(() => {
                console.log("Customer added!");
                navigate("/customers");
            })
            .catch((e) => errorHandler.showError(e));
    };

    const inputProps = {
        style: { color: "black" }, // Set the text color
    };

    const labelProps = {
        style: { color: "black" }, // Set the label color
    };

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
                Add Customer
            </Typography>
            <form onSubmit={handleSubmit(sendForm)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="First Name"
                            variant="outlined"
                            inputProps={inputProps}
                            InputLabelProps={labelProps}
                            {...register("firstName", {
                                required: { message: "Must enter first name!", value: true },
                            })}
                        />
                        {formState.errors?.firstName && (
                            <span style={{ color: "red" }}>{formState.errors?.firstName?.message}</span>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            variant="outlined"
                            inputProps={inputProps}
                            InputLabelProps={labelProps}
                            {...register("lastName", {
                                required: { message: "Must enter last name!", value: true },
                            })}
                        />
                        {formState.errors?.lastName && (
                            <span style={{ color: "red" }}>{formState.errors?.lastName?.message}</span>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            type="email"
                            inputProps={inputProps}
                            InputLabelProps={labelProps}
                            {...register("email", {
                                required: { message: "Must enter email!", value: true },
                            })}
                        />
                        {formState.errors?.email && (
                            <span style={{ color: "red" }}>{formState.errors?.email?.message}</span>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            variant="outlined"
                            type="password"
                            inputProps={inputProps}
                            InputLabelProps={labelProps}
                            {...register("password", {
                                required: { message: "Must enter password!", value: true },
                            })}
                        />
                        {formState.errors?.password && (
                            <span style={{ color: "red" }}>{formState.errors?.password?.message}</span>
                        )}
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </StyledPaper>
    );
}

export default AddCustomer;
