package lk.nanasala.entity;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name="privilage")
@Data
@NoArgsConstructor
@AllArgsConstructor
//front end ekata data gaddi null value tyana columns ain krnna meka use kala
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Privilage {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "sel")
    private Boolean sel;

    @Column(name = "ins")
    private Boolean ins;

    @Column(name = "upd")
    private Boolean upd;

    @Column(name = "del")
    private Boolean del;

    @Column(name = "added_date")
    private LocalDateTime added_date;

    @Column(name = "last_update_date")
    private LocalDateTime last_update_date;

    @Column(name = "delete_date")
    private LocalDateTime delete_date;

    @ManyToOne//(optional = true) privilage and role has many to one relationship
    @JoinColumn(name = "role_id",referencedColumnName = "id")
    private Role role_id;

    @ManyToOne//(optional = true) privilage and module has many to one relationship
    @JoinColumn(name = "module_id",referencedColumnName = "id")
    private Module module_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "added_user_id",referencedColumnName = "id")
    private User added_user_id;

    @ManyToOne//(optional = true)
    @JoinColumn(name = "last_update_user_id",referencedColumnName = "id")
    private User last_update_user_id;


    public Privilage(Integer id, Role role_id, Module module_id, Boolean sel,  Boolean ins, Boolean upd, Boolean del  ){
        this.id = id;
        this.role_id = role_id;
        this.module_id = module_id;
        this.sel = sel;
        this.ins = ins;
        this.upd = upd;
        this.del = del;

    }


}
