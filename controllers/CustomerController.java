package com.example.JohnCouponPart2.controllers;

import com.example.JohnCouponPart2.beans.Category;
import com.example.JohnCouponPart2.beans.Coupon;
import com.example.JohnCouponPart2.beans.Customer;
import com.example.JohnCouponPart2.exceptions.CompanyException;
import com.example.JohnCouponPart2.exceptions.CouponException;
import com.example.JohnCouponPart2.exceptions.CustomerException;
import com.example.JohnCouponPart2.exceptions.UnauthorizedException;
import com.example.JohnCouponPart2.services.ClientService;
import com.example.JohnCouponPart2.services.CustomerService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/customer")
public class CustomerController {
    private HashMap<String, ClientService> tokensStore;
    private HttpServletRequest request;

    public CustomerController( HashMap<String, ClientService> tokensStore, HttpServletRequest request) {
        this.tokensStore = tokensStore;
        this.request = request;
    }

    @GetMapping("/getcustomercoupons")
    public Set<Coupon> getCustomerCoupons() throws UnauthorizedException, CustomerException {
        return getCustomerFacade().getCustomerCoupons();
    }

    @GetMapping("/getcustomercouponsbycategory")
    public List<Coupon> getCustomerCouponsByCategory(@RequestParam Category category) throws UnauthorizedException {
        return getCustomerFacade().getCustomerCouponsByCategory(category);
    }

    @GetMapping("/getcustomercouponsbyprice")
    public List<Coupon> getCustomerCouponsByMaxPrice(@RequestParam double price) throws UnauthorizedException {
        return getCustomerFacade().getCustomerCouponsByMaxPrice(price);
    }

    @GetMapping("/getcouponsbycategoryandmaxprice")
    public List<Coupon> getCompanyCouponsByCategoryAndMaxPrice(@RequestParam double price, Category category) throws UnauthorizedException, CustomerException {
        return getCustomerFacade().getCouponsByMaxPriceAndCategory(price, category);
    }

    @GetMapping("/getcustomerdetails")
    public Customer getCustomerDetails() throws UnauthorizedException, CustomerException {
        return getCustomerFacade().getCustomerDetails();
    }

    @PostMapping("/purchasecoupon")
    public Coupon purchaseCoupon(@RequestBody Coupon coupon) throws UnauthorizedException, CouponException, CustomerException {
        getCustomerFacade().purchaseCoupon(coupon);
        return coupon;
    }



    private CustomerService getCustomerFacade() throws UnauthorizedException {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        ClientService clientService = tokensStore.get(token);

        if (clientService == null) {
            throw new UnauthorizedException("Trying to fool me? Login!");
        }

        if (!(clientService instanceof CustomerService)) {
            throw new UnauthorizedException("Invalid access. This user is not associated with a Customer account.");
        }

        return (CustomerService) clientService;
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<String> handleUnauthorizedException(UnauthorizedException ex) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }
}
