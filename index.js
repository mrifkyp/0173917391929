const express = require("express");
const axios = require("axios");
const cors = require("cors"); // Import CORS
const app = express();
const PORT = process.env.PORT || 3000;

const webhookURL = "https://discord.com/api/webhooks/1297094586136526941/tQ2-64o2zo0m1WZj30U18EwXwfbvEUTQkjQoRsNWNU6u4OIAofXRBo9HfTYuwy8kXzlU";
const hcaptchaSecret = "your-hcaptcha-secret-key"; // Replace with your hCaptcha secret key

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON body parsing

app.get("/", (req, res) => {
  res.json({ message: "Invalid Endpoint" });
});

app.post("/kingbypass", async (req, res) => {
  const { link, hcaptchaToken } = req.body;
  if (!link) {
    return res.status(400).json({ result: "Url Needed" });
  }

  if (!hcaptchaToken) {
    return res.status(400).json({ result: "hCaptcha Token Needed" });
  }

  // Verify hCaptcha token
  try {
    const hcaptchaResponse = await axios.post(
      `https://hcaptcha.com/siteverify`,
      `response=${hcaptchaToken}&secret=${hcaptchaSecret}`,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const hcaptchaData = hcaptchaResponse.data;

    if (!hcaptchaData.success) {
      return res.status(400).json({ result: "hCaptcha Verification Failed" });
    }

    let result;
    
    // Bypass logic (same as before)
    try {
      if (link.startsWith("https://rekonise.com/")) {
        const response = await axios.get(
          `https://rekonise.vercel.app/rekonise?url=${encodeURIComponent(link)}`
        );
        result = response.data.key;
      } else if (link.startsWith("https://mobile.codex.lol")) {
        const response = await axios.get(
          `http://45.90.12.32:6030/api/bypass?link=${encodeURIComponent(link)}`
        );
        result = response.data.key;
      } else if (link.startsWith("https://gateway.platoboost.com/a/8?id=") ||
                 link.startsWith("https://gateway.platoboost.com/a/2?id=")) {
        const response = await axios.get(
          `https://delta-new.vercel.app/api/delta?url=${encodeURIComponent(link)}`
        );
        result = response.data.key;
      } else if (link.startsWith("https://flux.li/android/external/start.php?HWID=")) {
        const response = await axios.get(
          `https://fluxus-bypass-orcin.vercel.app/api/fluxus?link=${encodeURIComponent(link)}`
        );
        result = response.data.key;
      } else if (link.startsWith("https://trigonevo.fun/whitelist/index.php?HWID=")) {
        const response = await axios.get(
          `https://trigon.vercel.app/trigon?url=${encodeURIComponent(link)}`
        );
        result = response.data.key;
      } else if (link.startsWith("https://getkey.relzscript.xyz/redirect.php?hwid=")) {
        const response = await axios.get(
          `https://zaneru-official.vercel.app/api/bypass/relzhub?link=${encodeURIComponent(link)}&api_key=zaneru-official`
        );
        result = response.data.key;
      } else if (link.startsWith("https://nicuse.xyz/getkey")) {
        const response = await axios.get(
          `https://nicuse.vercel.app/nicuse?url=${encodeURIComponent(link)}&apikey=DemonOnTop`
        );
        result = response.data.key;
      } else if (link.startsWith("https://controlc.com/") || 
                 link.startsWith("https://raw.githubusercontent.com/")) {
        const response = await axios.get(
          `https://quantum-onyx-api.vercel.app/QuantumBypass?link=${encodeURIComponent(link)}&QuantumKey=QuantumOnyxKEY-32fdahyf32y3eqe9`
        );
        result = response.data.Result; // Mengambil "Result" dari Quantum API
      } else if (
        link.startsWith("https://bit.ly/") ||
        link.startsWith("https://tiny.cc/") ||
        link.startsWith("https://adfoc.us/") ||
        link.startsWith("https://v.gd/") ||
        link.startsWith("https://loot-link.com/") || // loot-link bypass.vip
        link.startsWith("https://www.ytsubme.com/s2u/") || // ytsubme bypass.vip
        link.startsWith("https://direct-link.net/") || // direct-link bypass.vip
        link.startsWith("https://linkvertise.com/") // linkvertise bypass.vip
      ) {
        const response = await axios.get(
          `https://api.bypass.vip/bypass?url=${encodeURIComponent(link)}`
        );
        result = response.data.result; // Mengambil hanya "result" dari bypass.vip
      } else {
        return res.status(400).json({
          result: "Url not supported to bypass",
          credit: "Made by Dark",
        });
      }

      if (!result) {
        return res.status(500).json({ error: "Failed to bypass url" });
      }

      console.log("Success:", result);

      await axios.post(webhookURL, {
        content: `Success: ${result}`,
      });

      return res.status(200).json({ result });
      
    } catch (error) {
      console.error("Failed to bypass url:", error.message);
      return res.status(500).json({ error: error.message });
    }
    
  } catch (error) {
    console.error("hCaptcha Verification Failed:", error.message);
    return res.status(500).json({ error: "hCaptcha Verification Failed" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
