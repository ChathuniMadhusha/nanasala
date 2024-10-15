package lk.nanasala.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="employee_has_class_subject")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Employee_has_Classsubject {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "employee_id",referencedColumnName = "id")
    private Employee employee_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "class_subject_id",referencedColumnName = "id")
    private Class_Subject class_subject_id;

}
