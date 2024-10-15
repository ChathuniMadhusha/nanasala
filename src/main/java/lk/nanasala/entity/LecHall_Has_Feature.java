package lk.nanasala.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="lec_hall_has_lecturehall_features")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class LecHall_Has_Feature {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="count")
    private Integer count;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "lec_hall_id",referencedColumnName = "id")
    @JsonIgnore //lec hall eke idla list ek read krddi assosiation eke properties read wenwa. recurtion ek breack krnna
    private LectureHall lec_hall_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "lecturehall_features_id",referencedColumnName = "id")
    private LecturHall_Features lecturehall_features_id;

}
