<img width="1647" alt="thumbnail" loading="lazy" src="https://github.com/user-attachments/assets/7b0f279a-8771-42a0-b8b6-128b3b1a076c" />

[![MCP Supported](https://img.shields.io/badge/MCP-Supported-00c853)](https://modelcontextprotocol.io/introduction)
[![Local First](https://img.shields.io/badge/Local-First-blue)](https://localfirstweb.dev/)
[![Discord](https://img.shields.io/discord/1374047276074537103?label=Discord&logo=discord&color=5865F2)](https://discord.gg/gCRu69Upnp)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cgoinglove/better-chatbot&env=BETTER_AUTH_SECRET&env=OPENAI_API_KEY&env=GOOGLE_GENERATIVE_AI_API_KEY&env=ANTHROPIC_API_KEY&envDescription=Learn+more+about+how+to+get+the+API+Keys+for+the+application&envLink=https://github.com/cgoinglove/better-chatbot/blob/main/.env.example&demo-title=better-chatbot&demo-description=An+Open-Source+Chatbot+Template+Built+With+Next.js+and+the+AI+SDK+by+Vercel.&products=[{"type":"integration","protocol":"storage","productSlug":"neon","integrationSlug":"neon"}])

This UI app work with several LLMS and MCP servers (configure through .env), including the [Confidential MCP Server Tools](https://github.com/amany9000/confidential-mcp-server).

### Quick Start 🚀

```bash
# 1. Clone the repository
git clone https://github.com/cgoinglove/better-chatbot.git
cd better-chatbot

# 2. (Optional) Install pnpm if you don't have it
npm install -g pnpm

# 3. Install dependencies
pnpm i

# 4. Create the environment variable file and fill in your .env values
pnpm initial:env # This runs automatically in postinstall, so you can usually skip it.

# 5. (Optional) If you already have PostgreSQL running and .env is configured, skip this step
pnpm docker:pg

# 6. Run database migrations
pnpm db:migrate

# 7. Start the development server
pnpm dev

# 8. (Optional) Build & start for local production-like testing
pnpm build:local && pnpm start
# Use build:local for local start to ensure correct cookie settings
```

> **⚠️ Important:** When updating to a new version of the project (after `git pull`), always run `pnpm db:migrate` to ensure your database schema is up to date.

Open [http://localhost:3000](http://localhost:3000) in your browser to get started.
