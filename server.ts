import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import { GoogleGenAI } from "@google/genai";

interface RecoveryToken {
  otp: string;
  expiresAt: number;
  previewUrl?: string;
}

let recoveryStore: RecoveryToken | null = null;
let _ai: any = null;

function getGeminiClient() {
  if (!_ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Setup API key in Settings > Secrets to unleash active AI.");
    }
    _ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return _ai;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Send Recovery Email
  app.post("/api/recovery/request", async (req, res) => {
    try {
      // 1. Generate dynamic, high-entropy 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = Date.now() + 15 * 60 * 1000; // 15 mins

      // 2. Prepare nodemailer transport using Ethereal Email for direct sandbox use
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      const systemFrom = `"ICEPAB Security" <security@icepab.name.ng>`;
      let previewUrl = "";

      // 3. Send the actual recovery email to the registered address
      const mailOptions = {
        from: systemFrom,
        to: "banmekeifeoluwa@gmail.com",
        subject: "🔒 SECURE SYSTEM RECOVERY PIN - ICEPAB",
        text: `SYSTEM OVERRIDE PIN INITIATED\n\nYour temporary system override pin is: ${otp}\n\nThis pin will expire in 15 minutes.`,
        html: `
          <div style="font-family: monospace; background-color: #0d0e15; color: #ffffff; padding: 40px; border: 1px solid #00e5ff; border-radius: 12px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0, 229, 255, 0.15);">
            <div style="text-align: center; margin-bottom: 30px;">
              <span style="font-size: 24px; color: #00e5ff;">🧬</span>
              <h2 style="color: #00e5ff; text-transform: uppercase; letter-spacing: 0.25em; margin-top: 10px; font-size: 18px;">System Override</h2>
              <p style="color: rgba(255,255,255,0.4); font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em;">Active Security Recovery</p>
            </div>
            <hr style="border: 0; border-top: 1px solid rgba(0, 229, 255, 0.2); margin-bottom: 25px;" />
            <p style="font-size: 12px; line-height: 1.6; color: rgba(255, 255, 255, 0.7); text-transform: uppercase; letter-spacing: 0.05em;">
              A system override authentication request was received. Insert the verification token below into your security terminal interface to unlock root settings.
            </p>
            <div style="background-color: rgba(0, 229, 255, 0.05); padding: 25px 15px; border-radius: 8px; border: 1px dashed rgba(0, 229, 255, 0.3); margin: 30px 0; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: rgba(255,255,255,0.5);">Temporary OTP Code</p>
              <h1 style="margin: 0; color: #00e5ff; font-size: 36px; letter-spacing: 0.25em; font-weight: bold;">${otp}</h1>
            </div>
            <p style="font-size: 10px; color: rgba(255,255,255,0.3); text-align: center; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 25px;">
              Note: Token will terminate and expire in exactly 15 minutes.
            </p>
          </div>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      previewUrl = nodemailer.getTestMessageUrl(info) || "";

      // Store in memory
      recoveryStore = {
        otp,
        expiresAt,
        previewUrl,
      };

      console.log(`[RECOVERY] Secure OTP dispatched. Code: ${otp}`);
      console.log(`[RECOVERY] Ethereal Preview URL: ${previewUrl}`);

      res.json({
        success: true,
        previewUrl: previewUrl || null,
      });
    } catch (error: any) {
      console.error("[RECOVERY_ERROR]", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // API Route: Verify Recovery OTP Code
  app.post("/api/recovery/verify", async (req, res) => {
    try {
      const { otp } = req.body;

      if (!otp) {
        return res.status(400).json({ success: false, error: "OTP value required" });
      }

      if (!recoveryStore) {
        return res.status(400).json({ success: false, error: "No active recovery session found" });
      }

      if (Date.now() > recoveryStore.expiresAt) {
        recoveryStore = null;
        return res.status(400).json({ success: false, error: "Recovery code has expired" });
      }

      if (otp.trim() === recoveryStore.otp) {
        // Reset recovery store on successful verification
        recoveryStore = null;
        return res.json({ success: true, code: "010720" }); // Master code accepted
      } else {
        return res.status(400).json({ success: false, error: "Invalid verification code" });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // API Route: Low-latency streaming Gemini intelligence & image analysis
  app.post("/api/gemini/stream", async (req, res) => {
    try {
      const { prompt, image } = req.body;
      if (!prompt) {
        return res.status(400).json({ success: false, error: "Prompt is required" });
      }

      let aiClient;
      try {
        aiClient = getGeminiClient();
      } catch (keyError: any) {
        return res.status(401).json({ success: false, error: keyError.message });
      }

      // Configure SSE Headers for instant continuous data delivery
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no'); // prevents intermediate buffering for lowest latency

      const parts: any[] = [];

      // Add high-resolution base64 image part if supplied for multi-modal analysis
      if (image) {
        const matches = image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const mimeType = matches[1];
          const base64Data = matches[2];
          parts.push({
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          });
        }
      }

      // Add standard text query prompt
      parts.push({ text: prompt });

      // Run streaming content generation with the multi-modal 'gemini-3.5-flash'
      const responseStream = await aiClient.models.generateContentStream({
        model: "gemini-3.5-flash",
        contents: { parts: parts },
        config: {
          systemInstruction: "You are Clems' IcePab Digital AI assistant, a sleek holographic intelligence embedded directly within Clement IfeOluwa's digital workspace portfolio. Keep responses concise, high-tech, actionable, engaging, and in line with our secure retro cyber-theme."
        }
      });

      for await (const chunk of responseStream) {
        const text = chunk.text;
        if (text) {
          res.write(`data: ${JSON.stringify({ text })}\n\n`);
        }
      }

      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error: any) {
      console.error("[GEMINI_STREAM_ERROR]", error);
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: error.message });
      } else {
        res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
        res.end();
      }
    }
  });

  // Vite integration as middleware context
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
