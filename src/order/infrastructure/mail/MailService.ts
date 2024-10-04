import { MailServiceInterface } from 'src/order/domain/port/mail/MailServiceInterface';
// import { MailerService } from '@nestjs-modules/mailer';

export class MailService implements MailServiceInterface {
  async sendEmail(email: string, subject: string, body: string): Promise<void> {
    console.log(
      'Mail envoyé à : ',
      email,
      'Objet : ',
      subject,
      'Corp du mail : ',
      body,
    );
  }
}
