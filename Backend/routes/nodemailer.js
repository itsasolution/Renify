var express = require('express');
var router = express.Router();

const nodemailer = require('nodemailer');

async function sendMail(To_user) {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Setup email data
    let mailOptions = {
        from: `"Renify" <${process.env.EMAIL_USER}>`, // sender address
        to: To_user, // list of receivers
        subject: 'Renify ✔', // Subject line
        text: 'Booking Details HOLA thanks for using renify', // plain text body
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #4CAF50;">Booking Confirmation</h2>
            <p>Dear Customer,</p>
            <p>Thank you for your booking! We are pleased to confirm your booking for the <strong>Vehicle</strong>.</p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr>
                    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Booking Details</th>
                    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;"></th>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">Vehilce</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">XYZ</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">Charge</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">$20</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">Booking Date</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">June 16, 2024</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">Return Date</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">June 20, 2024</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">Payment Method</td>
                    <td style="padding: 8px; border-bottom: 1px solid #ddd;">Credit Card</td>
                </tr>
            </table>
            <p>If you have any questions or need further assistance, please feel free to contact our customer support team at <a href="mailto:support@example.com">renify.ast@gmail.com</a></p>
            <p>Thank you for choosing us!</p>
            <p>Best regards,</p>
            <p><strong>Renify Rental</strong></p>
            <p style="font-size: 0.9em; color: #777;">This is an automated message, please do not reply to this email.</p>
        </div>
    `
    };
    try {

        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
        console.log('Message id:', info.messageId)
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
        console.log(info);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

/* GET home page. */
router.get('/', async function (req, res, next) {
    await sendMail('fakesingh555@gmail.com');
    console.log(typeof process.env.EMAIL_USER)
    res.send("<h2>Check console</h2>")
});


module.exports = router;
