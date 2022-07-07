// // assuming top-level await for brevity
// const email = require('emailjs');

// const client = new email.SMTPClient({
//     user: 'oipdummy@gmail.com',
//     password: 'pakistan12@4',
//     host: 'smtp.gmail.com',
//     ssl: true,
// });
// exports.sendEmails = async (sendTo) => {
//     try {
//         const message = await client.sendAsync({
//             text: 'This is forgot password email',
//             from: 'oipdummy@gmail.com',
//             to: sendTo,
//             subject: 'Reset Password',
//         });
//         console.log(message);
//     } catch (err) {
//         console.error(err);
//     }
// }