import express from "express";
import { nanoid } from "nanoid";
import Url from "../models/Url.js";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  try {
let { originalUrl } = req.body;

if (!originalUrl) {
  return res.status(400).json({ error: "URL is required" });
}

if (!/^https?:\/\//i.test(originalUrl)) {
  originalUrl = "https://" + originalUrl;
}

try {
  new URL(originalUrl);
} catch {
  return res.status(400).json({ error: "Invalid URL" });
}


    const MAX_RETRIES = 5;
    let shortId;
    let url;

    for (let i = 0; i < MAX_RETRIES; i++) {
      shortId = nanoid(7);

      try {
        url = await Url.create({ shortId, originalUrl });
        break; // success
      } catch (err) {
        if (err.code !== 11000) throw err; // not duplicate
      }
    }

    if (!url) {
      return res
        .status(500)
        .json({ error: "Could not generate unique short URL" });
    }

    res.status(201).json({
      shortId: url.shortId,
      shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
    });
  } catch (error) {
    console.error("SHORTEN ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:shortId", async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOneAndUpdate(
      { shortId },
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("REDIRECT ERROR:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
