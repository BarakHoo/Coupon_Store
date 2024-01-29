import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Customer from "../../../../Models/Customer";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: 400,
    margin: "auto",
}));

const StyledForm = styled("form")({
    marginTop: "20px",
});

function UpdateCustomer(): JSX.Element {
    const params = useParams();
    const id = +params.id!;
    const { register, handleSubmit, formState, setValue } = useForm<Customer>();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer>();

    useEffect(() => {
        adminService.getOneCustomer(id).then((c) => {
            setCustomer(c);
            if (c) {
                setValue("firstName", c.firstName);
                setValue("lastName", c.lastName);
                setValue("email", c.email);
                setValue("password", c.password);
            } else {
                console.log("Customer not found!");
                navigate("/customers");
            }
        }).catch((err) => errorHandler.showError(err));
    }, []);

    function sendForm(customer: Customer) {
        customer.id = id;

        adminService.updateCustomer(customer).then(() => {
            console.log("Customer updated!");
            navigate("/customers");
        }).catch((err) => errorHandler.showError(err));
    }

    const inputProps = {
        style: { color: "black" }, // Set the text color
    };

    const labelProps = {
        style: { color: "black" }, // Set the label color
        shrink: true, // Set the shrink state to true
    };

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
                Update Customer
            </Typography>
            <StyledForm onSubmit={handleSubmit(sendForm)}>
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
            </StyledForm>
        </StyledPaper>
    );
}

export default UpdateCustomer;
