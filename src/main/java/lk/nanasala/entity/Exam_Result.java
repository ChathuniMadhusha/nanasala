package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="exam_result")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Exam_Result {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="reg_count")
    private Integer reg_count;

    @Column(name="pass_count")
    private Integer pass_count;

    @Column(name="fail_count")
    private Integer fail_count;

    @Column(name="exam_result_added_date")
    private LocalDateTime exam_result_added_date;

    @Column(name="exam_result_update_date")
    private LocalDateTime exam_result_update_date;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "exam_reult_added_user",referencedColumnName = "id")
    private User exam_reult_added_user;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "exam_result_update_user",referencedColumnName = "id")
    private User exam_result_update_user;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "exam_id",referencedColumnName = "id")
    private Exam_Define exam_id;

    @OneToMany(mappedBy = "exam_result_id",cascade = CascadeType.ALL,orphanRemoval=true)
    List<Examresult_has_student> examresult_has_students;
}
