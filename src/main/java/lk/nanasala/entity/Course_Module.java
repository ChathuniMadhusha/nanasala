package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="course_module")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Course_Module {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="name")
    private String name;

    @ManyToOne(optional = false)
    @JoinColumn(name = "course_catogary_id",referencedColumnName = "id")
    private Course_Cat course_catogary_id;
}
