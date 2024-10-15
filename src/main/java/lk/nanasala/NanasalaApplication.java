package lk.nanasala;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class NanasalaApplication {

	public static void main(String[] args) {
		SpringApplication.run(NanasalaApplication.class, args);
	}

}
