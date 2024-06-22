
import { Client, logger } from 'camunda-external-task-client-js';
import nodemailer from 'nodemailer';

// Cấu hình client
const config = { baseUrl: 'http://localhost:8080/engine-rest', use: logger };
const client = new Client(config);

// cấu hình transporter cho nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '22521508@gm.uit.edu.vn',
    pass: 'ximuoi123'
  }
});


client.subscribe('SendEmail', async ({ task, taskService }) => {
    const customerEmail = task.variables.get('EmailSender');
    const contentSolution = task.variables.get('solution');
    const customerName = task.variables.get('NameCustomer') ; 


const mailOptions = {
    from: '22521508@gm.uit.edu.vn',
    to: customerEmail,
    subject: `Hi ${customerName}, We have received your complaint`,
    text: `${contentSolution}`,
  };


  try {
    // Gửi email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    await taskService.complete(task);
  } catch (error) {
    console.error('Error sending email:', error);
   
  }
});


client.start();