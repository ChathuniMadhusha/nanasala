package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name="course_has_course_module")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Course_Has_Module implements Serializable {
//serilizable kle composite key ekak hdena nisa


    @Id
    @ManyToOne//(optional = true)
    @JoinColumn(name = "course_id",referencedColumnName = "id")
    private Course course_id;

    @Id
    @ManyToOne//(optional = true)
    @JoinColumn(name = "course_module_id",referencedColumnName = "id")
    private Course_Module course_module_id;


}
