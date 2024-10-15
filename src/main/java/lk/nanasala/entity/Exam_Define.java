package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="exam")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Exam_Define {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="exam_name")
    private String exam_name;

    @Column(name="exam_application_deadline")
    private LocalDate exam_application_deadline;

    @Column(name="exam_added_date")
    private LocalDateTime exam_added_date;

    @Column(name="last_update_date")
    private LocalDateTime last_update_date;

    @Column(name="description")
    private String description;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "course_id",referencedColumnName = "id")
    private Course course_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "added_user_id",referencedColumnName = "id")
    private User added_user_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "exam_status",referencedColumnName = "id")
    private Exam_Status exam_status;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "exam_number_id",referencedColumnName = "id")
    private Exam_Number exam_number_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "acadamic_year_id",referencedColumnName = "id")
    private Acadamic_Year acadamic_year_id;

    //assosiation table ekta data push krna oni nisa cascade type eka alla yna oni, nathnm push krna ba
    //assosiation eke data remove krla updte krna oni nisa orphanremove true krnwa
    @OneToMany(mappedBy = "exam_id",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Exam_has_Examtype> exam_has_examtypes;//exam has examtype read krnwa


}
