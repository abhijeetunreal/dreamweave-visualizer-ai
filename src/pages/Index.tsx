
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mic, Brain, Sparkles, Eye, Heart, Palette } from 'lucide-react';
import VoiceCapture from '@/components/VoiceCapture';
import DreamGenerator from '@/components/DreamGenerator';
import DreamJournal from '@/components/DreamJournal';
import AnalysisDashboard from '@/components/AnalysisDashboard';

const Index = () => {
  const [currentPhase, setCurrentPhase] = useState<'landing' | 'capture' | 'processing' | 'journal' | 'analysis'>('landing');
  const [dreamData, setDreamData] = useState<any>(null);

  const phases = [
    { id: 'capture', name: 'Capture', icon: Mic, color: 'bg-purple-500' },
    { id: 'processing', name: 'Fragment', icon: Brain, color: 'bg-blue-500' },
    { id: 'generate', name: 'Visualize', icon: Sparkles, color: 'bg-pink-500' },
    { id: 'journal', name: 'Journal', icon: Eye, color: 'bg-green-500' },
    { id: 'analysis', name: 'Analyze', icon: Heart, color: 'bg-orange-500' },
  ];

  const handleDreamCapture = (data: any) => {
    setDreamData(data);
    setCurrentPhase('processing');
    
    // Simulate processing phases
    setTimeout(() => setCurrentPhase('journal'), 3000);
  };

  if (currentPhase === 'capture') {
    return <VoiceCapture onComplete={handleDreamCapture} />;
  }

  if (currentPhase === 'processing') {
    return <DreamGenerator dreamData={dreamData} />;
  }

  if (currentPhase === 'journal') {
    return <DreamJournal dreamData={dreamData} onAnalyze={() => setCurrentPhase('analysis')} />;
  }

  if (currentPhase === 'analysis') {
    return <AnalysisDashboard dreamData={dreamData} onBack={() => setCurrentPhase('landing')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-32 left-40 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-12 h-12 text-purple-300 mr-3" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
              NeuroSync
            </h1>
          </div>
          <p className="text-xl text-purple-200 mb-6 max-w-2xl mx-auto">
            Transform your dreams into interactive visual experiences using cutting-edge AI
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="bg-purple-800/50 text-purple-200">Gemini Pro</Badge>
            <Badge variant="secondary" className="bg-blue-800/50 text-blue-200">Claude 3</Badge>
            <Badge variant="secondary" className="bg-pink-800/50 text-pink-200">Stable Diffusion</Badge>
            <Badge variant="secondary" className="bg-green-800/50 text-green-200">OpenAI Whisper</Badge>
          </div>
        </div>

        {/* Process Flow */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">How It Works</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {phases.map((phase, index) => (
              <div key={phase.id} className="flex items-center">
                <Card className="p-4 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${phase.color} flex items-center justify-center`}>
                      <phase.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white font-semibold">{phase.name}</span>
                  </div>
                </Card>
                {index < phases.length - 1 && (
                  <div className="hidden sm:block w-8 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-2"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
            <Mic className="w-12 h-12 text-purple-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Dream Capture</h3>
            <p className="text-purple-200">Record your dreams within 60 seconds of waking for optimal memory retention</p>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
            <Palette className="w-12 h-12 text-pink-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Visual Generation</h3>
            <p className="text-purple-200">Transform abstract dream fragments into surreal, interactive visual scenes</p>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
            <Eye className="w-12 h-12 text-blue-300 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Deep Analysis</h3>
            <p className="text-purple-200">Decode archetypal patterns and emotional insights from your subconscious</p>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={() => setCurrentPhase('capture')}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Mic className="w-5 h-5 mr-2" />
            Start Your Dream Journey
          </Button>
          <p className="text-purple-300 mt-4 text-sm">
            Best used within 60 seconds of waking up
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
