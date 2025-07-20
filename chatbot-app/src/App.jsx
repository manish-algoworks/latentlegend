import React, { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const botMessage = { role: "bot", content: "..." };
    setMessages((prev) => [...prev, botMessage]);

    try {
      const response = await fetch("http://localhost:5678/webhook/company-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const result = await response.json();

      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", content: JSON.stringify(result) },
      ]);
    } catch (err) {
      console.error("Fetch error:", err);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "bot", content: "Error getting response." },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-white py-10 px-4">
      <div className="max-w-8xl mx-auto shadow-xl bg-white rounded-2xl p-6 border border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">
          Company Insight ChatBot
        </h1>

        <div className="h-[500px] overflow-y-auto space-y-4 mb-4 p-4 border rounded-lg bg-slate-50">
          {messages.map((msg, idx) => {
  const content = (() => {
    try {
      const parsed = JSON.parse(msg.content);

      if (parsed.fileName && parsed.fileLink) {
        return (
          <a
            href={parsed.fileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-semibold"
          >
            📎 {parsed.fileName}
          </a>
        );
      }

      if (Array.isArray(parsed) && parsed[0]?.fileName && parsed[0]?.fileLink) {
        return (
          <a
            href={parsed[0].fileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline font-semibold"
          >
            📎 {parsed[0].fileName}
          </a>
        );
      }

      // <--- THIS IS THE PART YOU NEED!
      if (parsed.message) {
        return parsed.message;
      }

      return msg.content;
    } catch {
      return msg.content;
    }
  })();

  return (
    <div
      key={idx}
      className={`whitespace-pre-wrap p-4 rounded-xl max-w-[90%] leading-relaxed shadow-sm ${
        msg.role === "user"
          ? "ml-auto bg-blue-100 text-right text-blue-900"
          : "mr-auto bg-green-50 text-left text-gray-800"
      }`}
    >
      {content}
    </div>
  );
})}
          <div ref={messagesEndRef} />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            className="flex-1 border rounded-xl p-3 text-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
