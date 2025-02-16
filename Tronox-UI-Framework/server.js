import express from "express";
import { exec } from "child_process";
import cors from "cors";
import fs from "fs";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import config from "./config/app.config.js";
import userConfig from "./config/user.config.js";
import multer from "multer";
import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from "url";
import { Document, Packer, Paragraph, ImageRun } from "docx";
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
// Fix __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));
const upload = multer({ dest: "uploads/" });

function isEmptyObject(obj) {
  return obj && typeof obj === "object" && Object.keys(obj).length === 0;
}

// Login API to issue JWT token
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === userConfig.username && password === userConfig.password) {
    const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: "3h" });
    return res.json({ message: "Login successful!", token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    const token = bearerHeader.split(" ")[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(403).json({ message: "Token required" });
  }
}

function runScript(req, res) {
  exec("npm run wdio", (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(`Test run failed: ${error.message}`);
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).send(`Test run failed with error: ${stderr}`);
    }

    console.log(`stdout: ${stdout}`);
    res.send(`Test run completed successfully: ${stdout}`);
  });
}
// Route to trigger the test case
app.post("/run-test", (req, res) => {
  // Run the test case using a child process
  runScript(req, res);
});

// Load tiles from JSON file
app.get("/api/tiles", verifyToken, (req, res) => {
  try {
    //config\config.json
    //C:\Tronox-UI-Repo\Tronox-UI-Framework\config\config.json
    const tileData = JSON.parse(
      fs.readFileSync("./config/config.json", "utf-8")
    );
    res.json(tileData);
  } catch (error) {
    res.status(500).json({ message: "Error loading tile data" });
  }
});

app.post("/uploadnew", verifyToken, upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0]; // Read first sheet
    const sheet = workbook.Sheets[sheetName];

    // Read merged cells information
    const mergedCells = sheet["!merges"] || [];
    console.log(mergedCells.length);
    const jsonData = xlsx.utils.sheet_to_json(sheet, {
      header: 1,
      defval: null,
    });

    // Process merged cells to create hierarchy
    const result = {};
    const processedColumns = new Set();
    const rowMergedMap = {}; // Track row-merged cells

    mergedCells.forEach((merge) => {
      const parentCell = jsonData[merge.s.r][merge.s.c];
      const childData = {};
      var r = "";
      for (let col = merge.s.c; col <= merge.e.c; col++) {
        const key = jsonData[merge.s.r + 1]?.[col]; // Get column headers
        const value = jsonData[merge.s.r + 2]?.[col]; // Get corresponding values

        r = value;

        if (key) {
          childData[key] = value !== undefined ? value : null;
          processedColumns.add(col); // Mark as processed
        }
      }

      if (isEmptyObject(childData)) {
        result[parentCell] = r;
      } else {
        result[parentCell] = childData;
      }
    });

    //  Handle non-merged columns and row-merged values
    if (mergedCells.length == 0) {
      const headers = jsonData[0] || [];
      const values = jsonData[1] || [];
      headers.forEach((header, index) => {
        if (header && !processedColumns.has(index)) {
          const value =
            values[index] !== undefined
              ? values[index]
              : rowMergedMap[2] || null;
          result[header] = value;
        }
      });
    }
    // Cleanup uploaded file
    fs.unlinkSync(req.file.path);
    const jsonString = JSON.stringify(result, null, 2);
    const path =
      "C:\\Tronox-UI-Repo\\Tronox-UI-Framework\\test\\Data\\Tronox\\Physicalinventory.json";
    fs.writeFile(path, jsonString, "utf8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("File successfully overwritten!");
        exec("npm run wdio", (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send(`Test run failed: ${error.message}`);
          }

          if (stderr) {
            console.error(`stderr: ${stderr}`);
            return res
              .status(500)
              .send(`Test run failed with error: ${stderr}`);
          }

          console.log(`stdout: ${stdout}`);
          res.send(`Test run completed successfully: ${stdout}`);
        });
      }
    });

    // res.json(result);
  } catch (error) {
    console.error("Error processing file:", error);
    res.status(500).json({ error: "Error processing file" });
  }
});

// app.get("/realtime", (req, res) => {
//   res.setHeader("Content-Type", "text/plain");
//   res.setHeader("Transfer-Encoding", "chunked");

//   let count = 0;

//   const sendData = () => {
//       count++;
//       res.write(`Message ${count}: This is update ${count}\n`);
//       res.flush?.(); // Flush the response buffer if supported

//       if (count === 5) {
//           clearInterval(interval);
//           res.write("Done!\n");
//           res.end();
//       }
//   };

//   sendData(); // Send first message immediately
//   const interval = setInterval(sendData, 2000);
// });

