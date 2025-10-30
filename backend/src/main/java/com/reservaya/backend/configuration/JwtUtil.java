package com.reservaya.backend.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    //Clave para firmar tokens(en prod va en .env)
    private static final String SECRET_KEY = "mi_clave_secreta_super_segura_de_al_menos_256_bits_para_jwt_token";
    //el token dura 24hs
    private static final long JWT_TOKEN_VALIDITY = 24 * 60 * 60 * 1000;

    //Generar la clave de la firma
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    //Extraer el mail del token
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    //Extraer fecha de expiracion
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    //Metodo para extraer una Claim
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    //Verificar si el token expiro
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    //Crear el token
    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    //validar token
    public boolean validateToken(String token, String email) {
        final String extractedEmail = extractEmail(token);
        return (extractedEmail.equals(email) && !isTokenExpired(token));
    }
    // Generar token con email
    public String generateToken(String email) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, email);
    }
}
