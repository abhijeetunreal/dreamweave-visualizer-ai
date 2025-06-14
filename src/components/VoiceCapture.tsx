
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mic, Square, Brain, Loader2 } from 'lucide-react';

interface VoiceCaptureProps {
  onComplete: (data: any) => void;
}

const VoiceCapture = ({ onComplete }: VoiceCaptureProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState('');
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Set up audio analysis for visualization
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateAudioLevel = () => {
        if (analyser) {
          analyser.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
          setAudioLevel(Math.min(100, (average / 255) * 100 * 3));
        }
      };

      setIsRecording(true);
      setRecordingTime(0);
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
        updateAudioLevel();
      }, 100);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          // Simulate processing the audio
          processAudio();
        }
      };

      mediaRecorder.start();
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  };

  const processAudio = () => {
    setIsProcessing(true);
    
    // Simulate AI processing stages
    const processingStages = [
      { message: "Transcribing with Gemini Pro...", duration: 1000 },
      { message: "Extracting emotional fragments...", duration: 1200 },
      { message: "Identifying dream symbols...", duration: 1500 },
      { message: "Analyzing vocal patterns...", duration: 800 },
    ];

    let currentStage = 0;
    const dreamFragments = [
      "purple giraffe",
      "glass elevator",
      "sinking through floor",
      "weightlessness",
      "talking to childhood self",
      "sour-tasting light"
    ];

    const processStage = () => {
      if (currentStage < processingStages.length) {
        setTranscript(processingStages[currentStage].message);
        currentStage++;
        setTimeout(processStage, processingStages[currentStage - 1].duration);
      } else {
        // Simulate final transcription
        const finalTranscript = `I was flying through a ${dreamFragments[0]} world where ${dreamFragments[1]} transported me to a place where I was ${dreamFragments[2]}. The feeling of ${dreamFragments[3]} overwhelmed me as I found myself ${dreamFragments[4]}. Everything had a strange quality, like ${dreamFragments[5]}.`;
        
        setTranscript(finalTranscript);
        
        setTimeout(() => {
          onComplete({
            transcript: finalTranscript,
            fragments: dreamFragments,
            duration: recordingTime / 10,
            emotion: 'curious',
            intensity: 0.7
          });
        }, 2000);
      }
    };

    setTimeout(processStage, 1000);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-white/10 backdrop-blur-sm border-white/20">
        <div className="text-center">
          <Brain className="w-16 h-16 text-purple-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Dream Capture</h2>
          <p className="text-purple-200 mb-8">
            Record your dream within 60 seconds of waking for optimal memory retention
          </p>

          {!isRecording && !isProcessing && (
            <Button
              onClick={startRecording}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Mic className="w-6 h-6 mr-2" />
              Start Recording
            </Button>
          )}

          {isRecording && (
            <div className="space-y-6">
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full border-4 border-red-500 flex items-center justify-center animate-pulse">
                  <Mic className="w-12 h-12 text-red-500" />
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
              </div>
              
              <div className="space-y-4">
                <div className="text-white text-xl font-semibold">
                  {Math.floor(recordingTime / 10)}s
                </div>
                <div className="space-y-2">
                  <div className="text-purple-200 text-sm">Audio Level</div>
                  <Progress value={audioLevel} className="h-2" />
                </div>
              </div>

              <Button
                onClick={stopRecording}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Square className="w-4 h-4 mr-2" />
                Stop Recording
              </Button>
            </div>
          )}

          {isProcessing && (
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2">
                <Loader2 className="w-8 h-8 text-purple-300 animate-spin" />
                <span className="text-white text-xl font-semibold">Processing...</span>
              </div>
              
              <div className="bg-black/20 rounded-lg p-4 text-left">
                <div className="text-purple-300 text-sm mb-2">AI Analysis:</div>
                <div className="text-white font-mono text-sm">
                  {transcript}
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default VoiceCapture;
