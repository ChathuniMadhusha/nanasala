package lk.nanasala.email;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.stereotype.Service;


import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;

@EnableAsync
@Service
public class EmailServiceImpl implements EmailService{

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") private String sender;

    @Async
    public void sendSimpleMail(EmailDetails details) {


        // Creating a simple mail message
        SimpleMailMessage mailMessage
                = new SimpleMailMessage();

        // Setting up necessary details
        mailMessage.setFrom(sender);
        mailMessage.setTo(details.getSendto());
        mailMessage.setText(details.getMsgBody());
        mailMessage.setSubject(details.getSubject());

        // Sending the mail
        javaMailSender.send(mailMessage);

    }



    // Method 2
    // To send an email with attachment
    public void
    sendMailWithAttachment(EmailDetails details) throws MessagingException
    {
        // Creating a mime message
        MimeMessage mimeMessage
                = javaMailSender.createMimeMessage();


        // Setting multipart as true for attachments to
        // be send
       MimeMessageHelper mimeMessageHelper
                = new MimeMessageHelper(mimeMessage, true);
        mimeMessageHelper.setFrom(sender);
        mimeMessageHelper.setTo(details.getSendto());
        mimeMessageHelper.setText(details.getMsgBody(),true);
        mimeMessageHelper.setSubject(
                details.getSubject());

        // Adding the attachment
        FileSystemResource file
                = new FileSystemResource(
                new File(details.getAttachment()));

        mimeMessageHelper.addAttachment(
                file.getFilename(), file);

        // Sending the mail
        javaMailSender.send(mimeMessage);

    }

}


