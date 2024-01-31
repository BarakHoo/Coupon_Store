import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Company from "../../../../Models/Company";
import adminService from "../../../../Services/AdminService";
import errorHandler from "../../../../Services/ErrorHandler";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: 400,
    margin: "auto",
}));

function AddCompany(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<Company>();
    const navigate = useNavigate();

    const sendForm = (company: Company) => {
        adminService
            .addCompany(company)
            .then(() => {
                console.log("Company added!");
                navigate("/companies");
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
                Add Company
            </Typography>
            <form onSubmit={handleSubmit(sendForm)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Company Name"
                            variant="outlined"
                            inputProps={inputProps}
                            InputLabelProps={labelProps}
                            {...register("name", {
                                required: { message: "Must enter company name!", value: true },
                            })}
                        />
                        {formState.errors?.name && (
                            <span style={{ color: "red" }}>{formState.errors?.name?.message}</span>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Company Email"
                            variant="outlined"
                            type="email"
                            inputProps={inputProps}
                            InputLabelProps={labelProps}
                            {...register("email", {
                                required: { message: "Must enter company email!", value: true },
                            })}
                        />
                        {formState.errors?.email && (
                            <span style={{ color: "red" }}>{formState.errors?.email?.message}</span>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Company Password"
                            variant="outlined"
                            type="password"
                            inputProps={inputProps}
                            InputLabelProps={labelProps}
                            {...register("password", {
                                required: { message: "Must enter company password!", value: true },
                            })}
                        />
                        {formState.errors?.password && (
                            <span style={{ color: "red" }}>{formState.errors?.password?.message}</span>
                        )}
                    </Grid>
                </Grid>
                <br/>
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </StyledPaper>
    );
}

export default AddCompany;
