package com.example.JohnCouponPart2.controllers;

import com.example.JohnCouponPart2.beans.Category;
import com.example.JohnCouponPart2.beans.Company;
import com.example.JohnCouponPart2.beans.Coupon;
import com.example.JohnCouponPart2.exceptions.CompanyException;
import com.example.JohnCouponPart2.exceptions.CouponException;
import com.example.JohnCouponPart2.exceptions.UnauthorizedException;
import com.example.JohnCouponPart2.services.ClientService;
import com.example.JohnCouponPart2.services.ClientType;
import com.example.JohnCouponPart2.services.CompanyService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/company")
public class CompanyController {
    private HashMap<String, ClientService> tokensStore;
    private HttpServletRequest request;

    public CompanyController(HashMap<String, ClientService> tokensStore, HttpServletRequest request) {
        this.tokensStore = tokensStore;
        this.request = request;
    }


    @PostMapping("/addcoupon")
    public Coupon addCoupon(@RequestBody Coupon coupon) throws CouponException, UnauthorizedException {
        getFacade().addCoupon(coupon);
        return coupon;
    }

    @DeleteMapping("/deletecoupon/{id}")
    public String deleteCoupon(@PathVariable int id) throws CouponException, UnauthorizedException {
        getFacade().deleteCoupon(id);
        return "Coupon deleted!";
    }

    @GetMapping("/getcoupons")
    public List<Coupon> getCompanyCoupons() throws UnauthorizedException {
        return getFacade().getCompanyCoupons();
    }

    @GetMapping("/getcouponsbycategory")
    public List<Coupon> getCompanyCouponsByCategory(@RequestParam Category category) throws UnauthorizedException {
        return getFacade().getCompanyCouponsByCategory(category);
    }



    @GetMapping("/getcouponsbyprice")
    public List<Coupon> getCompanyCouponsByPrice(@RequestParam double price) throws CompanyException, UnauthorizedException {
        return getFacade().getCompanyCouponsByMaxPrice(price);
    }

    @GetMapping("/companydetails")
    public Company getCompanyDetails() throws CompanyException, UnauthorizedException {
        return getFacade().getCompanyDetails();
    }

    @GetMapping("/getcouponsbycategoryandmaxprice")
    public List<Coupon> getCompanyCouponsByCategoryAndMaxPrice(@RequestParam double price, Category category) throws UnauthorizedException, CompanyException {
       return getFacade().getCouponsByMaxPriceAndCategory(price, category);
    }

    @PutMapping("/updatecoupon")
    public Coupon updateCoupon(@RequestBody Coupon coupon) throws CouponException, UnauthorizedException {
        getFacade().updateCoupon(coupon);
        return coupon;
    }

    private CompanyService getFacade() throws UnauthorizedException {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        ClientService clientService = tokensStore.get(token);

        if (clientService == null) {
            throw new UnauthorizedException("Trying to fool me? Login!");
        }

        if (!(clientService instanceof CompanyService)) {
            throw new UnauthorizedException("Invalid access. This user is not associated with a Company account.");
        }

        return (CompanyService) clientService;
    }
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<String> handleForbidden(UnauthorizedException ex){
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(ex.getMessage());
    }
}
