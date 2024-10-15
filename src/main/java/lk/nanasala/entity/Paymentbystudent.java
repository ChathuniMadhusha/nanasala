package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor //contrustor hada ganna
@AllArgsConstructor
@Data
public class Paymentbystudent {
   private String reg_no;
   private String batch_name;
   private String amount;
   private String pay_added_date;
}
