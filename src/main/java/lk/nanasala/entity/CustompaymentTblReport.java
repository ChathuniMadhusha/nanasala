package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor //contrustor hada ganna
@AllArgsConstructor
@Data
public class CustompaymentTblReport {
   private String bill_no;
   private String studentno;
   private String calling_name;
   private String batch_name;
   private String installment_no;
   private String amount;
   private String after_balance;
   private String empcallingname;
   private String pay_added_date;


}
