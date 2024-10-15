package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor //contrustor hada ganna
@AllArgsConstructor
@Data
public class BatchCountReport {
   private String batch_name;
   private String s_count;


}
