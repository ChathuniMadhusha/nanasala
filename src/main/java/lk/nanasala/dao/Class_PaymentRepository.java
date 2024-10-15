package lk.nanasala.dao;

import lk.nanasala.entity.Acadamic_Year;
import lk.nanasala.entity.Class_Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface Class_PaymentRepository extends JpaRepository<Class_Payment,Integer> {


    @Query(value = "SELECT lpad(max(clp.bill_no)+1, 5, '2') FROM nanasala.class_payment as clp;", nativeQuery = true)
    String getNextNumber();

//    Class_Payment findClass_PaymentById(int id);
}
