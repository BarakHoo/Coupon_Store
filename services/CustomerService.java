package com.example.JohnCouponPart2.services;
import com.example.JohnCouponPart2.Repositories.CompanyRepository;
import com.example.JohnCouponPart2.Repositories.CouponRepository;
import com.example.JohnCouponPart2.Repositories.CustomerRepository;
import com.example.JohnCouponPart2.beans.Category;
import com.example.JohnCouponPart2.beans.Coupon;
import com.example.JohnCouponPart2.beans.Customer;
import com.example.JohnCouponPart2.exceptions.CompanyException;
import com.example.JohnCouponPart2.exceptions.CouponException;
import com.example.JohnCouponPart2.exceptions.CustomerException;
import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
@Scope("prototype")
public class CustomerService extends ClientService {

    // Unique identifier for the current customer
    private int customerID;

    // Constructor with dependency injection
    public CustomerService(CompanyRepository companyRepository, CouponRepository couponRepository, CustomerRepository customerRepository) {
        super(companyRepository, couponRepository, customerRepository);
    }

    // Login method specific to customers
    @Override
    public boolean login(String email, String password) {
        // Check if the customer with the provided credentials exists
        if (customerRepository.existsByEmailAndPassword(email, password)) {
            // Set the customerID to the ID of the logged-in customer
            this.customerID = customerRepository.findCustomerByEmailAndPassword(email, password).getId();
            return true;
        }
        return false;
    }

    // Transactional method for purchasing a coupon
    @Transactional
    public void purchaseCoupon(Coupon coupon) throws CouponException, CustomerException {
        // Check if the coupon exists
        if (coupon.getId() == 0 || !couponRepository.existsById(coupon.getId())) {
            throw new CouponException("Coupon doesn't exist!");
        }

        // Retrieve the coupon from the repository
        Coupon couponToAdd = couponRepository.findById(coupon.getId())
                .orElseThrow(() -> new CouponException("Coupon doesn't exist!"));

        // Check if the coupon is out of stock
        if (coupon.getAmount() == 0) {
            throw new CouponException("Coupon is out of stock!");
        }

        // Check if the coupon is expired
        if (coupon.getEndDate().isBefore(LocalDate.now())) {
            throw new CouponException("Coupon is expired!");
        }

        // Retrieve the current customer
        Customer currentCustomer = customerRepository.findById(this.customerID)
                .orElseThrow(() -> new CustomerException("Customer doesn't exist!"));

        // Retrieve sets of coupons for the customer and the purchased coupon
        Set<Coupon> customerCoupons = currentCustomer.getCoupons();
        Set<Customer> couponCustomers = couponToAdd.getCustomers();

        // Check if the customer already owns the coupon
        if (customerCoupons.contains(couponToAdd)) {
            throw new CouponException("Coupon cannot be purchased twice!");
        }

        // Add the customer to the coupon's customers and the coupon to the customer's coupons
        couponCustomers.add(currentCustomer);
        customerCoupons.add(couponToAdd);

        // Update the coupon's amount, and save changes
        couponToAdd.setAmount(coupon.getAmount() - 1);
        customerRepository.save(currentCustomer);
        couponRepository.save(couponToAdd);

    }

    // Get the set of coupons owned by the customer
    public Set<Coupon> getCustomerCoupons() throws CustomerException {
        // Retrieve the current customer and return their coupons
        Customer currentCustomer = customerRepository.findById(this.customerID)
                .orElseThrow(() -> new CustomerException("Customer doesn't exist!"));
        return currentCustomer.getCoupons();
    }

    // Get a list of coupons owned by the customer based on the specified category
    public List<Coupon> getCustomerCouponsByCategory(Category category) {
        // Retrieve a list of coupons with the specified category
        List<Coupon> couponList = couponRepository.findCouponsByCategory(category);
        List<Coupon> customersListByCategory = new ArrayList<>();

        // Iterate through the coupons and filter those owned by the customer
        for (Coupon coupon : couponList) {
            Set<Customer> customerSet = coupon.getCustomers();
            for (Customer customer : customerSet) {
                if (customer.getId() == this.customerID) {
                    customersListByCategory.add(coupon);
                }
            }
        }
        return customersListByCategory;
    }






    // Get a list of coupons owned by the customer with a price less than or equal to the specified price
    public List<Coupon> getCustomerCouponsByMaxPrice(double price) {
        // Retrieve a list of coupons with a price less than or equal to the specified price
        List<Coupon> couponList = couponRepository.findCouponsByPriceLessThanEqual(price);
        List<Coupon> customerCouponsByMaxPrice = new ArrayList<>();

        // Iterate through the coupons and filter those owned by the customer
        for (Coupon coupon : couponList) {
            Set<Customer> customerSet = coupon.getCustomers();
            for (Customer customer : customerSet) {
                if (customer.getId() == this.customerID) {
                    customerCouponsByMaxPrice.add(coupon);
                }
            }
        }
        return customerCouponsByMaxPrice;
    }

    public ArrayList<Coupon> getCouponsByMaxPriceAndCategory(double price, Category category) throws CustomerException {
        if(price>=0){
            List<Coupon> couponList = couponRepository.findCouponsByPriceLessThanEqualAndCategory(price, category);
            ArrayList<Coupon> customerCouponList = new ArrayList<>();
            for(Coupon coupon: couponList){
                Set<Customer> customerSet = coupon.getCustomers();
                for(Customer customer: customerSet){
                    if(this.customerID == customer.getId()){
                        customerCouponList.add(coupon);
                    }
                }
            }
            return customerCouponList;
        }else{
            throw new CustomerException("Price cannot be below 0");
        }
    }


    // Get details of the current customer
    public Customer getCustomerDetails() throws CustomerException {
        return customerRepository.findById(this.customerID)
                .orElseThrow(() -> new CustomerException("Customer doesn't exist!"));
    }


}
