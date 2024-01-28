package com.example.JohnCouponPart2.services;
import com.example.JohnCouponPart2.Repositories.CouponRepository;
import com.example.JohnCouponPart2.beans.Coupon;
import com.example.JohnCouponPart2.exceptions.CouponException;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;

@Service
public class CouponDailyExpirationJob implements Runnable {

    public boolean quit;
    public CompanyService companyService;
    public CouponRepository couponRepository;


    public CouponDailyExpirationJob(CompanyService companyService, CouponRepository couponRepository) {
        this.companyService = companyService;
        this.couponRepository = couponRepository;
    }

    @Override
    public void run() {

        quit = false; // Initialize quit as false

        try {
            while (!quit) {
                LocalDate currentDate = LocalDate.now();
                // Iterate through all coupons to check for expiration
                ArrayList<Coupon> expiredCoupons = couponRepository.findCouponsByEndDateBefore(currentDate);
                for (Coupon coupon : expiredCoupons){
                    System.out.println("Coupon" + coupon.getId() + "is expired, proceeding to delete...");
                    companyService.deleteCoupon(coupon.getId());
                }
                    // Sleep for 24 hours (86400000 milliseconds) before the next check
                    Thread.sleep(86400000);
            }


        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (CouponException ignored) {}
    }

    public void stop(){
        quit = true;
    }
}