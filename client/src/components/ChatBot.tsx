import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X } from "lucide-react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm AquaBot. How can I help you learn about water conservation?", isBot: true },
  ]);
  const [input, setInput] = useState("");

  const dummyResponses = [
    "Did you know that taking shorter showers can save up to 150 gallons of water per month?",
    "A great way to conserve water is to fix leaky faucets. A single drip can waste up to 20 gallons per day!",
    "Consider installing water-efficient appliances to reduce your water footprint.",
    "Using a rain barrel can help you collect water for your garden!",
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { text: input, isBot: false },
      { text: dummyResponses[Math.floor(Math.random() * dummyResponses.length)], isBot: true },
    ];
    setMessages(newMessages);
    setInput("");
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 flex flex-col shadow-xl">
      <div className="p-4 bg-ocean-500 text-white flex justify-between items-center rounded-t-lg">
        <h3 className="font-semibold">AquaBot</h3>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] p-2 rounded-lg ${
                message.isBot
                  ? "bg-ocean-100 text-ocean-900"
                  : "bg-ocean-500 text-white"
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatBot;