import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

interface RecoveryToken {
  otp: string;
  expiresAt: number;
  previewUrl?: string;
}

let recoveryStore: RecoveryToken | null = null;

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
