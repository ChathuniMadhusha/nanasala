package lk.nanasala.entity;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "course")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Course {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name="course_name")
    private String course_name;

    @Column(name="course_code")
    private String course_code;


    @Column(name="course_fee")
    private String course_fee;


    @Column(name="description")
    private String description;

    @Column(name="added_date")
    private LocalDate added_date;

    @Column(name="delete_date")
    private LocalDateTime delete_date;

    @Column(name="last_update_date")
    private String last_update_date;



//required = optional false
    @ManyToOne(optional = false)
    @JoinColumn(name = "course_catogary_id",referencedColumnName = "id")
    private Course_Cat course_catogary_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "course_level_id",referencedColumnName = "id")
    private Course_Level course_level_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "course_type_id",referencedColumnName = "id")
    private Course_Type course_type_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "cordinator_employee_id",referencedColumnName = "id")
    private Employee cordinator_employee_id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "course_status_id",referencedColumnName = "id")
    private Course_Status course_status_id;

    @ManyToOne
    @JoinColumn(name = "added_user_id",referencedColumnName = "id")
    private User added_user_id;

    @ManyToOne
    @JoinColumn(name = "last_update_user_id",referencedColumnName = "id")
    private User last_update_user_id;

    @ManyToOne
    @JoinColumn(name = "course_duration_id",referencedColumnName = "id")
    private Duration course_duration_id;


    @ManyToMany //user and roles athara many to many relationship ekak tyenne
    //eken join table eka enwa, eka nisa jointable annotation ekak damma
    @JoinTable(name = "course_has_course_module",joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "course_module_id"))
    private Set<Course_Module> courseModules;


    @ManyToMany //user and roles athara many to many relationship ekak tyenne
    //eken join table eka enwa, eka nisa jointable annotation ekak damma
    @JoinTable(name = "course_has_exam_type",joinColumns = @JoinColumn(name = "course_id"),
            inverseJoinColumns = @JoinColumn(name = "exam_type_id"))
    private Set<Exam_Type> examtypes;


    public Course(Integer id, String course_name, Course_Cat course_catogary_id, String course_code, Employee cordinator_employee_id, Duration course_duration_id,Course_Status course_status_id  ){
        this.id = id;
        this.course_name = course_name;
        this.course_catogary_id = course_catogary_id;
        this.course_code = course_code;
        this.cordinator_employee_id = cordinator_employee_id;
        this.course_duration_id = course_duration_id;
        this.course_status_id = course_status_id;
    }



}
