import axios from "axios";
import Coupon from "../Models/Coupon";
import Category from "../Models/Category";
import Customer from "../Models/Customer";

class GeneralService {
    public async getAllCoupons() {
        const response = await axios.get<Coupon[]>("http://localhost:8080/getcoupons");
        return response.data;
    }

    public async getAllCouponsByCategory(category: Category) {
        const response = await axios.get<Coupon[]>(`http://localhost:8080/getcouponsbycategory?category=${category}`);
        return response.data;
    }

    public async getAllCouponsByPrice(price: number) {
        const response = await axios.get<Coupon[]>(`http://localhost:8080/getcouponsbyprice?price=${price}`);
        return response.data;
    }

    public async getAllCouponsByCategoryAndPrice(category: Category, price: number) {
        const response = await axios.get<Coupon[]>(`http://localhost:8080/getcouponsbycategoryandprice?category=${category}&price=${price}`);
        return response.data;
    }

    public async getOneCoupon(id: number) {
        const response = await axios.get<Coupon>(`http://localhost:8080/coupondetails/${id}`);
        return response.data;
    }

    public async customerRegister(customer:Customer){
        const response = await axios.post<Customer>("http://localhost:8080/register", customer)
        return response.data
    }
}

const generalService = new GeneralService();
export default generalService;
