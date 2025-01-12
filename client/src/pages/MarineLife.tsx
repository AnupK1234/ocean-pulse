import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Image as ImageIcon } from "lucide-react";

const MarineLife = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload here
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageUrl(e.target.result as string);
          setShowInfo(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentify = () => {
    setShowInfo(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-ocean-800">Marine Life Identifier</h2>
        
        <div 
          className={`border-2 border-dashed rounded-lg p-8 mb-6 text-center transition-colors
            ${dragActive ? "border-ocean-500 bg-ocean-50" : "border-gray-300 hover:border-ocean-400"}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 mx-auto mb-4 text-ocean-500" />
          <p className="text-gray-600 mb-2">Drag and drop your image here</p>
          <p className="text-sm text-gray-500 mb-4">or</p>
          <Input
            type="text"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mb-4"
          />
          <Button 
            onClick={handleIdentify}
            className="w-full sm:w-auto"
            disabled={!imageUrl}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Identify Marine Life
          </Button>
        </div>

        {showInfo && (
          <div className="mt-8 space-y-4 bg-ocean-50 p-6 rounded-lg animate-fade-in">
            <h3 className="text-xl font-semibold text-ocean-800">Blue Whale (Balaenoptera musculus)</h3>
            {imageUrl && (
              <img src={imageUrl} alt="Marine life" className="w-full h-64 object-cover rounded-lg mb-4" />
            )}
            <div className="space-y-2 text-ocean-900">
              <p><strong>Habitat:</strong> Found in all of the world's oceans</p>
              <p><strong>Diet:</strong> Mainly krill and small fish</p>
              <p><strong>Conservation Status:</strong> Endangered</p>
              <p><strong>Description:</strong> The blue whale is the largest animal known to have ever existed, reaching lengths of up to 100 feet.</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MarineLife;