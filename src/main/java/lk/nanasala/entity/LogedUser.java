package lk.nanasala.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LogedUser {

    private String username;
    private String photo_name;
    private String user_photo_path;
    private String role;
    private String name;



}
