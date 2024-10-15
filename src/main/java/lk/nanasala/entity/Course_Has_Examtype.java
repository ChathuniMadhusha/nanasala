package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="course_has_exam_type")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Course_Has_Examtype implements Serializable {
//serilizable kle composite key ekak hdena nisa


    @Id
    @ManyToOne//(optional = true)
    @JoinColumn(name = "course_id",referencedColumnName = "id")
    private Course course_id;

    @Id
    @ManyToOne//(optional = true)
    @JoinColumn(name = "exam_type_id",referencedColumnName = "id")
    private Exam_Type exam_type_id;






}
