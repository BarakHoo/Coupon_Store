import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { authStore } from "../../../../Redux/AuthStore";
import Coupon from "../../../../Models/Coupon";
import generalService from "../../../../Services/GeneralService";

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

function UpdateCoupon(): JSX.Element {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Coupon>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id!;
    const company = authStore.getState().user;

    useEffect(() => {
        generalService
            .getOneCoupon(id)
            .then((c) => {
                if (c) {
                    setValue("title", c.title);
                    setValue("category", c.category);
                    setValue("description", c.description);
                    setValue("startDate", c.startDate);
                    setValue("endDate", c.endDate);
                    setValue("amount", c.amount);
                    setValue("price", c.price);
                    setValue("image", c.image);

                    // Initialize company property
                    setValue("company", c.company); // Make sure to use the correct property name if it's not "company"
                }
            })
            .catch((err) => errorHandler.showError(err));
    }, [id, setValue]);

    function sendCoupon(coupon: Coupon) {
        // Ensure that the coupon object has the 'id' property
        if (coupon && id !== undefined) {
            // Set the 'id' property of the coupon
            coupon.id = id;

            companyService
                .updateCoupon(coupon)
                .then(() => {
                    toast.success("Coupon Updated");
                    console.log(coupon);
                    navigate("/companycoupons");
                })
                .catch((err) => errorHandler.showError(err));

            if (new Date(coupon.startDate) >= new Date(coupon.endDate)) {
                toast.error("Start date must be before the expiration date");
                return;
            }
        } else {
            console.error("Coupon object or 'id' property is undefined");
        }
    }

    return (
        <StyledPaper elevation={3}>
            <Typography variant="h5" gutterBottom>
                Update Coupon
            </Typography>
            <form onSubmit={handleSubmit(sendCoupon)}>
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
                    <TextField
                        variant="outlined"
                        id="imageUrl"
                        {...register("image", {
                            required: { message: "Must enter image", value: false },
                        })}
                        helperText={errors.image && <span className="errorText">{errors.image.message}</span>}
                        inputProps={{ style: { color: "black" } }}
                    />

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
                        Update Coupon
                    </Button>
                </StyledFormControl>
            </form>
        </StyledPaper>
    );
}

export default UpdateCoupon;