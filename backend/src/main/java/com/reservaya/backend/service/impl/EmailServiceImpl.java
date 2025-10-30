package com.reservaya.backend.service.impl;

import com.reservaya.backend.dto.UserDTO;
import com.reservaya.backend.service.IEmailService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Async
@Service
public class EmailServiceImpl implements IEmailService {

    private final JavaMailSender mailSender;

    public EmailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    @Override
    public void sendWelcomeEmail(UserDTO user){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("no.replyreservaya@gmail.com");
        message.setTo(user.getEmail());
        message.setSubject("Bievenido a ReservaYa!");
        message.setText(
                "Hola " + user.getFirstName() + " " + user.getLastName() + ",\n\n" +
                        "Tu cuenta ha sido creada exitosamente.\n\n" +
                        "Email: " + user.getEmail() + "\n" +
                        "User: " + user.getAvatar() + "\n\n" +
                        "¡Gracias por registrarte!\n\n" +
                        "Saludos,\n" +
                        "Equipo ReservaYa"
        );
        mailSender.send(message);
    }
}
