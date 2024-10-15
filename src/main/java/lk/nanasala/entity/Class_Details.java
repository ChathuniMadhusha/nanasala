package lk.nanasala.entity;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name="class_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
//front end ekata data gaddi null value tyana columns ain krnna meka use kala
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Class_Details {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column (name = "class_name")
    private String class_name;

    @Column(name = "start_date")
    private LocalDate start_date;

    @Column (name = "monthly_fee")
    private BigDecimal monthly_fee;

    @Column (name = "reg_fee")
    private BigDecimal reg_fee;

    @Column (name = "description")
    private String description;

    @Column (name = "added_date")
    private LocalDateTime added_date;

    @Column (name = "last_update_date")
    private LocalDateTime last_update_date;

    @Column (name = "time_duration")
    private BigDecimal time_duration;

    @Column (name = "code")
    private String code;

    @Column (name = "class_start_time")
    private LocalTime class_start_time;

    @Column (name = "class_end_time")
    private LocalTime class_end_time;


    @ManyToOne(optional = false)
    @JoinColumn (name="class_subject_id",referencedColumnName = "id")
    private Class_Subject class_subject_id;

    @ManyToOne(optional = false)
    @JoinColumn (name="class_type_id",referencedColumnName = "id")
    private Class_Type class_type_id;

    @ManyToOne(optional = false)
    @JoinColumn (name="class_acadamic_year_id",referencedColumnName = "id")
    private Class_Acadamic_Year class_acadamic_year_id;

    @ManyToOne(optional = false)
    @JoinColumn (name="week_day_id",referencedColumnName = "id")
    private Week_Day week_day_id;

    @ManyToOne(optional = false)
    @JoinColumn (name="class_catogary_id",referencedColumnName = "id")
    private Class_Catogary class_catogary_id;

    @ManyToOne(optional = false)
    @JoinColumn (name="teacher_employee_id",referencedColumnName = "id")
    private Employee teacher_employee_id;

    @ManyToOne(optional = false)
    @JoinColumn (name="class_status_id",referencedColumnName = "id")
    private Class_Status class_status_id;

    @ManyToOne(optional = false)
    @JoinColumn (name="user_id",referencedColumnName = "id")
    private User user_id;

    @ManyToOne
    @JoinColumn (name="last_update_user_id")
    private User last_update_user_id;


}
