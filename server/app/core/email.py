import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.config.settings import settings


class EmailService:
    def __init__(self, sender: str, password: str, host="smtp.gmail.com", port=587):
        self.sender = sender
        self.password = password
        self.host = host
        self.port = port

    def send_email(self, to: str, subject: str, body: str):
        msg = MIMEMultipart()
        msg["From"] = self.sender
        msg["To"] = to
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP(self.host, self.port) as server:
            server.starttls()
            server.login(self.sender, self.password)
            server.sendmail(self.sender, to, msg.as_string())


def get_email_service() -> EmailService:
    return EmailService(
        sender=settings.EMAIL_SENDER,
        password=settings.EMAIL_PASSWORD,
    )
