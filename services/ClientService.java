package com.example.JohnCouponPart2.services;
import com.example.JohnCouponPart2.Repositories.CompanyRepository;
import com.example.JohnCouponPart2.Repositories.CouponRepository;
import com.example.JohnCouponPart2.Repositories.CustomerRepository;

public abstract class ClientService {
    protected CompanyRepository companyRepository;
    protected CouponRepository couponRepository;
    protected CustomerRepository customerRepository;

    public ClientService(CompanyRepository companyRepository, CouponRepository couponRepository, CustomerRepository customerRepository) {
        this.companyRepository = companyRepository;
        this.couponRepository = couponRepository;
        this.customerRepository = customerRepository;
    }

    public abstract boolean login (String email, String password);
}
