package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity //convert class into persistance entity
@Table(name="course_payment") //maping table name
@NoArgsConstructor //default contructor
@AllArgsConstructor //all argument constructor
@Data
public class Course_Payment {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="bill_no")
    private String bill_no;

    @Column(name="previous_balance")
    private BigDecimal previous_balance;

    @Column(name="amount")
    private BigDecimal amount;

    @Column(name="after_balance")
    private BigDecimal after_balance;

    @Column(name="pay_added_date")
    private LocalDateTime pay_added_date;

    @Column(name="installment_no")
    private Integer installment_no;

    @Column(name="last_update_date")
    private LocalDateTime last_update_date;

    @Column(name="delete_date")
    private LocalDateTime delete_date;

    @Column(name="description")
    private String description;

    @Column(name="hand_over_amount_for_ins")
    private BigDecimal hand_over_amount_for_ins;

    @Column(name="hand_over_amount_for_stu")
    private BigDecimal hand_over_amount_for_stu;

    @ManyToOne
    @JoinColumn(name = "added_user_id",referencedColumnName = "id")
    private User added_user_id;

    @ManyToOne
    @JoinColumn(name = "last_update_user_id",referencedColumnName = "id")
    private User last_update_user_id;

    @ManyToOne
    @JoinColumn(name = "delete_user_id",referencedColumnName = "id")
    private User delete_user_id;

    @ManyToOne
    @JoinColumn(name = "payment_status_id",referencedColumnName = "id")
    private Payment_Status payment_status_id;

    @ManyToOne
    @JoinColumn(name = "pay_type_id",referencedColumnName = "id")
    private Payment_Type pay_type_id;

    @ManyToOne
    @JoinColumn(name = "registration_id",referencedColumnName = "id")
    private Student_Batch_Reg registration_id;


    public Course_Payment(Integer id){
        this.id = id;
    }


}
