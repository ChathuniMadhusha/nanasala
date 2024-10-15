package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class ChangeUser {

    private Integer id;
    private String username;
    private String currentpassword;
    private String changepassword;
    private String email;

}
