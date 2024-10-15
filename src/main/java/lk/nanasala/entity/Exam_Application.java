package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="exam_application")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Exam_Application {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="examapplication_added_date")
    private LocalDateTime examapplication_added_date;

    @Column(name="examapplication_delete_date")
    private LocalDateTime examapplication_delete_date;

    @Column(name="examapplication_update_date")
    private LocalDateTime examapplication_update_date;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "added_user",referencedColumnName = "id")
    private User added_user;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "update_user",referencedColumnName = "id")
    private User update_user;


    @ManyToOne//(optional = true)
    @JoinColumn(name = "exam_id",referencedColumnName = "id")
    private Exam_Define exam_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "student_id",referencedColumnName = "id")
    private Student student_id;


    @ManyToOne//(optional = true)
    @JoinColumn(name = "batch_id",referencedColumnName = "id")
    private Batch_Implementation batch_id;


//    @ManyToMany //exam application and exam types athara many to many relationship ekak tyenne
//    //eken join table eka enwa, eka nisa jointable annotation ekak damma
//    @JoinTable(name = "exam_application_has_exam_type",joinColumns = @JoinColumn(name = "exam_application_id"),
//            inverseJoinColumns = @JoinColumn(name = "exam_type_id"))
//    private Set<Exam_Type> examtypes;









}
