package com.example.JohnCouponPart2.services;
import com.example.JohnCouponPart2.Repositories.CompanyRepository;
import com.example.JohnCouponPart2.Repositories.CouponRepository;
import com.example.JohnCouponPart2.Repositories.CustomerRepository;
import com.example.JohnCouponPart2.beans.Category;
import com.example.JohnCouponPart2.beans.Company;
import com.example.JohnCouponPart2.beans.Coupon;
import com.example.JohnCouponPart2.exceptions.CompanyException;
import com.example.JohnCouponPart2.exceptions.CouponException;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@Scope("prototype")
public class CompanyService extends ClientService {

    // Unique identifier for the current company
    private int companyID;

    // Constructor with dependency injection
    public CompanyService(CompanyRepository companyRepository, CouponRepository couponRepository, CustomerRepository customerRepository) {
        super(companyRepository, couponRepository, customerRepository);
    }

    // Login method specific to companies
    @Override
    public boolean login(String email, String password) {
        // Check if the company with the provided credentials exists
        if (companyRepository.existsByEmailAndPassword(email, password)) {
            // Set the companyID to the ID of the logged-in company
            this.companyID = companyRepository.findCompanyByEmailAndPassword(email, password).getId();
            return true;
        }
        return false;
    }

    // Method for adding a new coupon for the company
    public Coupon addCoupon(Coupon coupon) throws CouponException {
        // Check if the coupon is not out of date.
        if (!isDateOk(coupon)){
            throw new CouponException("Invalid date!");
        }
        // Check if a coupon with the same title already exists for the company
        if (!couponRepository.existsCouponByTitleAndCompanyId(coupon.getTitle(), this.companyID)) {
            // Save the new coupon
            couponRepository.save(coupon);
            return coupon;
        } else {
            throw new CouponException("Cannot add coupon, title already exists for this company!");
        }
    }

    // Method for updating an existing coupon for the company
    public Coupon updateCoupon(Coupon coupon) throws CouponException {
        // Check if the coupon exists
        if (couponRepository.existsById(coupon.getId())) {
            // Check if the title is being changed
            if (!isTitleUnchanged(coupon)) {
                List<Coupon> companyCoupons = couponRepository.findCouponsByCompanyId(coupon.getCompany().getId());
                companyCoupons.remove(coupon);

                // Make sure we're not changing the coupon's title to one that already exists within the company
                for (Coupon coupon1 : companyCoupons) {
                    if (Objects.equals(coupon1.getTitle(), coupon.getTitle())) {
                        throw new CouponException("Cannot change coupon title to an existing one within the company!");
                    }
                }
            }
            if(!isDateOk(coupon)){
                throw new CouponException("Invalid date!");
            }
            // Save the updated coupon
            couponRepository.save(coupon);
            return coupon;
        } else {
            throw new CouponException("Coupon doesn't exist!");
        }
    }


    // Method for deleting a coupon for the company
    public void deleteCoupon(Coupon coupon) throws CouponException {
        // Check if the coupon exists
        if (couponRepository.existsById(coupon.getId())) {
            // Delete the coupon
            couponRepository.delete(coupon);
        } else {
            throw new CouponException("Coupon doesn't exist!");
        }
    }

    // Method for getting a list of all coupons for the company
    public ArrayList<Coupon> getCompanyCoupons() {
        return couponRepository.findCouponsByCompanyId(this.companyID);
    }

    // Method for getting a list of coupons for the company based on a specified category
    public ArrayList<Coupon> getCompanyCouponsByCategory(Category category) {
        return couponRepository.findCouponsByCategoryAndCompanyId(category, this.companyID);
    }

    // Method for getting a list of coupons for the company with a price less than or equal to the specified price
    public ArrayList<Coupon> getCompanyCouponsByMaxPrice(double price) throws CompanyException {
        if(price > 0){
            return couponRepository.findCouponsByPriceLessThanEqualAndCompanyId(price, this.companyID);
        }else{
            throw new CompanyException("Price cannot be below 0");
        }
    }

    // Method for getting details of the current company
    public Company getCompanyDetails() throws CompanyException {
        return companyRepository.findById(this.companyID).orElseThrow(() -> new CompanyException("Company doesn't exist!"));
    }





    private boolean isTitleUnchanged(Coupon coupon) {
        // Check if the title is the same as the one in the database
        Coupon existingCoupon = couponRepository.findById(coupon.getId()).orElse(null);
        return existingCoupon != null && Objects.equals(existingCoupon.getTitle(), coupon.getTitle());
    }

    private boolean isDateOk(Coupon coupon){
        return !coupon.getEndDate().isBefore(LocalDate.now()) && !coupon.getStartDate().isAfter(coupon.getEndDate());
    }
}






