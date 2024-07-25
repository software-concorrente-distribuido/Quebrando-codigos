import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = 5000;
const videoUrl = process.env.CLOUDFRONT_URL || '';

app.use(cors());

app.get('/video/:id', async (req: Request, res: Response) => {
  try {
    const range = req.headers.range;

    if (!range) {
      res.status(400).send("Requires Range header");
      return;
    }

    const positions = range.replace(/bytes=/, "").split("-");
    const start = parseInt(positions[0], 10);
    const end = positions[1] ? parseInt(positions[1], 10) : start + (1024 * 1024) - 1; // Default to 1 MB if no end

    const videoId = req.params.id;
    const cloudFrontUrlWithRange = `${videoUrl}/${videoId}`;

    // Fetch the requested range from CloudFront
    const options = {
      headers: {
        'Range': `bytes=${start}-${end}`
      }
    };

    const videoStream = await fetch(cloudFrontUrlWithRange, options);

    if (videoStream.status !== 206) {
      res.status(videoStream.status).send("Error fetching video");
      return;
    }

    // Retrieve headers and handle potential null values
    const contentRange = videoStream.headers.get('Content-Range') || `bytes ${start}-${end}/*`;
    const contentLength = videoStream.headers.get('Content-Length') || `${end - start + 1}`;

    // Set the response headers
    res.writeHead(206, {
      'Content-Range': contentRange,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    });

    // Pipe the video stream to the response
    if (videoStream.body) {
      videoStream.body.pipe(res);
    } else {
      res.status(500).send("Error: Stream body is null");
    }

  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
