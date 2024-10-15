package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name="batch")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Batch_Implementation {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name="batch_name")
    private String batch_name;

    @Column(name="start_date")
    private LocalDate start_date;

    @Column(name="end_date")
    private LocalDate end_date;

    @Column(name="reg_deadline")
    private LocalDate reg_deadline;

    @Column(name="course_fee")
    private Float course_fee;

    @Column(name="no_installment")
    private Integer no_installment;

    @Column(name="monthly_instal")
    private Float monthly_instal;

    @Column(name="therory_allocate_time")
    private String therory_allocate_time;

    @Column(name="practical_allocate_time")
    private String practical_allocate_time;

    @Column(name="reg_date")
    private LocalDate reg_date;

    @Column(name="last_update_date")
    private LocalDate last_update_date;

    @Column(name="description")
    private String description;



    @ManyToOne(optional = false)
    @JoinColumn(name = "acadamic_year_id",referencedColumnName = "id")
    private Acadamic_Year acadamic_year_id;

    @ManyToOne
    @JoinColumn(name = "course_id",referencedColumnName = "id")
    private Course course_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "course_catogary_id",referencedColumnName = "id")
    private Course_Cat course_catogary_id;


    @ManyToOne
    @JoinColumn(name = "theory_lec_id",referencedColumnName = "id")
    private Employee theory_lec_id;

    @ManyToOne
    @JoinColumn(name = "practical_lec_id",referencedColumnName = "id")
    private Employee practical_lec_id;


    @ManyToOne
    @JoinColumn(name = "intake_id",referencedColumnName = "id")
    private Intake intake_id;

    @ManyToOne
    @JoinColumn(name = "practical_day_id",referencedColumnName = "id")
    private Week_Day practical_day_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "theory_day_id",referencedColumnName = "id")
    private Week_Day theory_day_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user_id;

    @ManyToOne
    @JoinColumn(name = "last_update_user_id",referencedColumnName = "id")
    private User last_update_user_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "batch_status_id",referencedColumnName = "id")
    private Batch_Status batch_status_id;


    public Batch_Implementation(Long id){
        this.id = Integer.valueOf(id.toString());
    }




}
