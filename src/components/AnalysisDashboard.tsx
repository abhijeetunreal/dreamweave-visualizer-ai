
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, Eye, TrendingUp, ArrowLeft, Calendar, Clock } from 'lucide-react';

interface AnalysisDashboardProps {
  dreamData: any;
  onBack: () => void;
}

const AnalysisDashboard = ({ dreamData, onBack }: AnalysisDashboardProps) => {
  const archetypes = [
    { name: 'The Explorer', percentage: 87, description: 'Strong desire for freedom and new experiences', color: 'bg-blue-500' },
    { name: 'The Innocent', percentage: 76, description: 'Connection to childhood and pure emotions', color: 'bg-green-500' },
    { name: 'The Magician', percentage: 65, description: 'Transformation and reality-bending themes', color: 'bg-purple-500' },
    { name: 'The Sage', percentage: 43, description: 'Seeking wisdom and understanding', color: 'bg-orange-500' }
  ];

  const insights = [
    {
      title: "Anxiety Release Pattern",
      description: "Your dream about failing exams reflects current job responsibilities anxiety (87% match)",
      icon: Brain,
      type: "psychological"
    },
    {
      title: "Childhood Integration",
      description: "Speaking with your younger self indicates processing past experiences",
      icon: Heart,
      type: "emotional"
    },
    {
      title: "Creative Breakthrough",
      description: "Purple and surreal elements suggest incoming creative period",
      icon: Eye,
      type: "intuitive"
    }
  ];

  const bioMetrics = [
    { label: 'REM Sleep Quality', value: 92, unit: '%' },
    { label: 'Dream Recall Accuracy', value: 78, unit: '%' },
    { label: 'Emotional Intensity', value: 65, unit: '%' },
    { label: 'Symbol Density', value: 84, unit: 'per min' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Dream Analysis</h2>
            <p className="text-purple-200 text-lg">Deep archetypal and psychological insights</p>
          </div>
          <Button onClick={onBack} variant="outline" className="border-white/30 text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Archetypal Analysis */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-purple-300" />
                Jungian Archetypes
              </h3>
              <div className="space-y-4">
                {archetypes.map((archetype, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{archetype.name}</span>
                      <span className="text-purple-300">{archetype.percentage}%</span>
                    </div>
                    <Progress value={archetype.percentage} className="h-3" />
                    <p className="text-purple-200 text-sm">{archetype.description}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Key Insights */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Eye className="w-6 h-6 mr-2 text-pink-300" />
                Key Insights
              </h3>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-4 p-4 bg-black/20 rounded-lg">
                    <insight.icon className="w-6 h-6 text-blue-300 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1">{insight.title}</h4>
                      <p className="text-purple-200 text-sm">{insight.description}</p>
                      <Badge variant="secondary" className="mt-2 bg-purple-800/50 text-purple-200">
                        {insight.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Poetic Summary */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                <Heart className="w-6 h-6 mr-2 text-pink-300" />
                Poetic Distillation
              </h3>
              <div className="bg-black/30 rounded-lg p-6 text-center">
                <div className="text-purple-200 text-lg font-serif italic leading-relaxed">
                  "Purple dreams ascend<br/>
                  Through glass towers of the past—<br/>
                  Child's wisdom returns"
                </div>
                <div className="text-purple-400 text-sm mt-4">
                  — AI-generated haiku from your subconscious
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Bio-feedback */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Bio-feedback
              </h3>
              <div className="space-y-4">
                {bioMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-sm">{metric.label}</span>
                      <span className="text-purple-300 text-sm">{metric.value}{metric.unit}</span>
                    </div>
                    <Progress value={metric.value} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Dream Stats */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Dream Session</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-300" />
                  <span className="text-white text-sm">Today, 6:42 AM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-purple-300" />
                  <span className="text-white text-sm">Duration: {dreamData?.duration || 2.3} minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-purple-300" />
                  <span className="text-white text-sm">Clarity: High</span>
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Recommendations</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <p className="text-blue-200">💡 Consider journaling about childhood memories this week</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <p className="text-green-200">🎨 Your creative energy is high - start that art project!</p>
                </div>
                <div className="p-3 bg-orange-500/20 rounded-lg">
                  <p className="text-orange-200">🧘 Practice meditation to enhance dream recall</p>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Export Report
              </Button>
              <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white/10">
                Schedule Follow-up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDashboard;
