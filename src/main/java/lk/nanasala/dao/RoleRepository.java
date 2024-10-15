package lk.nanasala.dao;

import lk.nanasala.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleRepository extends JpaRepository<Role,Integer> {


    @Query(value = "select r from Role r where r.name<>'Admin'")
    List<Role> List();

    @Query(value = "select r from Role r where r.name=?1")
    Role getByRoleName(String name);
}
