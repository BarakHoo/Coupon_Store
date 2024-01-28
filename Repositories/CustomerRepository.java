package com.example.JohnCouponPart2.Repositories;
import com.example.JohnCouponPart2.beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;




@Repository
public interface CustomerRepository extends JpaRepository<Customer,Integer> {
    boolean existsByEmail(String email);
    boolean existsByEmailAndPassword(String email, String password);

    Customer findCustomerByEmailAndPassword(String email, String password);


}
