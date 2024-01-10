package com.example.JohnCouponPart2.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class LoginManager {
    private final ApplicationContext context;

    @Autowired
    public LoginManager(ApplicationContext context) {
        this.context = context;
    }

    /**
     * Performs login for different client types (ADMIN, COMPANY, CUSTOMER).
     *
     * @param email    The email of the client attempting to log in.
     * @param password The password of the client attempting to log in.
     * @param type     The type of the client (ADMIN, COMPANY, CUSTOMER).
     * @return The appropriate ClientService if login is successful, otherwise null.
     */
    public ClientService login(String email, String password, ClientType type) {
        switch (type) {
            case ADMIN -> {
                // Attempt to get AdminService bean from the application context
                AdminService adminService = context.getBean(AdminService.class);
                // If login is successful, return the AdminService
                if (adminService.login(email, password)) {
                    return adminService;
                }
            }
            case COMPANY -> {
                // Attempt to get CompanyService bean from the application context
                CompanyService companyService = context.getBean(CompanyService.class);
                // If login is successful, return the CompanyService
                if (companyService.login(email, password)) {
                    return companyService;
                }
            }
            case CUSTOMER -> {
                // Attempt to get CustomerService bean from the application context
                CustomerService customerService = context.getBean(CustomerService.class);
                // If login is successful, return the CustomerService
                if (customerService.login(email, password)) {
                    return customerService;
                }
            }
        }
        // If login is unsuccessful, return null
        return null;
    }
}
