import React, { useEffect, useState } from "react";
import Coupon from "../../../../Models/Coupon";
import companyService from "../../../../Services/CompanyService";
import Category from "../../../../Models/Category";
import CompanyCouponCard from "../CompanyCouponCard/CompanyCouponCard";
import errorHandler from "../../../../Services/ErrorHandler";
import { toast } from "react-toastify";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

function CompanyCouponsByCategory(): JSX.Element {
    const [couponList, setCouponList] = useState<Coupon[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [maxPrice, setMaxPrice] = useState<number>(0);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [showNoCouponsInfo, setShowNoCouponsInfo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let coupons: Coupon[] = [];

                if (selectedCategory !== null) {
                    if (maxPrice > 0) {
                        // Fetch coupons based on both category and max price
                        coupons = await companyService.getCouponsByCategoryAndMaxPrice(maxPrice, selectedCategory);
                    } else {
                        // Fetch coupons based on category only
                        coupons = await companyService.getCouponsByCategory(selectedCategory);
                    }
                } else if (maxPrice > 0) {
                    // Fetch coupons based on max price only
                    coupons = await companyService.getCouponsByMaxPrice(maxPrice);
                } else {
                    // Handle the case where neither category nor max price is selected
                    toast.warning("Please select a valid category or set a valid max price");
                }

                setCouponList(coupons);
                setShowNoCouponsInfo(true); // Set the flag to show the info message
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
            // Use setTimeout to delay showing the info message
            setTimeout(() => {
                toast.info("No coupons for the selected criteria found!");
                setShowNoCouponsInfo(false);
            }, 1000); // Adjust the delay as needed (in milliseconds)
        }
    }, [couponList, showNoCouponsInfo]);

    const handleCategoryChange = (
        event: SelectChangeEvent<Category | "null">,
    ) => {
        const categoryValue: string | null = event.target.value as string | null;
        const category: Category | null = categoryValue === "null" ? null : (categoryValue as unknown as Category);
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
                        <CompanyCouponCard
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

export default CompanyCouponsByCategory;
