import { MulterFtpStorage } from "@admandev/multer-ftp-storage";
import multer from "multer";

const ftpUpload = new MulterFtpStorage({
  ftp: {
    host: "ftp.thecrazynyt.com",        // Replace with your FTP hostname
    user: process.env.FTP_USER,          // FTP username
    password: process.env.FTP_PASSWORD,  // FTP password
    secure: true,                        // Enables FTPS/FTP with TLS
    connTimeout: 100000,                 // Connection timeout in milliseconds
    pasvTimeout: 100000,                 // Passive mode timeout in milliseconds
    keepAlive: 100000,                   // Keep connection alive timeout in milliseconds
  }
});

const imageUpload = multer({
  storage: ftpUpload,
});

export default {
  imageUpload,
};
;
