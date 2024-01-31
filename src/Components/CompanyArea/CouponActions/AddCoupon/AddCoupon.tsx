// AddCoupon.tsx
import "./AddCoupon.css";
import Coupon from "../../../../Models/Coupon";
import { useForm } from "react-hook-form";
import companyService from "../../../../Services/CompanyService";
import { useState } from "react";
import errorHandler from "../../../../Services/ErrorHandler";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Button,
    FormControl,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel
} from "@mui/material";
import { authStore } from "../../../../Redux/AuthStore";

function AddCoupon(): JSX.Element {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Coupon>();
    const navigate = useNavigate();
    const [company] = useState(authStore.getState().user); // Assuming 'user' contains company information

    function addCoupon(coupon: Coupon) {
        // Ensure that the coupon object is valid
        if (coupon) {
            // Set the 'company' property of the coupon
            coupon.company = company;

            companyService.addCoupon(coupon)
                .then(() => {
                    toast.success("Coupon Added");
                    console.log(coupon);
                    navigate("/companycoupons");
                })
                .catch(err => errorHandler.showError(err));

            if (new Date(coupon.startDate) > new Date(coupon.endDate)) {
                toast.error("Start date must be before the expiration date");
                return;
            }
        } else {
            errorHandler.showError("Coupon object is undefined");
        }
    }

    return (
        <div className="UpdateCoupon">
            <FormControl>
                <FormLabel><h2>Add Coupon</h2></FormLabel>
                <br />
                <FormLabel>Coupon Title:
                    <TextField
                        variant="outlined"
                        id="title"
                        {...register("title", {
                            required: { message: "Must enter title!", value: true },
                        })}
                        helperText={errors.title && <span className="errorText">{errors.title.message}</span>}
                    />
                </FormLabel>
                <FormLabel>Coupon Description:
                    <TextField
                        variant="outlined"
                        id="description"
                        {...register("description", {
                            required: { message: "Must enter description", value: true },
                        })}
                        helperText={errors.description && <span className="errorText">{errors.description.message}</span>}
                    />
                </FormLabel>
                <FormLabel>Coupon Start Date:
                    <TextField
                        variant="outlined"
                        id="startDate"
                        type="date"
                        {...register("startDate", {
                            required: { message: "Must enter start date", value: true },
                        })}
                        helperText={errors.startDate && <span className="errorText">{errors.startDate.message}</span>}
                    />
                </FormLabel>
                <FormLabel>Coupon Expiration Date:
                    <TextField
                        variant="outlined"
                        id="endDate"
                        type="date"
                        {...register("endDate", {
                            required: { message: "Must enter end date", value: true },
                        })}
                        helperText={errors.endDate && <span className="errorText">{errors.endDate.message}</span>}
                    />
                </FormLabel>
                <FormLabel>Coupon Price:
                    <TextField
                        variant="outlined"
                        id="price"
                        type="number"
                        {...register("price", {
                            required: { message: "Must enter price", value: true },
                            min: { message: "Price must be above 0", value: 0 },
                        })}
                        helperText={errors.price && <span className="errorText">{errors.price.message}</span>}
                    />
                </FormLabel>
                <FormLabel>Coupon Stock Amount:
                    <TextField
                        variant="outlined"
                        id="amount"
                        type="number"
                        {...register("amount", {
                            required: { message: "Must enter amount", value: true },
                            min: { message: "Stock amount must be above 0", value: 0 },
                        })}
                        helperText={errors.amount && <span className="errorText">{errors.amount.message}</span>}
                    />
                </FormLabel>
                <FormLabel>Coupon Image:
                    <TextField
                        variant="outlined"
                        id="imageUrl"
                    />
                </FormLabel>
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
                <Button variant="contained" onClick={handleSubmit(addCoupon)}>Add Coupon</Button>
            </FormControl>
        </div>
    );
}

export default AddCoupon;