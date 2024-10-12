import { Client } from "basic-ftp";
import dotenv from "dotenv";

dotenv.config();

let client = null;

export default async function ftpClient() {
  client = new Client();
  client.ftp.verbose = true;
  try {
    const ftpRes = await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false,
    });
    console.log(ftpRes);
    const file = await client.uploadFrom("vercel.json","vercel.json")
    console.log(file)
    console.log("Connected to FTP server");
  } catch (err) {
    console.log("Error  connectiving ftp" + err);
  }
}
ftpClient();
