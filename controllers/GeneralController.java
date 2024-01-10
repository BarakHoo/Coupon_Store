package com.example.JohnCouponPart2.controllers;

import com.example.JohnCouponPart2.beans.Coupon;
import com.example.JohnCouponPart2.exceptions.CouponException;
import com.example.JohnCouponPart2.services.GeneralService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
public class GeneralController {

    private GeneralService generalService;

    public GeneralController(GeneralService generalService) {
        this.generalService = generalService;
    }

    @GetMapping("/getcoupons")
    public List<Coupon> getAllCoupons(){
        return generalService.getAllCoupons();
    }
    @GetMapping("/coupondetails/{id}")
    public Coupon getOneCoupon(@PathVariable int id) throws CouponException {
        return generalService.getOneCoupon(id);
    }
}
