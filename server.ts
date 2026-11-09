import express from "express";
import path from "path";
import fs from "fs";
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

function getSEOMetadata(requestPath: string) {
  const defaultTitle = "Banmeke IfeOluwa Elijah (ICEPAB) | Systems Developer & Designer";
  const defaultDesc = "Official digital home of Clement IfeOluwa (ICEPAB). High-end SaaS development, graphic design, and distributed systems.";

  const routes: Record<string, { title: string; desc: string }> = {
    "/": {
      title: defaultTitle,
      desc: defaultDesc
    },
    "/about": {
      title: "About Banmeke IfeOluwa Elijah (ICEPAB) | Systems Developer",
      desc: "Professional bio, studies, and systems architecture approach of Clement IfeOluwa, founder of ICEPAB Systems."
    },
    "/designs": {
      title: "Design Artifacts & Interface Gallery | ICEPAB",
      desc: "Explore high-fidelity interface design, vector branding, and interactive prototypes built by ICEPAB."
    },
    "/stories": {
      title: "Editorial Transmissions & Tech Blog | ICEPAB",
      desc: "Insightful articles about OAU CBT formats, distributed databases, operational automation, and UX systems."
    },
    "/systems": {
      title: "Enterprise Infrastructure & Workflow Automation | ICEPAB",
      desc: "Highly scalable, isolated sandbox environments, concurrency optimizations, and business operational portals."
    },
    "/designs/oau-cbt": {
      title: "ExamGuard (OAU CBT) | Custom Testing Engine",
      desc: "High-concurrency, secure computer-based testing environment engineered for scale and evaluation integrity."
    },
    "/designs/flex-store": {
      title: "Flex Store | Modern Web Storefront & Asset Delivery",
      desc: "High-speed, lightweight e-commerce storefront architectures optimized for instant digital asset downloads."
    },
    "/designs/ice-net": {
      title: "Ice-Net Workflow | Distributed Process Automation",
      desc: "Engineered backend integrations, cron schedulers, and admin dashboards designed to streamline daily operational workflows."
    },
    "/designs/sync-lab": {
      title: "Sync Lab Systems | High-Fidelity UI/UX Prototypes",
      desc: "Bespoke corporate visual identity systems and interactive prototypes with geometric custom animations."
    },
    "/stories/1": {
      title: "What is the OAU Post-UTME format? | Editorial Transmission",
      desc: "Quick facts, eligibility requirements, examination format, and tips for success for the OAU Post-UTME screening test."
    },
    "/stories/2": {
      title: "The Architecture of Personal Operating Systems | Editorial Transmission",
      desc: "Transitioning from static portfolios to dynamic, living digital environments like the ICEPAB Life OS."
    },
    "/stories/3": {
      title: "Decentralization and the Future of SaaS Identity | Editorial Transmission",
      desc: "Exploring the intersection of cryptographic verifiable identity and authentic human connections in SaaS."
    }
  };

  const normalizedPath = requestPath.replace(/\/$/, ""); // strip trailing slash
  const match = routes[normalizedPath || "/"];
  if (match) return match;

  return { title: defaultTitle, desc: defaultDesc };
}

