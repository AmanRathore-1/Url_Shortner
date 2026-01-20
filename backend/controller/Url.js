import { nanoid } from "nanoid";
import Url from "../models/Url.js";

export const createUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    // validate URL
    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({ error: "Invalid URL" });
    }

    // generate unique shortId
    let shortId;
    let exists = true;

    while (exists) {
      shortId = nanoid(7);
      exists = await Url.findOne({ shortId });
    }

    const url = await Url.create({
      originalUrl,
      shortId,
      clicks: 0,
    });

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${url.shortId}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });
    if (!url) {
      return res.status(404).json({ error: "URL not found" });
    }

    url.clicks += 1;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};
