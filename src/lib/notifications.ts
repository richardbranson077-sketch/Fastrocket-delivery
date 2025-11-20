import { Resend } from 'resend';
import twilio from 'twilio';
import { ShipmentData } from './tracking';

// Lazy initialization to avoid build-time errors
function getResendClient() {
    if (!process.env.RESEND_API_KEY) {
        return null;
    }
    return new Resend(process.env.RESEND_API_KEY);
}

function getTwilioClient() {
    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
        return null;
    }
    return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Send an email notification
 */
export async function sendEmail(to: string, subject: string, html: string) {
    const resend = getResendClient();
    if (!resend) {
        console.warn('RESEND_API_KEY is not set. Email notification skipped.');
        return false;
    }

    try {
        const data = await resend.emails.send({
            from: 'FastRocket Delivery <notifications@resend.dev>', // Update this with your verified domain
            to,
            subject,
            html,
        });
        console.log('Email sent successfully:', data);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

/**
 * Send an SMS notification
 */
export async function sendSMS(to: string, body: string) {
    const twilioClient = getTwilioClient();
    if (!twilioClient || !process.env.TWILIO_PHONE_NUMBER) {
        console.warn('Twilio credentials are not set. SMS notification skipped.');
        return false;
    }

    try {
        const message = await twilioClient.messages.create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
        });
        console.log('SMS sent successfully:', message.sid);
        return true;
    } catch (error) {
        console.error('Error sending SMS:', error);
        return false;
    }
}

/**
 * Notify sender and receiver about a status update
 */
export async function notifyStatusUpdate(shipment: ShipmentData, newStatus: string, location: string, description: string) {
    const trackingLink = `${APP_URL}/tracking?id=${shipment.trackingNumber}`;

    const emailSubject = `Shipment Update: ${shipment.trackingNumber}`;
    const emailHtml = `
    <div style="font-family: sans-serif; color: #333;">
      <h1>Shipment Update</h1>
      <p>Your shipment <strong>${shipment.trackingNumber}</strong> has been updated.</p>
      <p><strong>Status:</strong> ${newStatus.replace(/_/g, ' ').toUpperCase()}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Description:</strong> ${description}</p>
      <br />
      <a href="${trackingLink}" style="background-color: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Track Shipment</a>
    </div>
  `;

    const smsBody = `FastRocket Update: Shipment ${shipment.trackingNumber} is now ${newStatus.replace(/_/g, ' ').toUpperCase()} at ${location}. ${description}. Track here: ${trackingLink}`;

    const notifications = [];

    // Notify Sender
    if (shipment.sender.email) {
        notifications.push(sendEmail(shipment.sender.email, emailSubject, emailHtml));
    }
    // Note: Assuming we have sender phone in the future, we could add SMS here

    // Notify Receiver
    if (shipment.receiver.email) {
        notifications.push(sendEmail(shipment.receiver.email, emailSubject, emailHtml));
    }
    // Note: Assuming we have receiver phone in the future, we could add SMS here

    await Promise.all(notifications);
}
