package lk.nanasala.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name="exam_has_exam_type")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Exam_has_Examtype {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="exam_date")
    private LocalDate exam_date;

    @Column(name="start_time")
    private LocalTime start_time;

    @Column(name="end_time")
    private LocalTime end_time;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "exam_id",referencedColumnName = "id")
    @JsonIgnore //lec hall eke idla list ek read krddi assosiation eke properties read wenwa. recurtion ek breack krnna
    private Exam_Define exam_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "exam_type_id",referencedColumnName = "id")
    private Exam_Type exam_type_id;

}
