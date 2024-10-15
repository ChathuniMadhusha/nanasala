package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@NoArgsConstructor //contrustor hada ganna
@AllArgsConstructor
@Data
public class BatchReport {
   private String batchName;
   private String batchStatus;
   private Integer regCount;
   private Integer deleteCount;
   private Integer leaveCount;
}
