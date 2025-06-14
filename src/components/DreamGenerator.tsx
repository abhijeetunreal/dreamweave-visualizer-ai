
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, Palette, Eye, Loader2 } from 'lucide-react';

interface DreamGeneratorProps {
  dreamData: any;
}

const DreamGenerator = ({ dreamData }: DreamGeneratorProps) => {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [generatedScenes, setGeneratedScenes] = useState<string[]>([]);

  const phases = [
    {
      name: "Fragment Processing",
      icon: Brain,
      description: "Parsing dream fragments with Gemini Pro",
      color: "text-purple-400"
    },
    {
      name: "Sensory Extraction",
      icon: Eye,
      description: "Converting abstract concepts to visual tokens",
      color: "text-blue-400"
    },
    {
      name: "Scene Generation",
      icon: Sparkles,
      description: "Creating surreal visuals with Stable Diffusion",
      color: "text-pink-400"
    },
    {
      name: "Reality Synthesis",
      icon: Palette,
      description: "Applying dream physics and non-linear time",
      color: "text-green-400"
    }
  ];

  const dreamScenes = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=entropy&auto=format",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&crop=entropy&auto=format",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop&crop=entropy&auto=format"
  ];

  useEffect(() => {
    const processPhases = async () => {
      for (let i = 0; i < phases.length; i++) {
        setCurrentPhase(i);
        
        // Simulate processing time for each phase
        const duration = 1500 + Math.random() * 1000;
        const steps = 50;
        const stepDuration = duration / steps;
        
        for (let step = 0; step <= steps; step++) {
          await new Promise(resolve => setTimeout(resolve, stepDuration));
          setProgress((i * 25) + (step * 25 / steps));
        }
        
        // Add generated scene after each major phase
        if (i >= 2) {
          setGeneratedScenes(prev => [...prev, dreamScenes[i - 2]]);
        }
      }
    };

    processPhases();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Dream Reconstruction</h2>
          <p className="text-purple-200 text-lg">
            Transforming "{dreamData?.transcript?.substring(0, 50)}..." into visual reality
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white font-semibold">Processing Progress</span>
            <span className="text-purple-300">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3 mb-4" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {phases.map((phase, index) => (
              <div key={index} className={`flex items-center space-x-2 ${index <= currentPhase ? 'opacity-100' : 'opacity-50'}`}>
                <phase.icon className={`w-5 h-5 ${phase.color} ${index === currentPhase ? 'animate-pulse' : ''}`} />
                <span className="text-white text-sm">{phase.name}</span>
                {index === currentPhase && <Loader2 className="w-4 h-4 text-white animate-spin" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Current Phase Details */}
        <Card className="p-6 mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <div className="flex items-center space-x-3 mb-4">
            {React.createElement(phases[currentPhase]?.icon || Brain, { 
              className: `w-8 h-8 ${phases[currentPhase]?.color || 'text-white'} animate-pulse` 
            })}
            <div>
              <h3 className="text-xl font-semibold text-white">{phases[currentPhase]?.name}</h3>
              <p className="text-purple-200">{phases[currentPhase]?.description}</p>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-lg p-4">
            <div className="text-green-400 text-sm font-mono">
              {currentPhase === 0 && "Identifying objects: 'purple giraffe', 'glass elevator'..."}
              {currentPhase === 1 && "Converting 'sour-tasting light' → #FF70FF + texture gradient..."}
              {currentPhase === 2 && "Generating Unreal Engine 6 cinematic still..."}
              {currentPhase === 3 && "Applying non-Newtonian physics, 150° FOV..."}
            </div>
          </div>
        </Card>

        {/* Dream Fragment Tags */}
        <Card className="p-6 mb-8 bg-white/10 backdrop-blur-sm border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Extracted Dream Fragments</h3>
          <div className="flex flex-wrap gap-2">
            {dreamData?.fragments?.map((fragment: string, index: number) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-purple-800/50 text-purple-200 hover:bg-purple-700/50 transition-colors"
              >
                {fragment}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Generated Scenes */}
        {generatedScenes.length > 0 && (
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <h3 className="text-xl font-semibold text-white mb-4">Generated Dream Scenes</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {generatedScenes.map((scene, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={scene} 
                    alt={`Dream scene ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-sm">Scene Variant {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DreamGenerator;
