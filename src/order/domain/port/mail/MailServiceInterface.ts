export interface MailServiceInterface {
  sendEmail(email: string, subject: string, body: string): Promise<void>;
}
