import type { Context } from '@netlify/functions';
import { createTransport, getTestMessageUrl } from 'nodemailer';
import {signature} from '../signature-ch'

type RequestBody = {
  postalCode: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  occupationalGroup: string;
  originalSourceFirstPerson: string;
  preferredLanguage: string;
  language: string;
  locale: string;
  newsletter: boolean;
  appointment: boolean;
  url: string;
};

const emailBody = (reqBody: RequestBody) => {
  return `Neue Kontaktaufnahme über metallart.com:

Name: ${reqBody.name}
E-Mail-Adresse: ${reqBody.email}
Telefonnummer: ${reqBody.phone}
Postleitzahl: ${reqBody.postalCode}
Berufsgruppe: ${reqBody.occupationalGroup}
Wie haben Sie von uns erfahren: ${reqBody.originalSourceFirstPerson}
Newsletter: ${reqBody.newsletter ? 'ja' : 'nein'}
Termin gewünscht: ${reqBody.appointment ? 'ja' : 'nein'}
Sprache: ${reqBody.locale}
Bevorzugte Sprache: ${reqBody.preferredLanguage}
URL: ${reqBody.url}

Nachricht:

${reqBody.message}`};

const emailBodyUser = (reqBody: RequestBody) => {
  let body = reqBody.name ? `Liebe/r ${reqBody.name},

vielen Dank für Ihre Nachricht an uns.` : `Vielen Dank für Ihre Nachricht an uns.`

body += `

Wir werden uns in Kürze bei Ihnen melden.

Ihre Informationen:

Name: ${reqBody.name}
Telefon: ${reqBody.phone}
Postleitzahl: ${reqBody.postalCode}

Ihre Nachricht:

${reqBody.message}




Mit freundlichen Grüssen / Best regards
Ihr METALLART Team

${signature}`

  return body
};

const emailBodyUserEn = (reqBody: RequestBody) => {
  let body = reqBody.name ? `Dear ${reqBody.name},

thank you for your message to us.` : `Thank you for your message to us.`

body += `

We will get back to you shortly.

Your information:

Name: ${reqBody.name}
Phone: ${reqBody.phone}
Postal code: ${reqBody.postalCode}

Your message:

${reqBody.message}




Best regards
Your METALLART Team

${signature}`

  return body
};

export default async (req: Request, context: Context) => {
  const isDev = !(Netlify.env.get('PUBLIC_SMTP_VERSION') === 'production');

  console.log('context', context)

  let reqBody: RequestBody;
  try {
    reqBody = await req.json();
  } catch (e) {
    console.log(event);
    return new Response(`[ERROR] Invalid JSON - ${e.message}`, {
      status: 400
    });
  }
  const host = isDev
    ? Netlify.env.get('SMTP_TEST_HOST')
    : Netlify.env.get('SMTP_HOST_CH');
  const port = isDev
    ? parseInt(String(Netlify.env.get('SMTP_TEST_PORT')))
    : parseInt(String(Netlify.env.get('SMTP_PORT')));
  const user = isDev
    ? Netlify.env.get('SMTP_TEST_USER')
    : Netlify.env.get('SMTP_USER_CH');
  const pass = isDev
    ? Netlify.env.get('SMTP_TEST_PASS')
    : Netlify.env.get('SMTP_PASS_CH');
  const mailFrom = isDev
    ? Netlify.env.get('SMTP_TEST_FROM')
    : Netlify.env.get('SMTP_FROM_CH');
  const mailNotification = isDev
    ? Netlify.env.get('SMTP_TEST_NOTIFICATION')
    : Netlify.env.get('SMTP_NOTIFICATION_CH');
  const mailReply = isDev
    ? Netlify.env.get('SMTP_TEST_REPLY')
    : Netlify.env.get('SMTP_REPLY_CH');
    
  const transportConfig = {
    pool: true,
    host,
    port,
    // NOTE: secure=true leads to an SSL3 error. Therefore leave deactivated.
    // secure: true,
    auth: {
      user,
      pass
    },
    ...(isDev ? {
      logger: true,
      debug: true,
    } : {}),
  };
  console.log('transportConfig', transportConfig);
  const transport = createTransport(transportConfig);

  let connectionTest = undefined;
  transport.verify(function (error, success) {
    if (error) {
      connectionTest = error;
      console.error('Server connection error', error);
    } else {
      connectionTest = success;
      console.log('Server is ready to take our messages');
    }
  });

  // const templateFolder = resolve(__dirname, '../../emails');
  // transport.use('compile', nodemailerMjmlPlugin({ templateFolder }));

  const emailNotification = {
    subject: `${reqBody.appointment ? '[Termin]' :'[Anfrage]'} ${reqBody.name}`,
    text: emailBody(reqBody),
    from: `"Kontaktformular" <${mailFrom}>`,
    to: `"METALLART" <${mailNotification}>`,
    replyTo: reqBody.name ? `"${reqBody.name}" <${reqBody.email}>` : reqBody.email
  };
  const sendMail = async () => {
    return await transport.sendMail(emailNotification);
  };
  const infoNotification = await sendMail();

  const emailUser = {
    subject: `Vielen Dank für Ihre Nachricht`,
    text: emailBodyUser(reqBody),
    from: `"METALLART" <${mailFrom}>`,
    to: reqBody.email,
    replyTo: `"METALLART" <${mailReply}>`,
  };
  const emailUserEn = {
    subject: `Thank you for your message`,
    text: emailBodyUserEn(reqBody),
    from: `"METALLART" <${mailFrom}>`,
    to: reqBody.email,
    replyTo: `"METALLART" <${mailReply}>`,
  };
  const sendEmailUser = async () => {
    return await transport.sendMail(reqBody.locale === 'en' ? emailUserEn : emailUser);
  };
  const infoUser = await sendEmailUser();

  const previewsUrlNotification = getTestMessageUrl(infoNotification)
  const previewsUrlUser = getTestMessageUrl(infoUser)

  console.log('Preview Notification: ' + previewsUrlNotification);
  console.log('Preview User: ' + previewsUrlUser);

  return Response.json(
    {
      previewsUrlNotification,
      previewsUrlUser
    },
    { status: 200 }
  );
};
