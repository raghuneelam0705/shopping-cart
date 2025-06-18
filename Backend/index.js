import express from 'express';
import { pipeline } from '@xenova/transformers';
import bodyParser from 'body-parser';
import fs from 'fs/promises';
import path from 'path';
import { createReadStream } from 'fs';
import {
    GoogleGenAI,
    createUserContent,
    createPartFromUri,
} from "@google/genai";
import multer from 'multer';
import authRoutes  from './Routes/auth.js'; // Adjust the path as necessary
import cors from 'cors';
const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes );
// Middleware to parse JSON bodies for the metadata API
// Middleware to parse URL-encoded bodies (less common for this setup but good practice)
// app.use(express.urlencoded({ extended: true }));
// Upload config
// create application/json parser
// const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
// const urlencodedParser = bodyParser.urlencoded()
// const upload = multer({ storage: multer.memoryStorage(), dest: 'uploads/', limits: { fileSize: 20 * 1024 * 1024 }, });
// app.use('/uploads', express.static('uploads'));
// let model;

// async function loadModel() {
//   model = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
//   console.log('Model loaded');
// }

// loadModel();

// const ai = new GoogleGenAI({ apiKey: "AIzaSyAsnyYig4sa17craTjjBR-NObpwDCyjuko" });
// app.post('/caption', upload.single('image'), async (req, res) => {
//     console.log("requestbody======>", req.file)
//     console.log('Headers:', req.headers['content-type']);
//     try {
//         const uploadedFile = req.file; // Multer puts the file info on req.file
//         const imageBuffer = uploadedFile.buffer; // File data is in req.file.buffer
//         const mimeType = uploadedFile.mimetype;
//         const base64ImageData = Buffer.from(imageBuffer).toString('base64');
//         const response = await ai.models.generateContent({
//             model: "gemini-2.0-flash",
//             contents: [
//                 {
//                     inlineData: {
//                         mimeType: mimeType,
//                         data: base64ImageData,
//                     },
//                 },
//                 { text: "Caption this image." }
//             ],
//         });
//         res.json({ caption: response.text });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to generate caption' });
//     }
// });

// app.post('/captionsWithVariant', async (req, res) => {
// console.log("fgfgfgffgfgfgfg>>>>>>>>>>>>>", req.body)
//     try {
//         const prompt = `Generate 1 sexy caption in english based on the following image description.  Keep each caption concise and engaging. Initial caption: "${req.body.text}" Please provide the captions in a numbered list format.`;
//         const result = await ai.models.generateContent({
//             model: "gemini-2.0-flash",
//             contents: prompt,
//           });
//           console.log("fgfgfgfgfgffgfgfgfgfgf<<<<<<<<<<<<<<<<<<<", result)
//         const generatedText = result.text;

//         const variantCaptions = generatedText.split('\n')
//             .filter(line => line.trim().match(/^\d+\./))
//             .map(line => line.replace(/^\d+\.\s*/, '').trim());

//         // Respond with caption text
//         res.json({ caption: variantCaptions });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to generate caption' });
//     }
// });
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
