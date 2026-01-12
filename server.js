const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const dangerWords = [
  "urgent", "verify", "click here", "account suspended",
  "free", "reward", "limited time", "password", "bank"
];

const shortUrls = ["bit.ly", "tinyurl", "goo.gl", "t.co"];

app.post("/analyze", (req, res) => {
  const text = req.body.text.toLowerCase();
  let score = 0;
  let reasons = [];

  dangerWords.forEach(word => {
    if (text.includes(word)) {
      score += 10;
      reasons.push(`Suspicious keyword detected: ${word}`);
    }
  });

  shortUrls.forEach(url => {
    if (text.includes(url)) {
      score += 20;
      reasons.push("Shortened URL detected");
    }
  });

  let status = "Safe";
  if (score >= 40) status = "Dangerous";
  else if (score >= 20) status = "Suspicious";

  res.json({ score, status, reasons });
});

app.listen(3000, () => {
  console.log("TrustLens running at http://localhost:3000");
});
