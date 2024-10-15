package lk.nanasala.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor //contrustor hada ganna
@AllArgsConstructor
@Data
public class ExamResult {

   //thsi is the report

   private String studentno;
   private String calling_name;
   private String result;
   private String pass_or_fail;



}
