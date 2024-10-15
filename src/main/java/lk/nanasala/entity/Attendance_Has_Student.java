package lk.nanasala.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.action.internal.OrphanRemovalAction;
import org.w3c.dom.stylesheets.LinkStyle;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name="attendance_has_student")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Attendance_Has_Student {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="present_or_absent")
    private Boolean present_or_absent;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "attendance_id",referencedColumnName = "id")
    @JsonIgnore
    private Attendance_Management attendance_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "student_id",referencedColumnName = "id")
    private Student student_id;




}
