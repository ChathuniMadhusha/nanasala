package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor //contrustor hada ganna
@AllArgsConstructor
@Data
public class StuPayReport {
   private String stuName;
   private String stuPayment;
}
