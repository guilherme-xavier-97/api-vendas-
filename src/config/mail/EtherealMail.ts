import nodemailer from 'nodemailer';
import HandleBarsMailTemplate from './HandleBarsMailTemplate';

interface ITemplateVariables {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariables;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;

  //the question mark says the attribute isnt required
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class Ethereamail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const mailTemplate = new HandleBarsMailTemplate();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API vendas',
        address: from?.email || 'suporte@apivendas.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });

    console.log('Message sent: %s ', message.messageId);
    console.log('Preview URL: %s ', nodemailer.getTestMessageUrl(message));
  }
}
