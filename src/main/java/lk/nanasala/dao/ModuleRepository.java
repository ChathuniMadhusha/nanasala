package lk.nanasala.dao;

import lk.nanasala.entity.Course_Module;
import lk.nanasala.entity.Module;
import lk.nanasala.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<Module,Integer> {



        @Query("Select m from Module m where m.id not in (select p.module_id.id from Privilage p where p.role_id.id=?1)")
        List<Module> getModuleListByRole(Integer id);



        @Query(value = "SELECT m.name FROM nanasala.module as m where m.id not in" +
                "(select p.module_id from nanasala.privilage as p where p.sel=1 and p.role_id in" +
                "(select uhr.role_id from nanasala.user_has_role as uhr where uhr.user_id in" +
                "(select u.id from nanasala.user as u where u.username=?1)));", nativeQuery = true)
        List getByUser(String username);
}
