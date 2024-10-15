package lk.nanasala.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="employee_has_course_catogary")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Employee_has_Catogary {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    private Employee employee_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "course_catogary_id",referencedColumnName = "id")
    private Course_Cat course_catogary_id;

}
