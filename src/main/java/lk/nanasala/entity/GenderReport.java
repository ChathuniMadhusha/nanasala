package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@NoArgsConstructor //contrustor hada ganna
@AllArgsConstructor
@Data
public class GenderReport {
   private String empno;
   private String empcallingname;
   private String dob;
}
