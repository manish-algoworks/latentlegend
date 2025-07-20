# 🧠 Company Insight ChatBot

A simple, elegant React chatbot UI that connects to a backend (like n8n or Node.js server) to fetch AI-based insights and downloadable content based on user prompts.

---

## 🚀 Features

- ✨ React (Functional Components + Hooks)
- 🎨 Tailwind CSS for beautiful and responsive UI
- 🔌 Connects to local API: `http://localhost:5678/webhook/company-insight`
- 🧠 Handles both text-based AI responses and downloadable file links (e.g., PPTX)
- ⬇️ Automatically displays links as clickable downloads
- 🔁 Scrolls to latest message on update

---

## 📁 Folder Structure

chatbot-app/
├── public/
│ └── index.html
├── src/
│ ├── App.jsx
│ └── ChatBot.jsx
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md

yaml
---

## ⚙️ Setup Instructions

### 1. Clone the Project

```bash
git clone https:\\github.comyournamechatbot-app.git
cd chatbot-app
2. Install Dependencies

bash

npm install
3. Start the Dev Server
bash


npm start
Open in browser at httplocalhost3000

🔌 Backend Integration
The app sends user prompts to the following API

bash


POST httplocalhost5678webhookcompany-insight
Example Request
json


{
  prompt Tell me about Algoworks
}
Supported Response Formats
A. AI Text Message
json

{
  message {
    content Algoworks is a global firm specializing in AI and engineering...
  }
}
B. File Download Response
json


{
  fileName generated_ppt.pptx,
  fileLink httpsdocs.google.compresentationdyourfileidedit
}
OR an array

json

[
  {
    fileName generated_ppt.pptx,
    fileLink httpsdocs.google.compresentationdyourfileidedit
  }
]
The UI will automatically render these as clickable download links.

🧩 Customization
Change API URL Modify the fetch() URL in ChatBot.jsx.

Style Tweaks Edit Tailwind classes in ChatBot.jsx for fonts, colors, layout, etc.

Add LoaderTyping Dots Extend bot message logic to simulate typing.

🏗 Build for Production
bash


npm run build
This creates an optimized static build in the build folder.