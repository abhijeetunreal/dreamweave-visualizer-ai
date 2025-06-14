
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Heart, Brain, Palette, RotateCcw, Share, ArrowRight } from 'lucide-react';

interface DreamJournalProps {
  dreamData: any;
  onAnalyze: () => void;
}

const DreamJournal = ({ dreamData, onAnalyze }: DreamJournalProps) => {
  const [emotionIntensity, setEmotionIntensity] = useState([70]);
  const [selectedScene, setSelectedScene] = useState(0);
  const [currentFilter, setCurrentFilter] = useState('original');

  const dreamScenes = [
    {
      url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=entropy&auto=format",
      title: "The Glass Elevator",
      description: "Floating through a crystalline structure with purple giraffes"
    },
    {
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&crop=entropy&auto=format", 
      title: "Weightless Conversation",
      description: "Speaking with your childhood self in a gravity-defying space"
    },
    {
      url: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop&crop=entropy&auto=format",
      title: "Sour Light Spectrum",
      description: "A world where light has taste and colors have texture"
    }
  ];

  const emotionFilters = [
    { name: 'Original', filter: 'original', color: 'bg-gray-500' },
    { name: 'Euphoric', filter: 'hue-rotate-60', color: 'bg-yellow-500' },
    { name: 'Melancholic', filter: 'hue-rotate-240 saturate-50', color: 'bg-blue-500' },
    { name: 'Anxious', filter: 'contrast-150 saturate-200', color: 'bg-red-500' },
    { name: 'Serene', filter: 'hue-rotate-120 saturate-75', color: 'bg-green-500' }
  ];

  const symbols = [
    { name: 'Flying', meaning: 'Freedom, escape from limitations', frequency: 89 },
    { name: 'Childhood Self', meaning: 'Reflection, nostalgia, inner child', frequency: 76 },
    { name: 'Purple', meaning: 'Mysticism, transformation, royalty', frequency: 84 },
    { name: 'Glass', meaning: 'Transparency, fragility, clarity', frequency: 62 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Interactive Dream Journal</h2>
          <p className="text-purple-200 text-lg">
            Explore and modify your dream's emotional landscape
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Dream Scene */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                {dreamScenes[selectedScene]?.title}
              </h3>
              
              <div className="relative mb-4">
                <img 
                  src={dreamScenes[selectedScene]?.url}
                  alt={dreamScenes[selectedScene]?.title}
                  className={`w-full h-80 object-cover rounded-lg transition-all duration-500 ${
                    currentFilter !== 'original' ? `filter ${currentFilter}` : ''
                  }`}
                  style={{
                    filter: currentFilter === 'original' ? 'none' : undefined
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm">
                    {dreamScenes[selectedScene]?.description}
                  </p>
                </div>
              </div>

              {/* Emotion Controls */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-semibold">Emotion Intensity</span>
                    <span className="text-purple-300">{emotionIntensity[0]}%</span>
                  </div>
                  <Slider
                    value={emotionIntensity}
                    onValueChange={setEmotionIntensity}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <span className="text-white font-semibold mb-2 block">Emotional Filter</span>
                  <div className="flex flex-wrap gap-2">
                    {emotionFilters.map((filter) => (
                      <Button
                        key={filter.name}
                        variant={currentFilter === filter.filter ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentFilter(filter.filter)}
                        className={`${filter.color} ${
                          currentFilter === filter.filter 
                            ? 'text-white' 
                            : 'border-white/30 text-white hover:bg-white/10'
                        }`}
                      >
                        {filter.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Scene Variants */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Scene Variants</h3>
              <div className="grid grid-cols-3 gap-4">
                {dreamScenes.map((scene, index) => (
                  <div 
                    key={index}
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedScene === index ? 'ring-2 ring-purple-400 scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => setSelectedScene(index)}
                  >
                    <img 
                      src={scene.url}
                      alt={scene.title}
                      className="w-full h-24 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-1 left-1 right-1">
                      <span className="text-white text-xs font-semibold">{scene.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Analysis Panel */}
          <div className="space-y-6">
            {/* Dream Transcript */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Brain className="w-5 h-5 mr-2" />
                Original Dream
              </h3>
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-purple-200 text-sm font-mono leading-relaxed">
                  {dreamData?.transcript}
                </p>
              </div>
            </Card>

            {/* Symbol Analysis */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Symbol Analysis
              </h3>
              <div className="space-y-3">
                {symbols.map((symbol, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{symbol.name}</span>
                      <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">
                        {symbol.frequency}%
                      </Badge>
                    </div>
                    <p className="text-purple-300 text-sm">{symbol.meaning}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                onClick={onAnalyze}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Heart className="w-4 h-4 mr-2" />
                Deep Analysis
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DreamJournal;
