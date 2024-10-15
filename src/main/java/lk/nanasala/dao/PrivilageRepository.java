package lk.nanasala.dao;

import lk.nanasala.entity.Course;
import lk.nanasala.entity.Employee;
import lk.nanasala.entity.Privilage;
import org.hibernate.sql.Select;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface PrivilageRepository extends JpaRepository<Privilage,Integer> {

    @Query(value = "select new Privilage (p.id, p.role_id, p.module_id, p.sel, p.ins, p.upd, p.del) from Privilage p order by p.id desc")
    List<Privilage> findAll();

    //create query for get privilage object by given role id and module id
    @Query(value = "select p from Privilage p where p.role_id.id =?1 and p.module_id.id =?2 " )
    Privilage getByRoleAndModule(Integer role_id, Integer module_id);

    //Query for get privilage by given user name and module name
    //bit_or ==> log unu userta many role tyne pluwn. privilage dune role wlata.
    @Query(value = "SELECT bit_or(p.sel) as sel, bit_or(p.ins) as ins,bit_or(p.upd) as upd,bit_or(p.del) as del FROM nanasala.privilage as p where p.module_id in (select m.id from nanasala.module as m where m.name= ?1) and p.role_id in (Select uhr.role_id from nanasala.user_has_role as uhr where uhr.user_id in (select u.id from nanasala.user as u where u.username= ?2));" , nativeQuery = true)
    String getPrivilageByUserModule(String modulename, String username);
}
