package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor //contrustor hada ganna
@AllArgsConstructor
@Data
public class ArrearsReport {
   private String studentno;
   private String calling_name;
   private String mobile_no;
   private String batch_name;
   private String course_fee;
   private String previous_balance;


}
