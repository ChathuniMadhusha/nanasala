package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name="attendance")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Attendance_Management {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="date")
    private LocalDate date;

    @Column(name="reg_count")
    private Integer reg_count;

    @Column(name="present_count")
    private Integer present_count;

    @Column(name="absant_count")
    private Integer absant_count;

    @Column(name="added_date")
    private LocalDateTime added_date;

    @Column(name="last_update_date")
    private LocalDateTime last_update_date;

    @Column(name="description")
    private String description;


    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user_id;


    @ManyToOne(optional = false)
    @JoinColumn(name = "batch_id",referencedColumnName = "id")
    private Batch_Implementation batch_id;

    @ManyToOne
    @JoinColumn(name = "last_update_user_id",referencedColumnName = "id")
    private User last_update_user_id;



    @OneToMany(mappedBy = "attendance_id",cascade = CascadeType.ALL,orphanRemoval=true)
    List<Attendance_Has_Student> attendance_has_students;


}
