package lk.nanasala.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name="user")
@Data
@NoArgsConstructor
@AllArgsConstructor

//front end ekata data gaddi null value tyana columns ain krnna meka use kala
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "photo_name")
    private String photo_name;

    @Column(name = "user_photo_path")
    private String user_photo_path;

    @Column(name = "added_date")
    private LocalDateTime added_date;

    @Column(name = "last_update_date")
    private LocalDateTime last_update_date;

    @Column(name = "delete_date")
    private LocalDate delete_date;

    @Column(name = "description")
    private String description;

    @Column(name = "otpcode")
    private String otpcode;

    @ManyToOne
    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    private Employee employee_id;

    @ManyToMany //user and roles athara many to many relationship ekak tyenne
    //eken join table eka enwa, eka nisa jointable annotation ekak damma
    @JoinTable(name = "user_has_role",joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;
}
