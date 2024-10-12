import FTPStorage from "multer-ftp";
import multer from "multer";
import { MulterFtpStorage } from "@admandev/multer-ftp-storage";
import path from "node:path";
import crypto from "node:crypto";

const ftpUpload = new MulterFtpStorage({
  ftp: {
    host: process.env.FTP_HOST,
    secure: false, // enables FTPS/FTP with TLS
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
  },
});

var imageUpload = multer({
  storage: ftpUpload,
});

export default {
  imageUpload,
};
