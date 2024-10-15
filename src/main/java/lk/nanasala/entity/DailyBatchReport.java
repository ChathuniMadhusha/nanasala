package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor //contrustor hada ganna
@AllArgsConstructor
@Data
public class DailyBatchReport {
   private String studentno;
   private String calling_name;
   private String batch_name;


}
