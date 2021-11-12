
package co.edu.poli.proyecto.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

	@Autowired
	private UserDetailsService userDetailsService;

	@Override protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		
		/* Providers */ 
		//first case memory users only without encryption
		/*
		auth.inMemoryAuthentication() 
			.withUser("wilson") 
			.password("{noop}123456")//{noop} plain text comment methods noPasswordEncoder/passwordEncoder
			.roles("ADMIN");
  		*/
		
		//second case database users and memory without encryption

 		auth.userDetailsService(userDetailsService); 
 		
		auth.inMemoryAuthentication()
			.withUser("Juan")
			.password("123456") //using method noPasswordEncoder
			.roles("ADMIN");

 
		//third case database users and memory with encryption
  		
		//auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
		/*
		auth.inMemoryAuthentication() 
			.withUser("wilson")
			.password("123") //using method passwordEncoder
			.roles("ADMIN");
		*/
  
  }

	@Override protected void configure(HttpSecurity http) throws Exception {
		 http.cors()
		 	.and()
			.csrf().disable() //Cross-Site Request Forgery (falsificación de petición en sitios cruzados) 
			.authorizeRequests()
			//.antMatchers("/api/v1/books").hasAnyRole("ADMIN", "USER")
			.antMatchers("/propietarios").hasRole("ADMIN")
			//auth with HTTP Methods
			/*
			.antMatchers(HttpMethod.GET, "/api/v1/books/**").hasRole("ADMIN")
			.antMatchers(HttpMethod.GET, "/api/v1/books/**").hasRole("USER")
			.antMatchers(HttpMethod.POST, "/api/v1/books/**").hasRole("ADMIN")
			.antMatchers(HttpMethod.PUT, "/api/v1/books/**").hasRole("ADMIN")
			.antMatchers(HttpMethod.DELETE, "/api/v1/books/**").hasRole("ADMIN")
			*/
			.anyRequest().authenticated() //For any other request, you do not need specific role but still need to be authenticated. 
			.and() 
			.formLogin()//authentication method 
			.and() 
			.httpBasic() //authentication method (allow test postman POST,DELETE,PUT) 
			.and() 
			.logout();//http://localhost:8080/login?logout 
	}


	@Bean
	public PasswordEncoder noPasswordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}

	
	

	
}
