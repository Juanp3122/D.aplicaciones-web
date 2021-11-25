package co.edu.poli.proyecto.controller;


import co.edu.poli.proyecto.model.Mail;
import co.edu.poli.proyecto.services.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping( "/mail")
public class MailController {
 
	@Autowired
	private MailService notificationService;
	
	/* JSON email...
	{
	    "mailTo": "wsoto@poligran.edu.co",
	    "mailSubject": "hola mundo",
	    "mailContent": "bienvenidos",
	    "attachments" : ["/Users/wilsonsoto/Downloads/TransaccionPNCBANK.pdf"]
	}
	*/
	@PostMapping("/")
	public String sendEmail(@RequestBody Mail mail){
		notificationService.sendEmail(mail);
		return "Email sent successfully";
	}
	
}