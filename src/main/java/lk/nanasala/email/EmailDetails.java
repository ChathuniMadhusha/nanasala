package lk.nanasala.email;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor


//mail data send krna entity eka
public class EmailDetails {

    private String sendto;
    private String msgBody;
    private String subject;
    private String attachment;

}
