package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity //convert class into persistance entity
@Table(name="class_payment") //maping table name
@NoArgsConstructor //default contructor
@AllArgsConstructor //all argument constructor
@Data
public class Class_Payment {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="bill_no")
    private String bill_no;

    @Column(name="paid_amount")
    private BigDecimal paid_amount;

    @Column(name="balance_amount")
    private BigDecimal balance_amount;

    @Column(name="previous_balance")
    private BigDecimal previous_balance;

    @Column(name="handover_payment_for_ins")
    private BigDecimal handover_payment_for_ins;

    @Column(name="hansover_payment_for_stu")
    private BigDecimal hansover_payment_for_stu;

    @Column(name="description")
    private String description;

    @Column(name="added_date")
    private LocalDateTime added_date;

    @Column(name="month")
    private String month;

    @ManyToOne
    @JoinColumn(name = "added_user_id",referencedColumnName = "id")
    private User added_user_id;

    @ManyToOne
    @JoinColumn(name = "pay_method_id",referencedColumnName = "id")
    private Class_Pay_Method pay_method_id;

    @ManyToOne
    @JoinColumn(name = "class_registration_id",referencedColumnName = "id")
    private Stu_Class_Reg class_registration_id;

}
