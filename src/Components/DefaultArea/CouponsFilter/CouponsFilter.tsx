import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import CouponCard from "../CouponCard/CouponCard";
import Coupon from "../../../Models/Coupon";
import generalService from "../../../Services/GeneralService";
import errorHandler from "../../../Services/ErrorHandler";
import Category from "../../../Models/Category";


function CouponsFilter(): JSX.Element {
    const [couponList, setCouponList] = useState<Coupon[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null); // Use Category type
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [showNoCouponsInfo, setShowNoCouponsInfo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let coupons: Coupon[] = [];

                if (selectedCategory !== null) {
                    if (maxPrice > 0) {
                        coupons = await generalService.getAllCouponsByCategoryAndPrice(
                            selectedCategory,
                            maxPrice
                        );
                    } else {
                        coupons = await generalService.getAllCouponsByCategory(
                            selectedCategory
                        );
                    }
                } else if (maxPrice > 0) {
                    coupons = await generalService.getAllCouponsByPrice(maxPrice);
                } else {
                    toast.warning(
                        "Please select a valid category or set a valid max price"
                    );
                }

                setCouponList(coupons);
                setShowNoCouponsInfo(true);
            } catch (error) {
                errorHandler.showError(error);
            } finally {
                setButtonClicked(false);
            }
        };

        if (buttonClicked) {
            fetchData();
        }
    }, [buttonClicked, selectedCategory, maxPrice]);

    useEffect(() => {
        if (couponList.length === 0 && showNoCouponsInfo) {
            setTimeout(() => {
                toast.info("No coupons for the selected criteria found!");
                setShowNoCouponsInfo(false);
            }, 1000);
        }
    }, [couponList, showNoCouponsInfo]);

    const handleCategoryChange = (
        event: SelectChangeEvent<Category | "null">
    ) => {
        const categoryValue: string | null = event.target.value as string | null;
        const category: Category | null =
            categoryValue === "null" ? null : (categoryValue as unknown as Category);
        setSelectedCategory(category);
    };

    const handleButtonClick = () => {
        setButtonClicked(true);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "16px" }}>
            <FormControl style={{ margin: "8px", minWidth: "120px" }}>
                <InputLabel id="category-label">Select Category</InputLabel>
                <Select
                    labelId="category-label"
                    value={selectedCategory === null ? "null" : selectedCategory}
                    onChange={handleCategoryChange}
                >
                    <MenuItem value="null" style={{ color: 'black' }}>Select Category</MenuItem>
                    <MenuItem value="Food" style={{ color: 'black' }}>Food</MenuItem>
                    <MenuItem value="Electricity" style={{ color: 'black' }}>Electricity</MenuItem>
                    <MenuItem value="Restaurant" style={{ color: 'black' }}>Restaurant</MenuItem>
                    <MenuItem value="Vacation" style={{ color: 'black' }}>Vacation</MenuItem>
                </Select>
            </FormControl>
            <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ margin: "8px", padding: "8px" }}
            />
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
                Fetch Coupons
            </Button>

            <div className="couponList">
                {couponList.map((coupon) => (
                    <div key={coupon.id}>
                        <CouponCard
                            id={coupon.id}
                            title={coupon.title}
                            description={coupon.description}
                            startDate={coupon.startDate}
                            endDate={coupon.endDate}
                            amount={coupon.amount}
                            price={coupon.price}
                            image={coupon.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CouponsFilter;
