package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "student")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "studentno")
    private String studentno;

    @Column(name = "name_full")
    private String name_full;

    @Column(name = "calling_name")
    private String calling_name;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "stu_nic")
    private String stu_nic;

    @Column(name = "gender")
    private String gender;

    @Column(name = "address_line1")
    private String address_line1;

    @Column(name = "address_line2")
    private String address_line2;

    @Column(name = "address_line3")
    private String address_line3;

    @Column(name = "delete_date")
    private LocalDate delete_date;

    @Column(name = "mobile_no")
    private String mobile_no;

    @Column(name = "mobile_whatsap")
    private String mobile_whatsap;

    @Column(name = "school")
    private String school;


    @Column(name = "email")
    private String email;

    @Column(name = "added_date")
    private LocalDate added_date;

    @Column(name = "lastupdate_date")
    private LocalDate lastupdate_date;


    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "district_id",referencedColumnName = "id")
    private District district_id;

    @ManyToOne
    @JoinColumn(name = "camefrom_id",referencedColumnName = "id")
    private Came_from camefrom_id;

    @ManyToOne
    @JoinColumn(name = "guardian_id",referencedColumnName = "id")
    private Guardian guardian_id;

    @ManyToOne
    @JoinColumn(name = "stu_status_id", referencedColumnName = "id")
    private Student_Status stu_status_id;

    @ManyToOne
    @JoinColumn(name = "add_user_id", referencedColumnName = "id")
    private User add_user_id;

    @ManyToOne
    @JoinColumn(name = "update_user_id", referencedColumnName = "id")
    private User update_user_id;



    public Student(Integer id,String studentno, String calling_name, String gender,  String contact_no, Student_Status stu_status_id,LocalDate added_date ){
        this.id = id;
        this.studentno = studentno;
        this.calling_name = calling_name;
        this.gender = gender;
        this.mobile_whatsap = contact_no;
        this.stu_status_id = stu_status_id;
        this.added_date = added_date;
    }

    public Student(Integer id,String studentno, String calling_name){
        this.id = id;
        this.studentno = studentno;
        this.calling_name = calling_name;

    }

    public Student(Long id){
        this.studentno = id.toString();
    }
}
