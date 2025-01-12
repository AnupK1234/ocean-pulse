import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AiEducator = () => {
  const [currentTip, setCurrentTip] = useState(0);

  const waterTips = [
    {
      title: "Save Water While Brushing",
      content: "Turn off the tap while brushing your teeth. This can save up to 8 gallons of water per day!",
    },
    {
      title: "Efficient Dishwashing",
      content: "Use your dishwasher instead of hand washing. Modern dishwashers typically use less water than washing by hand.",
    },
    {
      title: "Fix Leaky Faucets",
      content: "A dripping faucet can waste up to 20 gallons of water per day. Fix leaks promptly!",
    },
    {
      title: "Smart Garden Watering",
      content: "Water your garden early in the morning or late in the evening to minimize evaporation.",
    },
  ];

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % waterTips.length);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-ocean-800">AquaTeach</h2>
            <p className="text-ocean-600">Your AI Water Conservation Guide</p>
          </div>
        </div>

        <Card className="p-6 mb-8 bg-gradient-to-br from-ocean-50 to-white">
          <h3 className="text-xl font-semibold mb-4 text-ocean-800">{waterTips[currentTip].title}</h3>
          <p className="text-ocean-700 mb-6">{waterTips[currentTip].content}</p>
          <Button onClick={nextTip} className="w-full sm:w-auto">
            Next Tip
          </Button>
        </Card>

        <div className="grid gap-6">
          <Card className="p-6 bg-white">
            <h3 className="text-lg font-semibold mb-3 text-ocean-800">Did You Know?</h3>
            <p className="text-ocean-700">
              The average American family uses more than 300 gallons of water per day at home.
              About 70% of this use occurs indoors.
            </p>
          </Card>

          <Card className="p-6 bg-white">
            <h3 className="text-lg font-semibold mb-3 text-ocean-800">Interactive Learning</h3>
            <p className="text-ocean-700">
              Take our water conservation quiz to test your knowledge and earn badges!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AiEducator;