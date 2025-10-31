# 📅 Today in History A2A Agent

A Mastra-powered Agent-to-Agent (A2A) service that provides historical events and famous birthdays for any given date. Built with TypeScript and following the A2A Protocol specification.

## 🌐 Live Deployment

**Production URL:** `http://stage-three-a2a.mastra.cloud/a2a/agent/eventHistoryAgent`

**GitHub Repository:** [https://github.com/harjibbolar26/hng-stage-three](https://github.com/harjibbolar26/hng-stage-three)

## 🚀 Features

- 📰 Fetches historical events from any date
- 🎂 Retrieves famous birthdays
- 🏷️ Categorizes events (Science, Politics, Art & Culture, Sports, General)
- 🌍 Handles non-English text with transcriptions
- 📝 Returns beautifully formatted markdown responses
- 🔄 Fully A2A Protocol compliant (JSON-RPC 2.0)

## 🛠️ Tech Stack

- **Framework:** [Mastra](https://mastra.ai)
- **Language:** TypeScript
- **Protocol:** A2A Protocol (JSON-RPC 2.0)
- **LLM:** Google Gemini 2.0 Flash
- **Database:** LibSQL (SQLite-based)
- **API:** History Muffin Labs API

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Mastra CLI

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/harjibbolar26/hng-stage-three.git
cd hng-stage-three
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Add your configuration:
```env
GOOGLE_API_KEY=your_google_api_key
PORT=4111
```

4. **Run the development server**
```bash
npm run dev
```

The server will start at `http://localhost:4111`

## 📡 API Usage

### Endpoint

```
POST http://stage-three-a2a.mastra.cloud/a2a/agent/eventHistoryAgent
```

### Request Format

The agent accepts JSON-RPC 2.0 compliant requests:

```json
{
  "jsonrpc": "2.0",
  "id": "request-001",
  "method": "message/send",
  "params": {
    "message": {
      "kind": "message",
      "role": "user",
      "parts": [
        {
          "kind": "text",
          "text": "What happened today in history?"
        }
      ],
      "messageId": "msg-001",
      "taskId": "task-001"
    },
    "configuration": {
      "blocking": true
    }
  }
}
```

### Response Format

```json
{
  "jsonrpc": "2.0",
  "id": "request-001",
  "result": {
    "id": "task-001",
    "contextId": "context-uuid",
    "status": {
      "state": "completed",
      "timestamp": "2025-10-31T00:11:34.498Z",
      "message": {
        "messageId": "msg-uuid",
        "role": "agent",
        "parts": [
          {
            "kind": "text",
            "text": "# 📅 Today in History...\n\n## 🎯 Historical Events\n\n1. **1687** - 🔬 Isaac Newton publishes..."
          }
        ],
        "kind": "message"
      }
    },
    "artifacts": [...],
    "history": [...],
    "kind": "task"
  }
}
```

## 🧪 Testing with cURL

```bash
curl -X POST http://stage-three-a2a.mastra.cloud/a2a/agent/eventHistoryAgent \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": "test-001",
    "method": "message/send",
    "params": {
      "message": {
        "kind": "message",
        "role": "user",
        "parts": [
          {
            "kind": "text",
            "text": "Tell me about today in history"
          }
        ],
        "messageId": "msg-001",
        "taskId": "task-001"
      }
    }
  }'
```

## 🧪 Testing with Postman

1. Create a new POST request
2. Set URL to: `http://stage-three-a2a.mastra.cloud/a2a/agent/eventHistoryAgent`
3. Set Headers:
   - `Content-Type: application/json`
4. Set Body (raw JSON):
```json
{
  "jsonrpc": "2.0",
  "id": "request-001",
  "method": "message/send",
  "params": {
    "message": {
      "kind": "message",
      "role": "user",
      "parts": [
        {
          "kind": "text",
          "text": "What happened today in history?"
        }
      ],
      "messageId": "msg-001",
      "taskId": "task-001"
    }
  }
}
```

## 📁 Project Structure

```
hng-stage-three/
├── src
|   |── mastra/
│   |   ├── index.ts                    # Mastra configuration
│   |   ├── agents/
│   |   │   └── eventHistoryAgent.ts    # Main agent logic
│   |   └── tools/
│   |        └── eventHistoryTool.ts     # History API integration
|   └── routes/
│       └── a2aRouteHandler.ts          # A2A protocol handler
├── README.md
├── .env.example
├── package.json
└── tsconfig.json
```

## 🎯 Agent Behavior

The Event History Agent:

1. **Fetches Data:** Uses the History Muffin Labs API to retrieve historical events and birthdays
2. **Processes Information:** 
   - Selects the first 5 historical events
   - Selects the first 3 famous birthdays
3. **Categorizes Events:** Assigns categories (Science, Politics, Art & Culture, Sports, General)
4. **Formats Output:** Returns clean markdown with emojis for visual appeal
5. **Handles Edge Cases:** Manages missing data, non-English text, and multiple categories

## 🔍 Example Output

```markdown
# 📅 Today in History - October 31

## 🎯 Historical Events

1. **1517** - 🏛️ Martin Luther posts his 95 Theses *(Politics, General)*
2. **1864** - 🏛️ Nevada becomes the 36th U.S. state *(Politics)*
3. **1926** - 🎨 Harry Houdini dies from peritonitis *(Art & Culture)*
4. **1941** - 🔬 Mount Rushmore construction completed *(General)*
5. **1984** - 🏛️ Indira Gandhi assassinated *(Politics)*

## 🎂 Famous Birthdays

1. **1632** - Johannes Vermeer, Dutch painter (d. 1675)
2. **1795** - John Keats, English poet (d. 1821)
3. **1961** - Peter Jackson, New Zealand filmmaker
```

## ⚠️ Error Handling

The agent handles various error scenarios:

- **Invalid JSON-RPC format** → Returns `-32600` error code
- **Agent not found** → Returns `-32602` error code
- **API failures** → Returns `-32603` error code with details
- **Missing parameters** → Returns validation error

## 🚀 Deployment

The project is deployed on Mastra Cloud. To deploy your own instance:

1. **Build the project**
```bash
npm run build
```

2. **Deploy to Mastra Cloud**
```bash
mastra deploy
```

3. **Verify deployment**
```bash
curl -X POST https://your-deployment-url/a2a/agent/eventHistoryAgent \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":"test","method":"message/send","params":{"message":{"kind":"message","role":"user","parts":[{"kind":"text","text":"test"}]}}}'
```

## 📝 Development

### Running Locally

```bash
npm run dev
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Harjibbolar**
- GitHub: [@harjibbolar26](https://github.com/harjibbolar26)

## 🙏 Acknowledgments

- [Mastra Framework](https://mastra.ai)
- [History Muffin Labs API](https://history.muffinlabs.com)
- [A2A Protocol Specification](https://a2a.dev)
- HNG Internship Program

## 📞 Support

For issues, questions, or contributions, please:
- Open an issue on [GitHub](https://github.com/harjibbolar26/hng-stage-three/issues)
- Check the [Mastra Documentation](https://docs.mastra.ai)

---
