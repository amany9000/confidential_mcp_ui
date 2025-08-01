[![MCP Supported](https://img.shields.io/badge/MCP-Supported-00c853)](https://modelcontextprotocol.io/introduction)
[![Local First](https://img.shields.io/badge/Local-First-blue)](https://localfirstweb.dev/)
[![Discord](https://img.shields.io/discord/1374047276074537103?label=Discord&logo=discord&color=5865F2)](https://discord.gg/gCRu69Upnp)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cgoinglove/better-chatbot&env=BETTER_AUTH_SECRET&env=OPENAI_API_KEY&env=GOOGLE_GENERATIVE_AI_API_KEY&env=ANTHROPIC_API_KEY&envDescription=Learn+more+about+how+to+get+the+API+Keys+for+the+application&envLink=https://github.com/cgoinglove/better-chatbot/blob/main/.env.example&demo-title=better-chatbot&demo-description=An+Open-Source+Chatbot+Template+Built+With+Next.js+and+the+AI+SDK+by+Vercel.&products=[{"type":"integration","protocol":"storage","productSlug":"neon","integrationSlug":"neon"}])

This UI app work with several LLMS and MCP servers (configure through .env), including the [QLOO Confidential MPC Toolset](https://github.com/ckagrawal89/qloo_confidential_mcp_server).

### Quick Start 🚀

Setup API Keys/URL in `.env`. `./.env.example` is provided for reference.

```bash
# 1. Clone the repository
git clone https://github.com/cgoinglove/better-chatbot.git
cd better-chatbot

# 2. Install dependencies
pnpm i

# 3. Start the development server
pnpm dev

# 4. (Optional) Build & start for local production-like testing
pnpm build:local && pnpm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to get started.
