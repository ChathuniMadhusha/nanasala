package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="week_day")
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Week_Day {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="name")
    private String name;

    @Column(name="week_day_no")
    private Integer week_day_no;

    @Column(name="day_no")
    private Integer day_no;
}
