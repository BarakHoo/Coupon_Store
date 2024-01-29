package com.example.JohnCouponPart2.services;
import com.example.JohnCouponPart2.Repositories.CompanyRepository;
import com.example.JohnCouponPart2.Repositories.CouponRepository;
import com.example.JohnCouponPart2.Repositories.CustomerRepository;
import com.example.JohnCouponPart2.beans.Company;
import com.example.JohnCouponPart2.beans.Coupon;
import com.example.JohnCouponPart2.beans.Customer;
import com.example.JohnCouponPart2.exceptions.CompanyException;
import com.example.JohnCouponPart2.exceptions.CustomerException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Objects;

@Service
public class AdminService extends ClientService {

    // Constructor with dependency injection
    public AdminService(CompanyRepository companyRepository, CouponRepository couponRepository, CustomerRepository customerRepository) {
        super(companyRepository, couponRepository, customerRepository);
    }

    // Login method specific to admin
    @Override
    public boolean login(String email, String password) {
        // Check if the provided credentials match the admin's credentials
        return Objects.equals(email, "admin@admin.com") && Objects.equals(password, "admin");
    }

    // Method for adding a new company
    public Company addCompany(Company company) throws CompanyException {
        // Check if a company with the same name and email already exists
        if (!companyRepository.existsByNameOrEmail(company.getName(), company.getEmail())) {
            // Save the new company
            companyRepository.save(company);
            return company;
        } else {
            throw new CompanyException("Company already exists!");
        }
    }

    // Method for updating an existing company
    public Company updateCompany(Company company) throws CompanyException {
//         Check if the company exists
        if (!companyRepository.existsById(company.getId())) {
            throw new CompanyException("Company doesn't exist!");
        }

        if (isEmailChanged(company)) {
            Company existingCompanyByEmail = companyRepository.findCompanyByEmail(company.getEmail());
            if (existingCompanyByEmail != null && existingCompanyByEmail.getId() != company.getId()) {
                // Another company already has the same email
                throw new CompanyException("Company with the same email exists!");
            }
        }

        // Save the updated company
        companyRepository.save(company);
        return company;
    }



    // Method for deleting a company
    public void deleteCompany(int id) throws CompanyException {
        // Check if the company exists
        if (companyRepository.existsById(id)) {
            // Delete the company
            companyRepository.deleteById(id);
        } else {
            throw new CompanyException("Company doesn't exist.");
        }
    }

    // Method for getting a list of all companies
    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    // Method for getting details of a company by ID
    public Company getCompanyById(int id) throws CompanyException {
        return companyRepository.findById(id).orElseThrow(() -> new CompanyException("Company doesn't exist!"));
    }

    // Method for adding a new customer
    public Customer addCustomer(Customer customer) throws CustomerException {
        // Check if a customer with the same email already exists
        if (!customerRepository.existsByEmail(customer.getEmail())) {
            // Save the new customer
            customerRepository.save(customer);
            return customer;
        } else {
            throw new CustomerException("Email is already in use.");
        }
    }

    // Method for updating an existing customer
    public Customer updateCustomer(Customer customer) throws CustomerException {
        // Check if the customer exists
        if (customerRepository.existsById(customer.getId())) {
            if (isEmailChanged(customer)) {
                // Check if the new email is not already in use
                if (!customerRepository.existsByEmail(customer.getEmail())) {
                    // Save the updated customer
                    customerRepository.save(customer);
                    return customer;
                } else {
                    throw new CustomerException("Email already exists!");
                }
            } else {
                // Save the updated customer (email is unchanged)
                customerRepository.save(customer);
                return customer;
            }
        } else {
            throw new CustomerException("Customer doesn't exist!");
        }
    }


    public List<Coupon> getCompanyCoupons(int id){
        if (couponRepository.findCouponsByCompanyId(id)!=null){
            return couponRepository.findCouponsByCompanyId(id);
        }
        else{
            return null;
        }

    }


    // Method for deleting a customer
    public void deleteCustomer(int id) throws CustomerException {
        // Check if the customer exists
        if (customerRepository.existsById(id)) {
            Customer customer = customerRepository.findById(id).orElseThrow();

            // Remove the association between customer and coupons
            for (Coupon coupon : customer.getCoupons()) {
                coupon.getCustomers().remove(customer);
                couponRepository.save(coupon);
            }

            // Now, we can delete the customer
            customerRepository.deleteById(id);
        } else {
            throw new CustomerException("Customer doesn't exist!");
        }
    }

    // Method for getting a list of all customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Method for getting details of a customer by ID
    public Customer getCustomerById(int id) throws CustomerException {
        return customerRepository.findById(id).orElseThrow(() -> new CustomerException("Customer doesn't exist!"));
    }


    private boolean isEmailChanged(Customer newCustomer) {
        // Check if the email is being changed
        Customer existingCustomer = customerRepository.findById(newCustomer.getId()).orElse(null);
        return existingCustomer != null && !Objects.equals(existingCustomer.getEmail(), newCustomer.getEmail());
    }


    private boolean isEmailChanged(Company newCompany) {
        // Check if the email is being changed
        Company existingCompany = companyRepository.findById(newCompany.getId()).orElse(null);
        return existingCompany != null && !Objects.equals(existingCompany.getEmail(), newCompany.getEmail());
    }


}


