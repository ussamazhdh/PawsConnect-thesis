package com.adptapaw.backend.controller;

import com.adptapaw.backend.context.AccountPasswordResetEmailContext;
import com.adptapaw.backend.context.AccountVerificationEmailContext;
import com.adptapaw.backend.dto.response.ApiResponse;
import com.adptapaw.backend.entity.Roles;
import com.adptapaw.backend.entity.Token;
import com.adptapaw.backend.entity.User;
import com.adptapaw.backend.exception.BadRequestException;
import com.adptapaw.backend.exception.ForbiddenException;
import com.adptapaw.backend.exception.InvalidTokenException;
import com.adptapaw.backend.exception.ResourceNotFoundException;
import com.adptapaw.backend.payload.*;
import com.adptapaw.backend.repository.RolesRepository;
import com.adptapaw.backend.repository.UserRepository;
import com.adptapaw.backend.security.JWTTokenProvider;
import com.adptapaw.backend.security.UserServiceSecurity;
import com.adptapaw.backend.service.email.EmailService;
import com.adptapaw.backend.service.token.TokenService;
import com.adptapaw.backend.utils.AdoptapawConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.File;
import java.util.Collections;
import java.util.Objects;

@CrossOrigin(origins = ("${site.base.url.https}"))
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RolesRepository roleRepository;

    @Autowired
    private UserServiceSecurity userServiceSecurity;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTTokenProvider tokenProvider;

    @Autowired
    private EmailService emailService;

    @Autowired
    private TokenService tokenService;

    @Value("${site.base.url.https}")
    private String baseURL;

    @PostMapping("/signin")
    public ResponseEntity<ApiResponse<UserDetailsDTO>> authenticateUser(@Valid @RequestBody LoginDTO loginDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = tokenProvider.generateToken(authentication);

            UserServiceSecurity userServiceSecurity = new UserServiceSecurity(userRepository, tokenService);
            UserDetailsDTO userDetailsDTO = userServiceSecurity.loadUserByEmail(loginDTO.getEmail());

            JWTDTO jwtdto = new JWTDTO(token);
            userDetailsDTO.setJwtdto(jwtdto);

            return ResponseEntity.ok(ApiResponse.success("Login successful", userDetailsDTO));
        } catch (Exception e) {
            logger.error("Authentication failed for email: {}", loginDTO.getEmail(), e);
            throw new BadRequestException("Invalid email or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserDetailsDTO>> registerUser(@Valid @RequestBody SignupDTO signupDTO) {
        if (userRepository.existsByEmail(signupDTO.getEmail())) {
            throw new BadRequestException("Email is already taken!");
        }

        if (userRepository.existsByUsername(signupDTO.getUsername())) {
            throw new BadRequestException("Username is already taken!");
        }

        // Create user object
        User user = new User();
        user.setName(signupDTO.getName());
        user.setEmail(signupDTO.getEmail());
        user.setUsername(signupDTO.getUsername());
        user.setPassword(passwordEncoder.encode(signupDTO.getPassword()));
        user.setBio(signupDTO.getBio());
        user.setBanned(false);
        user.setDp(signupDTO.getDp());
        user.setLocation(signupDTO.getLocation());
        user.setAccountVerified(false);

        Roles roles = roleRepository.findByName("ROLE_USER")
                .orElseThrow(() -> new ResourceNotFoundException("Role", "name", "ROLE_USER"));
        user.setRoles(Collections.singleton(roles));

        userRepository.save(user);

        Token token = tokenService.createToken(user);

        AccountVerificationEmailContext mail = new AccountVerificationEmailContext();
        mail.setFrom("77795@office.mans.org.pl");
        mail.setTemplateLocation("emailsender.html");
        mail.setSubject("Complete your registration");
        mail.setTo(user.getEmail());
        mail.put("name", user.getName());
        mail.setToken(token.getToken());
        mail.buildVerificationUrl(baseURL, token.getToken());
        FileSystemResource imageResourceName = new FileSystemResource(new File("unsplash.com/photos/LvLlOpu3vzM"));
        mail.put("imageResourceName", imageResourceName);

        try {
            emailService.sendMail(mail);
        } catch (MessagingException e) {
            logger.error("Failed to send verification email to: {}", user.getEmail(), e);
            // Don't fail registration if email fails, but log it
        }

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setId(user.getId());
        userDetailsDTO.setName(user.getName());
        userDetailsDTO.setEmail(user.getEmail());
        userDetailsDTO.setUsername(user.getUsername());

        return ResponseEntity.ok(ApiResponse.success("Registration successful. Please check your email to verify your account.", userDetailsDTO));
    }

    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<String>> verifyUser(@RequestParam(required = false) String token) {
        if (token == null || token.trim().isEmpty()) {
            throw new BadRequestException("Token is required");
        }

        try {
            userServiceSecurity.verifyUser(token);
            return ResponseEntity.ok(ApiResponse.success("Account verified successfully"));
        } catch (InvalidTokenException e) {
            throw new BadRequestException("Token is not valid or has expired");
        }
    }

    @PostMapping("/resetrequest")
    public ResponseEntity<ApiResponse<String>> resetPasswordRequest(@RequestParam(required = false) String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new BadRequestException("Email is required");
        }

        try {
            String message = userServiceSecurity.CreateForgotPasswordToken(email);
            return ResponseEntity.ok(ApiResponse.success(message));
        } catch (Exception e) {
            logger.error("Password reset request failed for email: {}", email, e);
            // Don't reveal if email exists or not for security
            return ResponseEntity.ok(ApiResponse.success("If the email exists, a password reset link has been sent."));
        }
    }

    @PutMapping("/reset/{token}")
    public ResponseEntity<ApiResponse<String>> resetPassword(
            @PathVariable(name = "token") String token,
            @Valid @RequestBody ResetTokenDTO resetTokenDTO) {

        Token usertoken = tokenService.findByToken(token);
        if (usertoken == null || !Objects.equals(token, usertoken.getToken()) || usertoken.isExpired()) {
            throw new BadRequestException("Token is not valid or has expired");
        }

        User user = userRepository.findById(usertoken.getUsertoken().getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", usertoken.getUsertoken().getId()));

        user.setPassword(passwordEncoder.encode(resetTokenDTO.getPassword()));
        userRepository.save(user);
        tokenService.removeToken(usertoken);

        AccountPasswordResetEmailContext mail = new AccountPasswordResetEmailContext();
        mail.setFrom("77795@office.mans.org.pl");
        mail.setTemplateLocation("passwordresetsuccess.html");
        mail.setSubject("Password Reset Confirmation");
        mail.setTo(user.getEmail());
        mail.put("name", user.getName());

        try {
            emailService.sendMail(mail);
        } catch (MessagingException e) {
            logger.error("Failed to send password reset confirmation email to: {}", user.getEmail(), e);
        }

        return ResponseEntity.ok(ApiResponse.success("Password changed successfully"));
    }

    @PutMapping("/user/{id}/update")
    public ResponseEntity<ApiResponse<UserDetailsDTO>> updateUser(
            @PathVariable String id,
            @Valid @RequestBody SignupDTO signupDTO) {

        User user = userRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", Long.parseLong(id)));

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (!Objects.equals(user.getEmail(), auth.getName())) {
            throw new ForbiddenException("Not authorized to update this user");
        }

        user.setName(signupDTO.getName());
        if (signupDTO.getPassword() != null && !signupDTO.getPassword().trim().isEmpty()) {
            user.setPassword(passwordEncoder.encode(signupDTO.getPassword()));
        }
        user.setBio(signupDTO.getBio());
        user.setLocation(signupDTO.getLocation());
        user.setDp(signupDTO.getDp());

        userRepository.save(user);

        // Re-authenticate if password was changed
        if (signupDTO.getPassword() != null && !signupDTO.getPassword().trim().isEmpty()) {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), signupDTO.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = tokenProvider.generateToken(authentication);

            UserServiceSecurity userServiceSecurity = new UserServiceSecurity(userRepository, tokenService);
            JWTDTO jwtdto = new JWTDTO(token);

            UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
            userDetailsDTO.setName(user.getName());
            userDetailsDTO.setEmail(user.getEmail());
            userDetailsDTO.setUsername(user.getUsername());
            userDetailsDTO.setLocation(user.getLocation());
            userDetailsDTO.setBio(user.getBio());
            userDetailsDTO.setDp(user.getDp());
            userDetailsDTO.setId(user.getId());
            userDetailsDTO.setRole(user.getRoles());
            userDetailsDTO.setJwtdto(jwtdto);
            userDetailsDTO.setBanned(user.isBanned());

            return ResponseEntity.ok(ApiResponse.success("User updated successfully", userDetailsDTO));
        }

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setName(user.getName());
        userDetailsDTO.setEmail(user.getEmail());
        userDetailsDTO.setUsername(user.getUsername());
        userDetailsDTO.setLocation(user.getLocation());
        userDetailsDTO.setBio(user.getBio());
        userDetailsDTO.setDp(user.getDp());
        userDetailsDTO.setId(user.getId());
        userDetailsDTO.setRole(user.getRoles());
        userDetailsDTO.setBanned(user.isBanned());

        return ResponseEntity.ok(ApiResponse.success("User updated successfully", userDetailsDTO));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PutMapping("/admin/user/{id}/ban")
    public ResponseEntity<ApiResponse<UserDetailsDTO>> banUser(@PathVariable String id) {
        User user = userRepository.findById(Long.valueOf(id))
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", Long.parseLong(id)));

        boolean isAdmin = user.getRoles().stream()
                .anyMatch(role -> "ROLE_ADMIN".equals(role.getName()));

        if (isAdmin) {
            throw new BadRequestException("Admin cannot be banned");
        }

        user.setBanned(true);
        userRepository.save(user);

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setName(user.getName());
        userDetailsDTO.setEmail(user.getEmail());
        userDetailsDTO.setBanned(user.isBanned());

        return ResponseEntity.ok(ApiResponse.success("User banned successfully", userDetailsDTO));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(
            @RequestParam(value = "pageNo", defaultValue = AdoptapawConstants.DEFAULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = AdoptapawConstants.DEFAULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = AdoptapawConstants.DEFAULT_SORT_BY, required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = AdoptapawConstants.DEFAULT_SORT_DIRECTION, required = false) String sortDir) {
        return userServiceSecurity.getAllUsers(pageNo, pageSize, sortBy, sortDir);
    }
}
