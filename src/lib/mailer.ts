import nodemailer from "nodemailer";

export const esCorreo = (contacto: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto.trim());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function enviarCorreoEvento({
  destinatario,
  identificador,
  cantidad,
  tipo,
}: {
  destinatario: string;
  identificador: string;
  cantidad: number;
  tipo: "CONFIRMACION" | "RECORDATORIO";
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("Faltan configurar SMTP_USER y SMTP_PASS en el archivo .env");
  }

  const fecha = process.env.EVENTO_FECHA || "Próximamente";
  const direccion = process.env.EVENTO_DIRECCION || "Filadelfia Cuerpo de Cristo";

  const asunto =
    tipo === "CONFIRMACION"
      ? "✦ ¡Recibimos tu confirmación! | 22 Años Filadelfia Cuerpo de Cristo"
      : "🔔 Recordatorio Especial | ¡Falta muy poco para nuestro 22° Aniversario!";

  const encabezado =
    tipo === "CONFIRMACION"
      ? "¡Recibimos tu confirmación!"
      : "¡Te estaremos esperando muy pronto!";

  const mensajePrincipal =
    tipo === "CONFIRMACION"
      ? "Nos alegra muchísimo contar contigo. Tu asistencia ya quedó registrada y hemos reservado tu lugar para celebrar y agradecer juntos a Dios por estos 22 años de respaldo."
      : "Te escribimos como solicitaste para recordarte que faltan pocos días para celebrar juntos nuestro 22° Aniversario.";

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; background: #06192D; color: #ffffff; border-radius: 20px; overflow: hidden; border: 2px solid #D4AF37;">
      <div style="background: linear-gradient(135deg, #092644, #06192D); padding: 28px 24px; text-align: center; border-bottom: 1px solid rgba(212,175,55,0.35);">
        <p style="margin: 0; color: #F3D57B; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; font-family: Arial, sans-serif;">
          ✦ Filadelfia Cuerpo de Cristo ✦
        </p>
        <h1 style="margin: 8px 0 0; color: #FFF2BE; font-size: 34px;">22 Años</h1>
      </div>

      <div style="padding: 28px 26px; font-family: Arial, sans-serif;">
        <h2 style="margin-top: 0; color: #F3D57B; font-size: 20px;">${encabezado}</h2>
        <p style="color: #E0F2FE; line-height: 1.6; font-size: 14px;">
          Hola <strong>${identificador}</strong>,<br/><br/>
          ${mensajePrincipal}
        </p>

        <div style="background: #0B2B4C; border: 1px solid rgba(212,175,55,0.45); border-radius: 14px; padding: 16px; margin: 22px 0;">
          <p style="margin: 0 0 8px; color: #F3D57B; font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px;">
            <strong>Detalle de tu pase</strong>
          </p>
          <p style="margin: 4px 0; color: #ffffff; font-size: 14px;">👥 <strong>Asistentes:</strong> ${cantidad} ${cantidad === 1 ? "lugar reservado" : "lugares reservados"}</p>
          <p style="margin: 4px 0; color: #ffffff; font-size: 14px;">📅 <strong>Fecha:</strong> ${fecha}</p>
          <p style="margin: 4px 0; color: #ffffff; font-size: 14px;">📍 <strong>Lugar:</strong> ${direccion}</p>
        </div>

        <p style="color: #BAE6FD; font-size: 13px; text-align: center; margin-top: 24px;">
          Viviremos un tiempo especial de <strong>Evangelismo, Alabanza y Oración</strong>.
        </p>
      </div>

      <div style="background: #041222; padding: 14px; text-align: center; font-family: Arial, sans-serif; font-size: 11px; color: #94A3B8;">
        &copy; Filadelfia Cuerpo de Cristo
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Filadelfia Cuerpo de Cristo" <${process.env.SMTP_USER}>`,
    to: destinatario.trim(),
    subject: asunto,
    html,
  });
}