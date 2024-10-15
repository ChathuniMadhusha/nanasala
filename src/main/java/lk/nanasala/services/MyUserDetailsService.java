package lk.nanasala.services;

import lk.nanasala.dao.UserRepository;
import lk.nanasala.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service //user name password aran ewa bala authonticated user detail object ekak return krnwa
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userDao;

    @Override //securityfilterchain eka magin loaduserbyusername kiyna function eka call krnwa
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        lk.nanasala.entity.User logedUser = userDao.getUserByUsername(username);


        if (logedUser != null) {
            Set<GrantedAuthority> roleSet = new HashSet<GrantedAuthority>();

            //
            for (Role role : logedUser.getRoles()) {
                roleSet.add(new SimpleGrantedAuthority(role.getName()));
            }
            List<GrantedAuthority> authorities = new ArrayList<>(roleSet);

            return new User(logedUser.getUsername(), logedUser.getPassword(), logedUser.getStatus(), true, true, true, authorities);


        }else {
            List<GrantedAuthority> authorities = new ArrayList<>();

            return new User("none", "none", false, true, true, true, authorities);
        }


        }
    }
