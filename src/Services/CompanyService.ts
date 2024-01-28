import axios from "axios";
import Coupon from "../Models/Coupon";
import Category from "../Models/Category";
import Company from "../Models/Company";

class CompanyService{

    public async getCoupons(){
        const couponsResponse = await axios.get<Coupon[]>("http://localhost:8080/company/getcoupons");
        return couponsResponse.data;
    }

    public async getCouponsByCategory(category: Category) {
        const couponsResponse = await axios.get<Coupon[]>(`http://localhost:8080/company/getcouponsbycategory?category=${category}`);
        return couponsResponse.data;
    }


    public async getCouponsByMaxPrice(price: number) {
        const couponsResponse = await axios.get<Coupon[]>(`http://localhost:8080/company/getcouponsbyprice?price=${price}`);
        return couponsResponse.data;
    }

    public async getCouponsByCategoryAndMaxPrice(price:number, category:Category){
        const couponsResponse = await axios.get<Coupon[]>(`http://localhost:8080/company/getcouponsbycategoryandmaxprice?price=${price}&category=${category}`)
        return couponsResponse.data
    }


    public async getCompanyDetails(){
        const response = await axios.get<Company>("http://localhost:8080/company/companydetails")
        return response.data;
    }

    public async addCoupon(coupon:Coupon){
        const response = await axios.post<Coupon>("http://localhost:8080/company/addcoupon", coupon);
        return response.data;
    }

    public async updateCoupon(coupon:Coupon){
        const response = await axios.put<Coupon>("http://localhost:8080/company/updatecoupon", coupon);
        return response.data;
    }

    public async deleteCoupon(id:number){
        const response = await axios.delete<string>("http://localhost:8080/company/deletecoupon/" + id);
        return response.data;
    }

}
const companyService = new CompanyService();
export default companyService;