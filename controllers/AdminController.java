package com.example.JohnCouponPart2.controllers;

import com.example.JohnCouponPart2.beans.Company;
import com.example.JohnCouponPart2.beans.Coupon;
import com.example.JohnCouponPart2.beans.Customer;
import com.example.JohnCouponPart2.exceptions.CompanyException;
import com.example.JohnCouponPart2.exceptions.CustomerException;
import com.example.JohnCouponPart2.exceptions.UnauthorizedException;
import com.example.JohnCouponPart2.services.AdminService;
import com.example.JohnCouponPart2.services.ClientService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private HashMap<String, ClientService> tokensStore;

    private HttpServletRequest request;

    public AdminController(HashMap<String, ClientService> tokensStore, HttpServletRequest request) {
        this.tokensStore = tokensStore;
        this.request = request;
    }

    @PostMapping("/addcompany")
    public Company addCompany(@RequestBody Company company) throws CompanyException, UnauthorizedException {
        getAdminFacade().addCompany(company);
        return company;
    }

    @PostMapping("/addcustomer")
    public Customer addCustomer(@RequestBody Customer customer) throws CustomerException, UnauthorizedException {
        getAdminFacade().addCustomer(customer);
        return customer;
    }

    @DeleteMapping("/deletecompany/{id}")
    public String deleteCompany(@PathVariable int id) throws CompanyException, UnauthorizedException {
        getAdminFacade().deleteCompany(id);
        return "Company deleted";
    }

    @DeleteMapping("/deletecustomer/{id}")
    public String deleteCustomer(@PathVariable int id) throws CustomerException, UnauthorizedException {
        getAdminFacade().deleteCustomer(id);
        return "Customer deleted!";
    }

    @GetMapping("/getcompanies")
    public List<Company> getAllCompanies() throws UnauthorizedException {
        return getAdminFacade().getAllCompanies();
    }

    @GetMapping("/getcustomers")
    public List<Customer> getAllCustomers() throws UnauthorizedException {
        return getAdminFacade().getAllCustomers();
    }

    @GetMapping("/getcompanycoupons")
    public List<Coupon> getCompanyCoupons(@RequestParam int id) throws UnauthorizedException {
        return getAdminFacade().getCompanyCoupons(id);
    }

    @GetMapping("/getcompany/{id}")
    public Company getCompanyById(@PathVariable int id) throws CompanyException, UnauthorizedException {
        return getAdminFacade().getCompanyById(id);
    }

    @GetMapping("/getcustomer/{id}")
    public Customer getCustomerById(@PathVariable int id) throws CustomerException, UnauthorizedException {
        return getAdminFacade().getCustomerById(id);
    }

    @PutMapping("/updatecompany")
    public Company updateCompany(@RequestBody Company company) throws CompanyException, UnauthorizedException {
        getAdminFacade().updateCompany(company);
        return company;
    }

    @PutMapping("/updatecustomer")
    public Customer updateCustomer(@RequestBody Customer customer) throws CustomerException, UnauthorizedException {
        getAdminFacade().updateCustomer(customer);
        return customer;
    }

    private AdminService getAdminFacade() throws UnauthorizedException {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        ClientService clientService = tokensStore.get(token);

        if (clientService == null) {
            throw new UnauthorizedException("Trying to fool me? Login!");
        }

        if (!(clientService instanceof AdminService)) {
            throw new UnauthorizedException("Invalid access. This user is not associated with an Admin account.");
        }

        return (AdminService) clientService;
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<String> handleAdminUnauthorized(UnauthorizedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }
}
