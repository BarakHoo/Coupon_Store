package com.example.JohnCouponPart2.services;

import com.example.JohnCouponPart2.Repositories.CouponRepository;
import com.example.JohnCouponPart2.beans.Category;
import com.example.JohnCouponPart2.beans.Coupon;
import com.example.JohnCouponPart2.exceptions.CompanyException;
import com.example.JohnCouponPart2.exceptions.CouponException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GeneralService {

    private CouponRepository couponRepository;

    public GeneralService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    public List<Coupon> getAllCoupons(){
        return couponRepository.findAll();
    }

    public List<Coupon> getAllCouponsByCategory(Category category){
        return couponRepository.findCouponsByCategory(category);
    }

    public List<Coupon> getAllCouponsByPrice(double price){
        return couponRepository.findCouponsByPriceLessThanEqual(price);
    }

    public List<Coupon> getAllCouponsByCategoryAndPrice(Category category, double price){
        return couponRepository.findCouponsByPriceLessThanEqualAndCategory(price, category);
    }

    public Coupon getOneCoupon(int id) throws CouponException {
        return couponRepository.findById(id).orElseThrow(() -> new CouponException("Coupon doesn't exist!"));

    }
}
