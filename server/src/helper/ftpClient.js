import { Client } from "basic-ftp";
import dotenv from "dotenv";

dotenv.config();

async function ftpClient() {
  const client = new Client();
  client.ftp.verbose = true; // Enables detailed logging for debugging

  try {
    // Establishing connection to the FTP server
    await client.access({
      host: "ftp.thecrazynyt.com",
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: true, 
    });

    console.log("Connected to FTP server");

    // Upload a file to the FTP server
    await client.uploadFrom("vercel.json", "vercel.json");
    console.log("File uploaded successfully");

  } catch (err) {
    console.error("Error connecting to FTP server:", err);
  } finally {
    // Close the client connection to prevent resource leaks
    client.close();
    console.log("FTP connection closed");
  }
}

// Run the FTP client function
ftpClient();
