package lk.nanasala.entity;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name="employee")
@Data
@NoArgsConstructor
@AllArgsConstructor
//front end ekata data gaddi null value tyana columns ain krnna meka use kala
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Employee {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "empno")
    private String empno;

    @Column(name="empfullname")
    private String empfullname;

    @Column(name="empcallingname")
    private String empcallingname;

    @Column(name="empnic")
    private String empnic;

    @Column(name="gender")
    private String gender;

    @Column(name="dob")
    private LocalDate dob;

    @Column(name="mobileno")
    private String mobileno;

    @Column(name="landno")
    private String landno;

    @Column(name="email")
    private String email;

    @Column(name="address_line1")
    private String address_line1;

    @Column(name="address_line2")
    private String address_line2;

    @Column(name="address_line3")
    private String address_line3;

    @Column(name="empphoto")
    private byte[] empphoto;

    @Column(name="description")
    private String description;

    @Column(name="assigndate")
    private LocalDate assigndate;

    @Column(name="last_update_date")
    private LocalDate last_update_date;

    @Column(name="delete_date")
    private LocalDate delete_date;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "emp_status_id",referencedColumnName = "id")
    private Emp_status emp_status_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "designation_id",referencedColumnName = "id")
    private Designation designation_id;

    @ManyToOne(optional = false)
    @JoinColumn(name="civil_status_id", referencedColumnName = "id")
    private Civil_status civil_status_id;

    @ManyToMany
    @JoinTable(name = "employee_has_course_catogary",joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "course_catogary_id"))
    private Set<Course_Cat> course_cats;

    public Employee(Integer id, String empno, String empcallingname){
        this.id = id;
        this.empno = empno;
        this.empcallingname = empcallingname;
    } 


    public Employee(Integer id, String empno, String empcallingname, String mobileno, Designation designation_id,  Emp_status emp_status_id  ){
        this.id = id;
        this.empno = empno;
        this.empcallingname = empcallingname;
        this.mobileno = mobileno;
        this.designation_id = designation_id;
        this.emp_status_id = emp_status_id;
    }

    public Employee(Long id){
        this.id = Integer.valueOf(id.toString());
    }

}
