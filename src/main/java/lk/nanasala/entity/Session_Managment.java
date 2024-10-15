package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name="session")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Session_Managment {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="name")
    private String name;

    @Column(name="session_date")
    private LocalDate session_date;

    @Column(name="start_time")
    private LocalTime start_time;

    @Column(name="end_time")
    private LocalTime end_time;

    @Column(name="session_added_date")
    private LocalDateTime session_added_date;

    @Column(name="session_deleted_date")
    private LocalDateTime session_deleted_date;

    @Column(name="session_updated_date")
    private LocalDateTime session_updated_date;

    @Column(name="description")
    private String description;



    @ManyToOne(optional = false)
    @JoinColumn(name = "session_status_id",referencedColumnName = "id")
    private Session_Status session_status_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "session_type_id",referencedColumnName = "id")
    private Session_Type session_type_id;


    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user_id;

    @ManyToOne
    @JoinColumn(name = "update_user_id",referencedColumnName = "id")
    private User update_user_id;

    @ManyToOne
    @JoinColumn(name = "lec_hall_id",referencedColumnName = "id")
    private LectureHall lec_hall_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "batch_id",referencedColumnName = "id")
    private Batch_Implementation batch_id;

}
