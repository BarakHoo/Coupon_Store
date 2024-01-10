package com.example.JohnCouponPart2.beans;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "coupons")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode(exclude = "customers") // Exclude the set field from equals and hashCode
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private int id;
    @ManyToOne
    @Setter(AccessLevel.NONE)
    @JsonIgnore
    private Company company;
    @Enumerated(EnumType.STRING)
    private Category category;
    private String title;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private int amount;
    private double price;
    private String image;
    @ManyToMany(fetch = FetchType.EAGER)
    @JsonIgnore
    private Set<Customer> customers;

    public Coupon(Company company, Category category, String title, String description, LocalDate startDate, LocalDate endDate, int amount, double price, String image, Set<Customer> customers) {
        this.company = company;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
        this.customers = customers;
    }

    public Coupon(Company company, Category category, String title, String description, LocalDate startDate, LocalDate endDate, int amount, double price, String image) {
        this.company = company;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }

    public Coupon(int id, Company company, Category category, String title, String description, LocalDate startDate, LocalDate endDate, int amount, double price, String image) {
        this.id = id;
        this.company = company;
        this.category = category;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
    }

    @Override
    public String toString() {
        return "Coupon{" +
                "company=" + company.getName() +
                ", category=" + category +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", amount=" + amount +
                ", price=" + price +
                ", image='" + image + '\'' +
                '}';
    }
}
