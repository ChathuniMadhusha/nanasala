package lk.nanasala.dao;


import lk.nanasala.entity.Class_Catogary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClassCatogaryRepository extends JpaRepository<Class_Catogary,Integer> {
}
