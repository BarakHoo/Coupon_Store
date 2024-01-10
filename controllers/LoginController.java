package com.example.JohnCouponPart2.controllers;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.JohnCouponPart2.beans.Company;
import com.example.JohnCouponPart2.beans.Customer;
import com.example.JohnCouponPart2.exceptions.CompanyException;
import com.example.JohnCouponPart2.exceptions.CustomerException;
import com.example.JohnCouponPart2.services.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class LoginController {


    private LoginManager loginManager;
    private HashMap<String,ClientService> tokensStore;

    public LoginController(LoginManager loginManager, HashMap<String, ClientService> tokensStore) {
        this.loginManager = loginManager;
        this.tokensStore = tokensStore;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(String email, String password, ClientType clientType) throws CompanyException, CustomerException {
        ClientService facade = loginManager.login(email, password, clientType);
        if (facade != null) {
            String token = createToken(facade);
            tokensStore.put(token, facade);
            return ResponseEntity.ok(token);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Email or password");
        }
    }

    @PostMapping("/logout")
    public String logout(HttpServletRequest request){
        tokensStore.remove(request.getHeader("Authorization").replace("Bearer ", ""));
        return "Logged out!";
    }

    @ExceptionHandler({CompanyException.class, CustomerException.class})
    public ResponseEntity<String> handleLoginException(CompanyException ex){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
    }

    private String createToken(ClientService facade) throws CompanyException, CustomerException {
        String token = "";
        if(facade instanceof CompanyService){
            Instant expires = Instant.now().plus(30, ChronoUnit.MINUTES);
            Company comp = ((CompanyService)facade).getCompanyDetails();
            token = JWT.create()
                    .withClaim("role", "COMPANY")
                    .withClaim("id", comp.getId())
                    .withClaim("name",comp.getName())
                    .withClaim("email", comp.getEmail())
                    .withIssuedAt(new Date())
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());


        }else if(facade instanceof AdminService){
            Instant expires = Instant.now().plus(30, ChronoUnit.MINUTES);
            token = JWT.create()
                    .withClaim("role", "ADMIN")
                    .withClaim("name","Admin")
                    .withIssuedAt(new Date())
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());

        }
        else if (facade instanceof CustomerService){
            Instant expires = Instant.now().plus(30, ChronoUnit.MINUTES);
            Customer customer = ((CustomerService)facade).getCustomerDetails();
            token = JWT.create()
                    .withClaim("role", "CUSTOMER")
                    .withClaim("id",customer.getId())
                    .withClaim("firstname", customer.getFirstName())
                    .withClaim("lastname", customer.getLastName())
                    .withClaim("email", customer.getEmail())
                    .withIssuedAt(new Date())
                    .withExpiresAt(expires)
                    .sign(Algorithm.none());
        }
        return token;
    }
}
