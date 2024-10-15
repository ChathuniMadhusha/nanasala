package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="course_catogary")
@NoArgsConstructor
@AllArgsConstructor
@Data

public class Course_Cat {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="name")
    private String name;

    @Column(name="prac_include_or_not")
    private Boolean prac_include_or_not;
}
