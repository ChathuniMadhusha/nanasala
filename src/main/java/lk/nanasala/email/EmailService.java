package lk.nanasala.email;

import javax.mail.MessagingException;

public interface EmailService {

    // Method
    // To send a simple email
    void sendSimpleMail(EmailDetails details);

    // Method
    // To send an email with attachment
    void sendMailWithAttachment(EmailDetails details) throws MessagingException;

}
