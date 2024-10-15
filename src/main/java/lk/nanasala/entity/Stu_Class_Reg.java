package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "class_registration")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stu_Class_Reg {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name="claa_reg_no")
    private String claa_reg_no;

    @Column(name="cl_reg_index")
    private Integer cl_reg_index;

    @Column(name="week_day")
    private String week_day;

    @Column(name="monthly_fee")
    private BigDecimal monthly_fee;

    @Column(name="reg_date")
    private LocalDateTime reg_date;

    @Column(name="last_update_date")
    private LocalDateTime last_update_date;

    @Column(name="description")
    private String description;

//required = optional false

    @ManyToOne(optional = false)
    @JoinColumn(name = "student_id",referencedColumnName = "id")
    private Student student_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "class_details_id",referencedColumnName = "id")
    private Class_Details class_details_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "class_reg_status_id",referencedColumnName = "id")
    private Class_Reg_Status class_reg_status_id;

    @ManyToOne
    @JoinColumn(name = "added_user_id",referencedColumnName = "id")
    private User added_user_id;

    @ManyToOne
    @JoinColumn(name = "last_update_user_id",referencedColumnName = "id")
    private User last_update_user_id;


    public Stu_Class_Reg(Integer id, Student student_id, Class_Details class_details_id, BigDecimal monthly_fee, String week_day, LocalDateTime reg_date, Class_Reg_Status class_reg_status_id  ){
        this.id = id;
        this.student_id = student_id;
        this.class_details_id = class_details_id;
        this.monthly_fee = monthly_fee;
        this.week_day = week_day;
        this.reg_date = reg_date;
        this.class_reg_status_id = class_reg_status_id;
    }



}
