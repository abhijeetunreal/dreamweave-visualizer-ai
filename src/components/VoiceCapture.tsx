import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mic, Square, Brain, Loader2 } from 'lucide-react';
import { toast } from "sonner";

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

  const processAudio = async () => {
    setIsProcessing(true);
    setTranscript("Initializing AI dream analysis...");

    const apiKey = localStorage.getItem("gemini_api_key");
    if (!apiKey) {
      toast.error("Gemini API Key not found. Please set it on the homepage.");
      setIsProcessing(false);
      setTranscript("Error: API Key is missing.");
      return;
    }

    setTranscript("Simulating transcription...");
    
    // For now, we'll use a mock transcript. The next step would be to implement speech-to-text.
    const mockTranscript = `I was flying through a purple giraffe world where a glass elevator transported me to a place where I was sinking through the floor. The feeling of weightlessness overwhelmed me as I found myself talking to my childhood self. Everything had a strange quality, like a sour-tasting light.`;
    
    setTranscript("Extracting dream fragments with Gemini...");

    try {
      const prompt = `You are a dream analysis AI. Your task is to extract key fragments from a dream description. These fragments should be short (2-5 words) and represent key objects, actions, feelings, or surreal concepts. Return the fragments as a JSON array of strings. Do not include anything else in your response, just the JSON array.

Dream description:
"${mockTranscript}"`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to communicate with Gemini API.");
      }

      const data = await response.json();
      const fragments = data.candidates[0].content.parts[0].text;
      
      setTranscript(`Analysis complete. Reconstructing dream...`);

      setTimeout(() => {
        onComplete({
          transcript: mockTranscript,
          fragments: fragments,
          duration: recordingTime / 10,
          emotion: 'curious',
          intensity: 0.7
        });
      }, 1500);

    } catch (error) {
      console.error("Error processing with Gemini:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast.error(`Gemini Processing Failed: ${errorMessage}`);
      setIsProcessing(false);
      setTranscript(`Error: ${errorMessage}. Please check your API key and try again.`);
    }
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
