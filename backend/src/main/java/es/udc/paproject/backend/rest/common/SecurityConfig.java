package es.udc.paproject.backend.rest.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private JwtGenerator jwtGenerator;
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		
		http.cors().and().csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
			.addFilter(new JwtFilter(authenticationManager(), jwtGenerator))
			.authorizeRequests()
			.antMatchers("/users/signUp").permitAll()
			.antMatchers("/teams*").permitAll()
			.antMatchers("/teams/*").permitAll()
			// .antMatchers("/teams/all").permitAll()
			// .antMatchers("/teams/find/*").permitAll()

			.antMatchers("/seasons*").permitAll()
			.antMatchers("/seasons/*").permitAll()
			.antMatchers("/seasons/*").permitAll()
			.antMatchers("/seasons/dates*").permitAll()

			.antMatchers("/players*").permitAll()
			.antMatchers("/players/*").permitAll()

			.antMatchers("/lesion*").permitAll()
			.antMatchers("/lesion/*").permitAll()

			.antMatchers("/notes*").permitAll()
			.antMatchers("/notes/*").permitAll()
			.antMatchers("/notes/dates*").permitAll()

			.antMatchers("/plays*").permitAll()
			.antMatchers("/plays/*").permitAll()

			.antMatchers("/trainings*").permitAll()
			.antMatchers("/trainings/*").permitAll()

			.antMatchers("/games*").permitAll()
			.antMatchers("/games/*").permitAll()

			.antMatchers("/statistics*").permitAll()
			.antMatchers("/statistics/*").permitAll()

			.antMatchers("/stretchings*").permitAll()
			.antMatchers("/stretchings/*").permitAll()

			.antMatchers("/exercises*").permitAll()
			.antMatchers("/exercises/*").permitAll()

			.antMatchers("/users/login").permitAll()
			.antMatchers("/users/loginFromServiceToken").permitAll()
			.anyRequest().hasRole("USER");

	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		
		CorsConfiguration config = new CorsConfiguration();
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		
		config.setAllowCredentials(true);
	    config.addAllowedOrigin("*");
	    config.addAllowedHeader("*");
	    config.addAllowedMethod("*");
	    
	    source.registerCorsConfiguration("/**", config);
	    
	    return source;
	    
	 }

}
