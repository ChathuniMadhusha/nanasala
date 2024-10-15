package lk.nanasala.entity;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="lec_hall")
@Data
@NoArgsConstructor
@AllArgsConstructor
//front end ekata data gaddi null value tyana columns ain krnna meka use kala
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LectureHall {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="code")
    private String code;

    @Column(name="location")
    private String location;

    @Column(name="no_of_seat")
    private int no_of_seat;

    @Column(name="max_capacity")
    private int max_capacity;

    @Column(name="added_date")
    private LocalDateTime added_date;

    @Column(name="last_update_date")
    private LocalDateTime last_update_date;

    @Column(name="description")
    private String description;

    @Column(name="delete_date")
    private LocalDateTime delete_date;


    @ManyToOne//(optional = true)
    @JoinColumn(name = "user_id",referencedColumnName = "id")
    private User user_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "last_update_user_id",referencedColumnName = "id")
    private User last_update_user_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "lec_hall_status_id",referencedColumnName = "id")
    private Hall_Status lec_hall_status_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "lec_hall_type_id",referencedColumnName = "id")
    private Hall_Type lec_hall_type_id;

    //assosiation table ekta data push krna oni nisa cascade type eka alla yna oni, nathnm push krna ba
    //assosiation eke data remove krla updte krna oni nisa orphanremove true krnwa
    @OneToMany(mappedBy = "lec_hall_id",cascade = CascadeType.ALL,orphanRemoval = true)
    private List<LecHall_Has_Feature> lecHall_has_featureList;//lec has features read krnwa

}
