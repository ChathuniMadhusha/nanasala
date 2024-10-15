package lk.nanasala.entity;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="registration")
@NoArgsConstructor
@AllArgsConstructor
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Student_Batch_Reg {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="reg_no")
    private String reg_no;

    @Column(name="indx")
    private Integer indx;

    @Column(name="course_fee")
    private BigDecimal course_fee;

    @Column(name="previous_balance")
    private BigDecimal previous_balance;

    @Column(name="reg_date")
    private LocalDate reg_date;

    @Column(name="last_update_date")
    private LocalDate last_update_date;

    @Column(name="delete_date")
    private LocalDate delete_date;

    @Column(name="description")
    private String description;


    @ManyToOne
    @JoinColumn(name = "batch_id",referencedColumnName = "id")
    private Batch_Implementation batch_id;


    @ManyToOne(optional = false)
    @JoinColumn(name = "added_user_id",referencedColumnName = "id")
    private User added_user_id;

    @ManyToOne
    @JoinColumn(name = "last_update_user_id",referencedColumnName = "id")
    private User last_update_user_id;

    @ManyToOne
    @JoinColumn(name = "delete_user_id",referencedColumnName = "id")
    private User delete_user_id;


    @ManyToOne
    @JoinColumn(name = "reg_status_id", referencedColumnName = "id")
    private Registration_Status reg_status_id;

    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    private Student student_id;




    public Student_Batch_Reg(Integer id,Batch_Implementation batch_id, Student student_id, BigDecimal course_fee, BigDecimal previous_balance){
        this.id = id;
        this.batch_id = batch_id;
        this.student_id = student_id;
        this.course_fee = course_fee;
        this.previous_balance = previous_balance;
    }


    public Student_Batch_Reg(Long id){
        this.id = Integer.valueOf(id.toString());
    }
}



