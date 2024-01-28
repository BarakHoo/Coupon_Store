package com.example.JohnCouponPart2.Repositories;
import com.example.JohnCouponPart2.beans.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {
    boolean existsByEmailAndPassword(String email, String password);
    boolean existsByNameOrEmail(String name, String email);
    boolean existsByEmail(String email);
    Company findCompanyByEmail(String email);
    Company findCompanyByEmailAndPassword(String email, String password);
}


