package lk.nanasala.configuration;


import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class WebConfiguration {
    @Bean //palleha functione eka instance ekak bawata harawanwa
    //mokak hri security wala error awoth eya error ekak throw krnwa
public SecurityFilterChain securityfilter(HttpSecurity http) throws Exception{
        http.authorizeRequests()
                //oonama kenekta ena request ekak authorize wenwa. (assest folder eke tyna siyalu files wlata oonama kenekta permission hambenwa
                .antMatchers("/assets/**","/img/**").permitAll()
                .antMatchers("/login").permitAll()
                .antMatchers("/changeuser/sendotp").permitAll()
                .antMatchers("/changeuser/checkotp").permitAll()
                .antMatchers("/changeuser/changeforgetuserpassword").permitAll()
                .antMatchers("/createadmin").permitAll()
                .antMatchers("/course/**").hasAnyAuthority("Admin","Manager","Receptionist","Teacher")
                .antMatchers("/student/**").hasAnyAuthority("Admin","Manager","Receptionist","Teacher")
                .antMatchers("/stubatchreg/**").hasAnyAuthority("Admin","Manager","Receptionist","Teacher")
                .antMatchers("/coursepayment/**").hasAnyAuthority("Admin","Manager","Receptionist","Teacher")
                .antMatchers("/attendance/**").hasAnyAuthority("Admin","Manager","Teacher","Receptionist")
                .antMatchers("/user/**").hasAnyAuthority("Admin","Manager","Teacher","Receptionist","Demostrator")
                .antMatchers("/employee/**").hasAnyAuthority("Admin","Manager","Teacher","Receptionist","Demostrator")
                .antMatchers("/privilage/**").hasAnyAuthority("Admin","Manager","Teacher","Receptionist","Demostrator")


                .antMatchers("/dashboard","/logeduser").hasAnyAuthority("Admin","Manager","Teacher","Receptionist","Demostrator")
                .anyRequest().authenticated().and().csrf().disable() //cross access krna eka disbale krnwa
                //loging details (loging page URL eka)
                .formLogin().loginPage("/login").defaultSuccessUrl("/dashboard",true).failureUrl("/login?error=usernamepassworderror")
                .usernameParameter("username")
                .passwordParameter("password")
                .and().logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login")
                .and().exceptionHandling()
                .accessDeniedPage("/error");
        //apita hambena URL eka build kra gannwa, e URL eka loging user anuwa authorization check krna oni
    return http.build();

}

@Bean //bean instance ekak haduna.. me bean instance eka project eka thula use krna pluwn
public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
}




}
