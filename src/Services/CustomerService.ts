import Customer from "../Models/Customer";
import axios from "axios";
import Coupon from "../Models/Coupon";
import Category from "../Models/Category";

class CustomerService {

    public async getCustomerCoupons() {
        const response = await axios.get<Coupon[]>("http://localhost:8080/customer/getcustomercoupons")
        return response.data;
    }

    public async getCustomerCouponsByCategory(category: Category) {
        const response = await axios.get<Coupon[]>(`http://localhost:8080/customer/getcustomercouponsbycategory?category=${category}`);
        return response.data;
    }

    public async getCustomerCouponsByPrice(price: number) {
        const response = await axios.get<Coupon[]>(`http://localhost:8080/customer/getcustomercouponsbyprice?price=${price}`);
        return response.data;
    }

    public async getCustomerCouponsByCategoryAndMaxPrice(price: number, category: Category) {
        const couponsResponse = await axios.get<Coupon[]>(`http://localhost:8080/customer/getcouponsbycategoryandmaxprice?price=${price}&category=${category}`);
        return couponsResponse.data;
    }


    public async getCustomerDetails() {
        const response = await axios.get<Customer>("http://localhost:8080/customer/getcustomerdetails")
        return response.data;
    }

    public async purchaseCoupon(coupon:Coupon){
        const response = await axios.post<Coupon>("http://localhost:8080/customer/purchasecoupon", coupon)
        return response.data;
    }

}

const customerService = new CustomerService();
export default customerService;