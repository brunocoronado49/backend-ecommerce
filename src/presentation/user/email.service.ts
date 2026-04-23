import nodemailer, { Transporter } from 'nodemailer';

interface Attachment {
  filename: string;
  path: string;
}

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachements?: Attachment[];
}

interface EmailOptions {
  mailerService: string;
  mailerEmail: string;
  mailerSecretKey: string;
}

export class EmailService {
  private transporter: Transporter;

  constructor(
    emailOptions: EmailOptions,
    private readonly postToProvider: boolean
  ) {
    const { mailerService, mailerEmail, mailerSecretKey } = emailOptions;

    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: mailerSecretKey,
      },
    });
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachements = [] } = options;

    try {
      if (!this.postToProvider) return true;

      await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments: attachements,
      });

      return true;
    } catch (error) {
      return false;
    }
  }
}