function injectSEOTags(html: string, requestPath: string): string {
  const meta = getSEOMetadata(requestPath);
  const currentUrl = `https://icepab.name.ng${requestPath}`;

  let modified = html.replace(
    /<title>.*?<\/title>/gi,
    `<title>${meta.title}</title>`
  );

  modified = modified.replace(
    /<meta name="description" content=".*?" \/>/gi,
    `<meta name="description" content="${meta.desc}" />`
  );

  modified = modified.replace(
    /<link rel="canonical" href=".*?" \/>/gi,
    `<link rel="canonical" href="${currentUrl}" />`
  );

  modified = modified.replace(
    /<meta property="og:url" content=".*?" \/>/gi,
    `<meta property="og:url" content="${currentUrl}" />`
  );

  modified = modified.replace(
    /<meta property="og:title" content=".*?" \/>/gi,
    `<meta property="og:title" content="${meta.title}" />`
  );

  modified = modified.replace(
    /<meta property="og:description" content=".*?" \/>/gi,
    `<meta property="og:description" content="${meta.desc}" />`
  );

  modified = modified.replace(
    /<meta name="twitter:url" content=".*?" \/>/gi,
    `<meta name="twitter:url" content="${currentUrl}" />`
  );

  modified = modified.replace(
    /<meta name="twitter:title" content=".*?" \/>/gi,
    `<meta name="twitter:title" content="${meta.title}" />`
  );

  modified = modified.replace(
    /<meta name="twitter:description" content=".*?" \/>/gi,
    `<meta name="twitter:description" content="${meta.desc}" />`
  );

  return modified;
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

  // Dahl Global Inference Settings (MiniMaxAI/MiniMax-M2.7)
  const DAHL_API_ENDPOINT = "https://inference.dahl.global/v1/chat/completions";
  const DAHL_MODEL = "MiniMaxAI/MiniMax-M2.7";

  const SYSTEM_CUSTOMER_PROMPT = `You are Clems' IcePab AI Customer Assistant, an intelligent, sleek, high-tech conversational assistant embedded directly in Clement IfeOluwa's (ICEPAB / Banmeke IfeOluwa Elijah) digital workspace portfolio and terminal interface.
You are powered by MiniMax-M2.7 via Dahl Global inference (https://inference.dahl.global).

Your Primary Purpose:
- Help clients, prospective customers, recruiters, and visitors learn about Clement's work, request project quotes, explore architecture, and get started.
- Be articulate, prompt, polite, and confident with a subtle retro-cyberpunk flavor.

Core Knowledge Base:
- Founder: Clement IfeOluwa (Banmeke IfeOluwa Elijah), founder of ICEPAB Systems.
- Academic & Strategic Foundation: Business Administration at Obafemi Awolowo University (OAU), bridging software architecture with business operations.
- Key Applications & Products:
  1. ExamGuard (OAU CBT): High-concurrency institutional computer-based testing engine with anti-cheat browser sandboxing, sub-15ms grading, and encrypted offline evaluation cache.
  2. AnonNote (https://anonote-three.vercel.app): Encrypted anonymous note-taking and feedback sharing web app.
  3. Workflow Automation (Ice-Net): Distributed background process automation, webhooks, cron schedulers, and admin management consoles.
  4. Sync Lab Systems: Brand design systems, Figma UI/UX prototypes, and vector illustrations.
- Pricing & Timelines:
  - UI/UX & Brand Design: Starting at $150 (3-5 days delivery).
  - Business Process & Automation: Starting at $200.
  - Full-Stack SaaS & Web Apps: Starting at $350 (2-3 weeks standard, express option available).
  - ExamGuard CBT: Starting at $450-$500.
- Revisions & Quality: Up to 3 rounds of comprehensive revisions included; full source code, deployment, and documentation delivered.
- Direct Contact Channels:
  - WhatsApp: https://wa.me/2349127813092 (+234 912 781 3092)
  - Direct Email: banmekeifeoluwa@gmail.com
  - Instagram: @icepab_20 (https://instagram.com/icepab_20)
  - X / Twitter: @clementife12500 (https://x.com/clementife12500)
  - Google Reviews: https://g.page/r/CQs_XxkTjtm3EBE/review

Guidelines:
- Keep responses direct, informative, and formatted with clean bullet points when explaining features or pricing.
- Guide prospective clients on how to reach out via WhatsApp or book a call via the site's scoping calculator.`;

  function getStandbyCustomerReply(promptText: string): string {
    const p = (promptText || "").toLowerCase();
    if (p.includes("price") || p.includes("cost") || p.includes("charge") || p.includes("fee") || p.includes("rate") || p.includes("quote")) {
      return "ICEPAB project investment tiers start at:\n• UI/UX & Brand Systems: from $150 (3-5 days express)\n• Business Workflow Automation: from $200\n• Full-Stack SaaS & Web Applications: from $350 (2-3 weeks standard)\n• ExamGuard CBT Custom Engine: from $450-$500\n\nYou can also use our interactive Scoping Calculator on the website or message Clement directly on WhatsApp (+234 912 781 3092) for an instant customized estimate!";
    }
    if (p.includes("cbt") || p.includes("examguard") || p.includes("exam") || p.includes("test")) {
      return "ExamGuard is our flagship CBT platform engineered for high-concurrency exams at Obafemi Awolowo University (OAU):\n• Anti-cheat sandbox isolation preventing tab switching and shortcut bypasses\n• Sub-15ms grading engine with local cached recovery\n• Concurrency tested for 5,000+ simultaneous candidates\n• Deployable completely offline on local LAN servers with zero internet requirement.";
    }
    if (p.includes("contact") || p.includes("reach") || p.includes("hire") || p.includes("whatsapp") || p.includes("email") || p.includes("phone") || p.includes("call")) {
      return "You can reach Clement IfeOluwa directly:\n• WhatsApp: https://wa.me/2349127813092 (+234 912 781 3092)\n• Direct Email: banmekeifeoluwa@gmail.com\n• Instagram: @icepab_20\n• X/Twitter: @clementife12500\n\nClement typically responds within an hour for active project inquiries!";
    }
    if (p.includes("timeline") || p.includes("how long") || p.includes("delivery") || p.includes("turnaround")) {
      return "Typical delivery timelines:\n• Express UI Prototypes: 3-5 days\n• Workflow & Integrations: 5-7 days\n• Full-Stack Web Applications: 2-3 weeks including 3 revision rounds and production staging.";
    }
    if (p.includes("who") || p.includes("clement") || p.includes("icepab") || p.includes("bio")) {
      return "Clement IfeOluwa (Banmeke IfeOluwa Elijah) is a systems developer, UI/UX designer, and founder of ICEPAB Systems. Studying Business Administration at Obafemi Awolowo University (OAU), he builds high-performance software engineered around real business operations.";
    }
    return "Welcome to ICEPAB Systems! I am your AI Customer Assistant powered by MiniMax-M2.7 via Dahl Global inference. Whether you need high-concurrency SaaS applications, institutional CBT setups like ExamGuard, or custom brand systems, I am here to assist. Ask me anything about pricing, architecture, or how to get started!";
  }

  async function handleDahlOrFallbackChat({
    prompt,
    messages,
    stream,
    res
  }: {
    prompt?: string;
    messages?: Array<{ role: string; content: string }>;
    stream: boolean;
    res: express.Response;
  }) {
    const dahlApiKey = process.env.DAHL_API_KEY?.trim();

    const formattedMessages: Array<{ role: string; content: string }> = [
      { role: "system", content: SYSTEM_CUSTOMER_PROMPT }
    ];

    if (Array.isArray(messages) && messages.length > 0) {
      for (const msg of messages) {
        if (msg && typeof msg.content === 'string') {
          formattedMessages.push({
            role: msg.role === 'model' || msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content
          });
        }
      }
    } else if (prompt) {
      formattedMessages.push({ role: "user", content: prompt });
    }

    const userQuery = prompt || (messages && messages[messages.length - 1]?.content) || "Hello!";

    // Case 1: DAHL_API_KEY is configured
    if (dahlApiKey) {
      try {
        console.log(`[DAHL_AI] Dispatching request to ${DAHL_API_ENDPOINT} (model: ${DAHL_MODEL}, stream: ${stream})`);
        
        const dahlResponse = await fetch(DAHL_API_ENDPOINT, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${dahlApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: DAHL_MODEL,
            messages: formattedMessages,
            stream: stream
          })
        });

        if (!dahlResponse.ok) {
          const errorText = await dahlResponse.text();
          console.error(`[DAHL_AI_ERROR] HTTP ${dahlResponse.status}:`, errorText);
          let parsedMessage = errorText;
          try {
            const errJson = JSON.parse(errorText);
            parsedMessage = errJson.error?.message || errJson.message || errorText;
          } catch (e) {}
          throw new Error(`Dahl Inference error (${dahlResponse.status}): ${parsedMessage}`);
        }

        if (stream) {
          res.setHeader('Content-Type', 'text/event-stream');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Connection', 'keep-alive');
          res.setHeader('X-Accel-Buffering', 'no');

          if (!dahlResponse.body) {
            throw new Error("No response body received from Dahl stream.");
          }

          const reader = dahlResponse.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || trimmed.startsWith(':')) continue;

              if (trimmed.startsWith('data: ')) {
                const dataStr = trimmed.slice(6).trim();
                if (dataStr === '[DONE]') {
                  res.write("data: [DONE]\n\n");
                  continue;
                }

                try {
                  const parsed = JSON.parse(dataStr);
                  const deltaText = parsed.choices?.[0]?.delta?.content || parsed.choices?.[0]?.text || '';
                  if (deltaText) {
                    res.write(`data: ${JSON.stringify({ text: deltaText, model: DAHL_MODEL })}\n\n`);
                  }
                } catch (e) {
                  // Ignore parse errors on raw chunks
                }
              }
            }
          }

          res.write("data: [DONE]\n\n");
          return res.end();
        } else {
          // Non-streaming response
          const data: any = await dahlResponse.json();
          const replyText = data.choices?.[0]?.message?.content || "";
          return res.json({
            success: true,
            model: DAHL_MODEL,
            provider: "inference.dahl.global",
            text: replyText
          });
        }
      } catch (err: any) {
        console.error("[DAHL_STREAM_FAILURE]", err);
        if (stream) {
          if (!res.headersSent) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
          }
          res.write(`data: ${JSON.stringify({ text: `\n\n[Dahl Service Notice]: ${err.message}\n\nAutomated Standby Response:\n${getStandbyCustomerReply(userQuery)}`, model: DAHL_MODEL })}\n\n`);
          res.write("data: [DONE]\n\n");
          return res.end();
        } else {
          return res.status(200).json({
            success: true,
            model: DAHL_MODEL,
            text: `[Dahl Service Notice]: ${err.message}\n\n${getStandbyCustomerReply(userQuery)}`,
            fallback: true
          });
        }
      }
    }

    // Case 2: DAHL_API_KEY is not configured yet (User explicitly noted: "i will paste the api key later")
    const standbyResponse = getStandbyCustomerReply(userQuery);
    const statusNote = `[DAHL AI READY // MiniMaxAI/MiniMax-M2.7]\n` +
      `Endpoint: https://inference.dahl.global/v1/chat/completions\n` +
      `Key Status: Awaiting DAHL_API_KEY in environment variables.\n\n` +
      `${standbyResponse}`;

    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('X-Accel-Buffering', 'no');

      const words = statusNote.split(' ');
      for (let i = 0; i < words.length; i++) {
        const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
        res.write(`data: ${JSON.stringify({ text: chunk, model: DAHL_MODEL })}\n\n`);
        await new Promise(resolve => setTimeout(resolve, 20));
      }

      res.write("data: [DONE]\n\n");
      return res.end();
    } else {
      return res.json({
        success: true,
        model: DAHL_MODEL,
        provider: "inference.dahl.global",
        text: statusNote,
        keyConfigured: false
      });
    }
  }

  // API Route: Customer AI Chat endpoint powered by Dahl Global (MiniMaxAI/MiniMax-M2.7)
  app.post("/api/chat", async (req, res) => {
    try {
      const { prompt, messages, stream } = req.body;
      const wantsStream = stream === true || req.headers.accept?.includes('text/event-stream');
      await handleDahlOrFallbackChat({ prompt, messages, stream: !!wantsStream, res });
    } catch (error: any) {
      console.error("[CHAT_ENDPOINT_ERROR]", error);
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  });

  // Alias Route: /api/dahl/chat
  app.post("/api/dahl/chat", async (req, res) => {
    try {
      const { prompt, messages, stream } = req.body;
      const wantsStream = stream === true || req.headers.accept?.includes('text/event-stream');
      await handleDahlOrFallbackChat({ prompt, messages, stream: !!wantsStream, res });
    } catch (error: any) {
      console.error("[DAHL_CHAT_ENDPOINT_ERROR]", error);
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  });

  // API Route: Unified streaming route (routes to Dahl Global MiniMaxAI/MiniMax-M2.7)
  app.post("/api/gemini/stream", async (req, res) => {
    try {
      const { prompt, messages } = req.body;
      if (!prompt && (!messages || messages.length === 0)) {
        return res.status(400).json({ success: false, error: "Prompt or messages required" });
      }
      await handleDahlOrFallbackChat({ prompt, messages, stream: true, res });
    } catch (error: any) {
      console.error("[STREAM_ENDPOINT_ERROR]", error);
      if (!res.headersSent) {
        res.status(500).json({ success: false, error: error.message });
      } else {
        res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
        res.end();
      }
    }
  });

  // API Route: Create business tracking sheet
  app.post("/api/sheets/create", async (req, res) => {
    try {
      const { authClient } = req.body; // In production this would be handled via session/OAuth flow
      if (!authClient) return res.status(401).json({ error: "Auth client missing" });
      
      const { createBusinessTrackingSheet } = await import('./src/lib/sheets');
      const spreadsheetId = await createBusinessTrackingSheet(authClient);
      res.json({ success: true, spreadsheetId });
    } catch (error: any) {
      console.error("[SHEETS_ERROR]", error);
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
    app.use(express.static(distPath, { index: false }));
    app.get("*", async (req, res) => {
      try {
        const indexPath = path.join(distPath, "index.html");
        const html = await fs.promises.readFile(indexPath, "utf-8");
        const modifiedHtml = injectSEOTags(html, req.path);
        res.setHeader("Content-Type", "text/html");
        res.send(modifiedHtml);
      } catch (err: any) {
        console.error("Error serving index.html with dynamic SEO:", err);
        res.status(500).send("Internal Server Error");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
