package com.example.JohnCouponPart2.Repositories;
import com.example.JohnCouponPart2.beans.Category;
import com.example.JohnCouponPart2.beans.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.ArrayList;

@Repository
public interface CouponRepository extends JpaRepository<Coupon,Integer> {

    boolean existsCouponByTitleAndCompanyId(String title, int id);
    ArrayList<Coupon> findCouponsByCompanyId(int id);
    ArrayList<Coupon> findCouponsByCategoryAndCompanyId(Category category, int id);
    ArrayList<Coupon> findCouponsByPriceLessThanEqualAndCompanyId(double price, int id);

    ArrayList<Coupon> findCouponsByEndDateBefore(LocalDate localDate);

    ArrayList<Coupon> findCouponsByCategory(Category category);

    ArrayList<Coupon> findCouponsByPriceLessThanEqual(double price);

}