app.post(
  "/realtime-testcase-exec",
  verifyToken,
  upload.single("file"),
  (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");

    if (!req.file) {
      res.write("Error: No file uploaded\n");
      return res.end();
    }

    const { testName } = req.body; // Get the test name from the frontend

    if (!testName) {
      res.write("Error: No test name provided\n");
      return res.end();
    }

    try {
      res.write("Processing uploaded file...\n");

      const workbook = xlsx.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const mergedCells = sheet["!merges"] || [];
      res.write(`Found ${mergedCells.length} merged cells.\n`);

      const jsonData = xlsx.utils.sheet_to_json(sheet, {
        header: 1,
        defval: null,
      });
      const result = {};
      const processedColumns = new Set();

      mergedCells.forEach((merge) => {
        const parentCell = jsonData[merge.s.r][merge.s.c];
        const childData = {};
        let r = "";

        for (let col = merge.s.c; col <= merge.e.c; col++) {
          const key = jsonData[merge.s.r + 1]?.[col];
          const value = jsonData[merge.s.r + 2]?.[col];
          r = value;

          if (key) {
            childData[key] = value !== undefined ? value : null;
            processedColumns.add(col);
          }
        }

        result[parentCell] = isEmptyObject(childData) ? r : childData;
      });

      if (mergedCells.length === 0) {
        const headers = jsonData[0] || [];
        const values = jsonData[1] || [];
        headers.forEach((header, index) => {
          if (header && !processedColumns.has(index)) {
            result[header] = values[index] ?? null;
          }
        });
      }

      fs.unlinkSync(req.file.path);
      res.write("File processing completed.\n");

      const jsonString = JSON.stringify(result, null, 2);
      const filePath =
        "C:\\Tronox-UI-Repo\\Tronox-UI-Framework\\test\\Data\\Tronox\\Physicalinventory.json";
      res.write("\n");
      res.write(jsonString);
      res.write("\n");

      fs.writeFile(filePath, jsonString, "utf8", (err) => {
        if (err) {
          res.write(`Error writing to file: ${err.message}\n`);
          return res.end();
        }

        res.write("File successfully written. Starting test execution...\n");

        // Construct the dynamic command using the test name from the frontend
        const testSpecPath = `./test/specs/${testName}.js`;
        const command = `npx wdio run ./wdio.conf.js --spec ${testSpecPath}`;

        res.write(`Executing command: ${command}\n`);

        const testProcess = exec(command);

        testProcess.stdout.on("data", (data) => {
          res.write(`Test Output: ${data}`);
        });

        testProcess.stderr.on("data", (data) => {
          res.write(`Test Error: ${data}`);
        });

        testProcess.on("close", (code) => {
          res.write(`Test execution completed with exit code ${code}.\n`);
          res.end();
        });
      });
    } catch (error) {
      res.write(`Error processing file: ${error.message}\n`);
      res.end();
    }
  }
);

const IMAGE_FOLDER = path.join(__dirname, "screenshots");
const SAVE_FOLDER = path.join(__dirname, "generated-docs");

// Ensure directories exist
if (!fs.existsSync(SAVE_FOLDER)) {
  fs.mkdirSync(SAVE_FOLDER, { recursive: true });
}

app.get("/generate-word", verifyToken, async (req, res) => {
  try {
    const imageFiles = fs
      .readdirSync(IMAGE_FOLDER)
      .filter((file) => /\.(png|jpe?g)$/i.test(file));

    if (imageFiles.length === 0) {
      console.log("❌ No images found in the directory.");
      return res.status(400).send("No images found in the directory.");
    }

    console.log(
      `📸 Found ${imageFiles.length} images, generating Word document...`
    );

    const doc = new Document({
      sections: [
        {
          children: imageFiles.map((file) => {
            const imagePath = path.join(IMAGE_FOLDER, file);
            const imageBuffer = fs.readFileSync(imagePath);

            return new Paragraph({
              children: [
                new ImageRun({
                  data: imageBuffer,
                  transformation: { width: 500, height: 300 },
                }),
              ],
            });
          }),
        },
      ],
    });

    const buffer = await Packer.toBuffer(doc);
    const fileName = `Screenshots_${Date.now()}.docx`;
    const filePath = path.join(SAVE_FOLDER, fileName);

    // Save file correctly
    fs.writeFileSync(filePath, buffer);
    console.log(`✅ Word file saved at: ${filePath}`);

    // Send file for download
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("❌ Error sending file:", err);
        res.status(500).send("Error sending file.");
      } else {
        console.log("📥 File sent for download!");
      }
    });
  } catch (error) {
    console.error("❌ Error generating Word file:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
