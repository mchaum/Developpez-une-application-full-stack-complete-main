package com.openclassrooms.mddapi.security;

import com.openclassrooms.mddapi.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
	
	private final UserService userService;
	private final JwtUtils jwtUtils;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
	        throws ServletException, IOException {
	    String requestPath = request.getRequestURI();

	    // Exclure certains endpoints
	    if (requestPath.startsWith("/swagger-ui") || 
	        requestPath.startsWith("/v3/api-docs") || 
	        requestPath.equals("/error") || 
	        requestPath.equals("/auth/login") || 
	        requestPath.equals("/auth/register")) {
	        filterChain.doFilter(request, response);
	        return;
	    }

	    final String authHeader = request.getHeader("Authorization");

	    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
	        log.warn("Authorization header missing or does not start with 'Bearer '");
	        filterChain.doFilter(request, response);
	        return;
	    }

	    String jwt = authHeader.substring(7); // Remove "Bearer " prefix
	    String email = null;

	    try {
	        email = jwtUtils.extractEmail(jwt);
	    } catch (Exception e) {
	        log.error("Invalid JWT: " + e.getMessage());
	        filterChain.doFilter(request, response);
	        return;
	    }

	    if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
	        UserDetails userDetails = userService.loadUserByUsername(email);

	        if (jwtUtils.validatetoken(jwt, userDetails)) {
	            UsernamePasswordAuthenticationToken authenticationToken =
	                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
	        }
	    }

	    filterChain.doFilter(request, response);
	}

}