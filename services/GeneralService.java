package com.example.JohnCouponPart2.services;

import com.example.JohnCouponPart2.Repositories.CouponRepository;
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

    public Coupon getOneCoupon(int id) throws CouponException {
        return couponRepository.findById(id).orElseThrow(() -> new CouponException("Coupon doesn't exist!"));

    }
}
