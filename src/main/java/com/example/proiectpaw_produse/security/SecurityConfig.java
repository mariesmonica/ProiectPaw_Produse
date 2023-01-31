package com.example.proiectpaw_produse.security;

import com.example.proiectpaw_produse.security.jwt.AuthEntryPointJwt;
import com.example.proiectpaw_produse.security.jwt.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    CustomUserDetailsService customUserDetailsService;
    @Autowired
    AuthEntryPointJwt authEntryPointJwt;
    @Autowired
    JwtFilter jwtFilter;
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(customUserDetailsService);
    }

    @Bean
    public JwtFilter authenticationJwtTokenFilter() {
        return new JwtFilter();
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http = http.csrf().disable().cors().and();

        http = http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and();
        http=http.exceptionHandling().authenticationEntryPoint(authEntryPointJwt).and();
        http.authorizeRequests().antMatchers("/Product/**")
                .authenticated()
                .antMatchers("/Auth/**").permitAll()
                .antMatchers("/index/**").permitAll();

        http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
