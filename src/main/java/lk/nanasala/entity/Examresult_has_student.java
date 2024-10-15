package lk.nanasala.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="examresult_has_student")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Examresult_has_student {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="mcq")
    private String mcq;

    @Column(name="practical")
    private String practical;

    @Column(name="presentation")
    private String presentation;

    @Column(name="theory")
    private String theory;

    @Column(name="result")
    private String result;

    @Column(name="pass_or_fail")
    private String pass_or_fail;

    @Column(name="grade")
    private String grade;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "exam_result_id",referencedColumnName = "id")
    @JsonIgnore
    private Exam_Result exam_result_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "student_id",referencedColumnName = "id")
    private Student student_id;

}
