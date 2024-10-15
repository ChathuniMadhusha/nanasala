package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="guardian")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Guardian {

    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="guardian_name")
    private String guardian_name;

   @Column(name="addressline1")
    private String addressline1;

    @Column(name="addressline2")
    private String addressline2;

    @Column(name="addressline3")
    private String addressline3;

    @Column(name="emergency_con")
    private String emergency_con;

    @Column(name="added_date")
    private LocalDate added_date;

    @Column(name="delete_date")
    private LocalDate delete_date;

    @Column(name="last_update_date")
    private LocalDate last_update_date;

    @Column(name="description")
    private LocalDate description;

    @ManyToOne
    @JoinColumn(name = "relationship_id",referencedColumnName = "id")
    private Relationship relationship_id;

    @ManyToOne
    @JoinColumn(name = "add_user_id", referencedColumnName = "id")
    private User add_user_id;

    @ManyToOne
    @JoinColumn(name = "update_user_id", referencedColumnName = "id")
    private User update_user_id;

    @ManyToOne
    @JoinColumn(name = "guardian_status_id", referencedColumnName = "id")
    private GuardianStatus guardian_status_id;


}
