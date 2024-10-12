# Multer-ftp-storage

This is a custom storage engine for [Multer](https://github.com/expressjs/multer) that allows you to upload files via FTP. This package integrates Multer's file handling with the simplicity of FTP, making it easy to store files on a remote server.

## Installation

Install the package via npm:

```bash
npm install @admandev/multer-ftp-storage multer
```

## Usage

Below is an example of how to configure and use it

```javascript
import express from "express";
import { Router } from "express";
import multer from "multer";
import MulterFtpStorage from "@admandev/multer-ftp-storage";
import Controller from "./controller";

// Create an FTP storage engine
const ftpStorage = new MulterFtpStorage({
  ftp: {
    host: "Your FTP host", 
    user: "Your FTP user", 
    password: "Your FTP user password", 
    basepath: "Your FTP base file folder" // Without slash at the end
  },
});

// Initialize multer with the FTP storage engine
const multerConfig = multer({ storage: ftpStorage });

const app = express();
const router = Router();

// Define a POST route to upload files
router.post("/", multerConfig.any(), Controller.postFile);

app.use("/upload", router);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

```

## Options

The `MulterFtpStorage` constructor accepts an options object with the following properties:

- `ftp`: An object with the following properties:
  - `host`: The FTP host to connect to.
  - `user`: The FTP user to authenticate with.
  - `password`: The password for the FTP user.
  - `basepath`: The base folder on the FTP server where files will be stored. This is optional and defaults to the root folder.
- `multer`: An object with the following properties:
  - `fileNameFn`: A function that generates the file name for the uploaded file. This function receives the request object and the file object as arguments and should return a string with the file name. This is optional and defaults to a function that generates a random file name.
