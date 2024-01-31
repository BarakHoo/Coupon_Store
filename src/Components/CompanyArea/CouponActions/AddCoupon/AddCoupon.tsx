import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import companyService from "../../../../Services/CompanyService";
import errorHandler from "../../../../Services/ErrorHandler";
import { authStore } from "../../../../Redux/AuthStore";
import Coupon from "../../../../Models/Coupon";
import { useNavigate } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: 400,
    margin: "auto",
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(2),
    "& .MuiTextField-root": {
        marginBottom: theme.spacing(2),
    },
    "& .MuiButton-root": {
        marginTop: theme.spacing(2),
    },
}));

function AddCoupon(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Coupon>();
    const [company] = useState(authStore.getState().user);

    function addCoupon(coupon: Coupon) {
        if (coupon) {
            coupon.company = company;

            companyService
                .addCoupon(coupon)
                .then(() => {
                    toast.success("Coupon Added");
                    console.log(coupon);
                    navigate("/companycoupons");
                })
                .catch((err) => errorHandler.showError(err));

            if (new Date(coupon.startDate) > new Date(coupon.endDate)) {
                toast.error("Start date must be before the expiration date");
                return;
            }
        } else {
            errorHandler.showError("Coupon object is undefined");
        }
    }

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
                Add Coupon
            </Typography>
            <form onSubmit={handleSubmit(addCoupon)}>
                <StyledFormControl>
                    <FormLabel>Coupon Title:</FormLabel>
                    <TextField
                        variant="outlined"
                        id="title"
                        {...register("title", {
                            required: { message: "Must enter title!", value: true },
                        })}
                        helperText={errors.title && <span className="errorText">{errors.title.message}</span>}
                        inputProps={{ style: { color: "black" } }}
                    />

                    <FormLabel>Coupon Description:</FormLabel>
                    <TextField
                        variant="outlined"
                        id="description"
                        {...register("description", {
                            required: { message: "Must enter description", value: true },
                        })}
                        helperText={errors.description && <span className="errorText">{errors.description.message}</span>}
                        inputProps={{ style: { color: "black" } }}
                    />

                    <FormLabel>Coupon Start Date:</FormLabel>
                    <TextField
                        variant="outlined"
                        id="startDate"
                        type="date"
                        {...register("startDate", {
                            required: { message: "Must enter start date", value: true },
                        })}
                        helperText={errors.startDate && <span className="errorText">{errors.startDate.message}</span>}
                        inputProps={{ style: { color: "black" } }}
                    />

                    <FormLabel>Coupon Expiration Date:</FormLabel>
                    <TextField
                        variant="outlined"
                        id="endDate"
                        type="date"
                        {...register("endDate", {
                            required: { message: "Must enter end date", value: true },
                        })}
                        helperText={errors.endDate && <span className="errorText">{errors.endDate.message}</span>}
                        inputProps={{ style: { color: "black" } }}
                    />

                    <FormLabel>Coupon Price:</FormLabel>
                    <TextField
                        variant="outlined"
                        id="price"
                        type="number"
                        {...register("price", {
                            required: { message: "Must enter price", value: true },
                            min: { message: "Price must be above 0", value: 0 },
                        })}
                        helperText={errors.price && <span className="errorText">{errors.price.message}</span>}
                        inputProps={{ style: { color: "black" }, step: "0.01" } as any}
                    />



                    <FormLabel>Coupon Stock Amount:</FormLabel>
                    <TextField
                        variant="outlined"
                        id="amount"
                        type="number"
                        {...register("amount", {
                            required: { message: "Must enter amount", value: true },
                            min: { message: "Stock amount must be above 0", value: 0 },
                        })}
                        helperText={errors.amount && <span className="errorText">{errors.amount.message}</span>}
                        inputProps={{ style: { color: "black" } }}
                    />

                    <FormLabel>Coupon Image:</FormLabel>
                    <TextField variant="outlined" id="imageUrl" inputProps={{ style: { color: "black" } }} />

                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="Food"
                        id="category"
                        {...register("category")}
                    >
                        <FormControlLabel
                            value="Food"
                            control={<Radio {...register("category")} sx={{ '&.Mui-checked': { color: 'red' } }} />}
                            label="Food"
                        />
                        <FormControlLabel
                            value="Electricity"
                            control={<Radio {...register("category")} sx={{ '&.Mui-checked': { color: 'red' } }} />}
                            label="Electricity"
                        />
                        <FormControlLabel
                            value="Restaurant"
                            control={<Radio {...register("category")} sx={{ '&.Mui-checked': { color: 'red' } }} />}
                            label="Restaurant"
                        />
                        <FormControlLabel
                            value="Vacation"
                            control={<Radio {...register("category")} sx={{ '&.Mui-checked': { color: 'red' } }} />}
                            label="Vacation"
                        />
                    </RadioGroup>

                    <Button type="submit" variant="contained" color="primary">
                        Add Coupon
                    </Button>
                </StyledFormControl>
            </form>
        </StyledPaper>
    );
}

export default AddCoupon;
