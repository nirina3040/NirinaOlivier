import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // ✅ Vos clés EmailJS
  private serviceID = 'service_n5xt1w9';
  private templateID = 'template_67t394n';
  private publicKey = 'am5epjtdOIH3AxwAP';

  constructor() {
    emailjs.init(this.publicKey);
  }

  // ✅ Retourne une Promise (pas un Observable)
  sendMessage(data: ContactMessage): Promise<any> {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message
    };

    return emailjs.send(this.serviceID, this.templateID, templateParams);
  }
}