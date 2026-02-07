# 🚀 How to Deploy Smart Project Autopilot

So you want to run your own instance of **Smart Project Autopilot**? Secure, private, and connected to **YOUR** Linear & GitHub?

Follow this 5-minute guide.

## 1. Prerequisites
- A **GitHub Account** (to fork the repo).
- A **Vercel Account** (free) for deployment.
- A **Tambo Account** (at [console.tambo.co](https://console.tambo.co)) for the AI brain.

## 2. Get Your Brain (Tambo API Key)
1.  Log in to [console.tambo.co](https://console.tambo.co).
2.  Create a new Project (name it "My Autopilot").
3.  Go to **Settings** -> **API Keys**.
4.  Copy your `Project Key` (starts with `tam_...`).
5.  **Important:** Keep this tab open! You will need it to connect tools.

## 3. Connect Your Tools (Linear/GitHub)
*This is where the magic happens. By connecting tools here, your app gets access automatically.*

1.  In the Tambo Dashboard, go to **Integrations** (or MCP Servers).
2.  Click **Add Connection**.
3.  Select **Linear** -> Connect -> Authorize.
4.  Select **GitHub** -> Connect -> Authorize.

## 4. Deploy to Vercel
1.  **Fork** this repository to your GitHub.
2.  Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3.  Import your forked repository.
4.  **Environment Variables:**
    - Name: `NEXT_PUBLIC_TAMBO_API_KEY`
    - Value: `[Paste your Key from Step 2]`
5.  Click **Deploy**.

## 5. You're Live! 🚀
Visit your new URL (e.g., `my-autopilot.vercel.app`).
Try asking: *"Show me the Kanban board for my Linear project"*

Because you connected YOUR Linear in Step 3, the AI can see YOUR data immediately. No extra login required.

## 🔧 Troubleshooting
- **AI says "I can't access Linear"**: Go back to Tambo Dashboard and check if the Linear connection says "Active".
- **Issues not loading**: Check the browser console. If you see 404/500, ensure your API Key is correct in Vercel.
