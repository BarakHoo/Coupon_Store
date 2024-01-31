import axios from "axios";
import Customer from "../Models/Customer";
import Company from "../Models/Company";
import Coupon from "../Models/Coupon";

class AdminService{

    public async getAllCustomers(){
        const customersResponse = await axios.get<Customer[]>("http://localhost:8080/admin/getcustomers");
       console.log(customersResponse)
        return customersResponse.data;
    }

    public async getOneCustomer(id:number){
        const customerResponse = await axios.get<Customer>("http://localhost:8080/admin/getcustomer/" + id)
        return customerResponse.data;
    }

    public async getAllCompanies(){
        const companiesResponse = await axios.get<Company[]>("http://localhost:8080/admin/getcompanies");
        return companiesResponse.data;
    }

    public async getOneCompany(id:number){
        const companyResponse = await axios.get<Company>("http://localhost:8080/admin/getcompany/" + id)
        return companyResponse.data;
    }

    public async getCompanyCoupons(id:number){
        const companyResponse = await axios.get<Coupon[]>(`http://localhost:8080/admin/getcompanycoupons?id=${id}`)
        return companyResponse.data;

    }

    public async getCustomerCoupons(id:number){
        const customerResponse = await axios.get<Coupon[]>(`http://localhost:8080/admin/getcustomercoupons?id=${id}`)
        return customerResponse.data;
    }

    public async addCustomer(customer: Customer){
        const customerResponse = await axios.post<Customer>("http://localhost:8080/admin/addcustomer", customer)
        return customerResponse.data;
    }

    public async addCompany(company: Company){
        const companyResponse = await axios.post<Company>("http://localhost:8080/admin/addcompany", company)
        return companyResponse.data;
    }


    public async updateCustomer(customer: Customer){
        const customerResponse = await axios.put<Customer>("http://localhost:8080/admin/updatecustomer", customer)
        return customerResponse.data;
    }

    public async updateCompany(company: Company){
        const companyResponse = await axios.put<Company>("http://localhost:8080/admin/updatecompany", company)
        return companyResponse.data;
    }


    public async deleteCustomer(id: any){
        const customerResponse = await axios.delete<string>("http://localhost:8080/admin/deletecustomer/" + id)
        return customerResponse.data;
    }

    public async deleteCompany(id:any){
        const companyResponse = await axios.delete<string>("http://localhost:8080/admin/deletecompany/" + id)
        return companyResponse.data;
    }





}
const adminService = new AdminService();
export default adminService;