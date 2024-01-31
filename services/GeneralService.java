package com.example.JohnCouponPart2.services;
import com.example.JohnCouponPart2.Repositories.CouponRepository;
import com.example.JohnCouponPart2.Repositories.CustomerRepository;
import com.example.JohnCouponPart2.beans.Category;
import com.example.JohnCouponPart2.beans.Coupon;
import com.example.JohnCouponPart2.beans.Customer;
import com.example.JohnCouponPart2.exceptions.CouponException;
import com.example.JohnCouponPart2.exceptions.CustomerException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GeneralService {

    private CustomerRepository customerRepository;
    private CouponRepository couponRepository;

    public GeneralService(CustomerRepository customerRepository, CouponRepository couponRepository) {
        this.customerRepository = customerRepository;
        this.couponRepository = couponRepository;
    }

    public Customer customerRegister (Customer customer) throws CustomerException {
        // Check if a customer with the same email already exists
        if (!customerRepository.existsByEmail(customer.getEmail())) {
            // Save the new customer
            customerRepository.save(customer);
            return customer;
        } else {
            throw new CustomerException("Email is already in use.");
        }
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
