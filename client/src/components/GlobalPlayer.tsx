import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Volume2,
  VolumeX,
  ExternalLink,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

// Placeholder playlist until MP3s are uploaded
const PLAYLIST = [
  {
    id: 1,
    title: "SoundMaster T - 2 Much Booty",
    artist: "SoundMaster T",
    src: "/audio/2-much-booty.mp3",
    spotifyUrl: "https://open.spotify.com/artist/PLACEHOLDER",
    gain: 0.6, // Mastered louder, so we turn it down to balance
  },
  {
    id: 2,
    title: "Big Ole’ Butt (B.O.B.)",
    artist: "Tonio Armani, Lil Jon, Ying Yang Twins",
    src: "/audio/big-ole-butt.mp3",
    spotifyUrl: "https://open.spotify.com/artist/PLACEHOLDER",
    gain: 1.0, // Mastered quieter, so we leave it at max
  }
];

export function GlobalPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true); // Autoplay on load
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false); // Default shuffle off for ordered playback

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  // Auto-shuffle init on mount
  useEffect(() => {
    if (isShuffle) {
      const randomIdx = Math.floor(Math.random() * PLAYLIST.length);
      setCurrentTrackIndex(randomIdx);
    }
  }, []);

  // Sync state to audio element
  useEffect(() => {
    if (audioRef.current) {
      // Apply the track's specific gain modifier to the overall volume
      const currentGain = currentTrack.gain || 1.0;
      audioRef.current.volume = isMuted ? 0 : volume * currentGain;
      
      if (isPlaying) {
        // We catch the promise rejection if audio fails to play (browsers often block autoplay)
        audioRef.current.play().catch((e) => {
          console.log("Autoplay prevented by browser", e);
          setIsPlaying(false); // Revert to paused if the browser blocked it
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, volume, isMuted, currentTrack]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const playNext = () => {
    if (isShuffle) {
      const nextIdx = Math.floor(Math.random() * PLAYLIST.length);
      setCurrentTrackIndex(nextIdx === currentTrackIndex ? (nextIdx + 1) % PLAYLIST.length : nextIdx);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    }
  };

  const playPrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
  };

  const handleSeek = (value: number[]) => {
    const newPercent = value[0];
    if (audioRef.current) {
      const newTime = (newPercent / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(newPercent);
    }
  };

  const handleVolume = (value: number[]) => {
    const newVol = value[0] / 100;
    setVolume(newVol);
    if (newVol > 0) setIsMuted(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-black/40 backdrop-blur-3xl border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.8)] text-white p-3 sm:p-4 flex flex-col sm:flex-row items-center gap-4">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
      />

      {/* Track Info */}
      <div className="flex-1 w-full flex items-center justify-between sm:justify-start gap-4">
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm truncate">{currentTrack.title}</span>
          </div>
          <span className="text-xs text-white/50 truncate">{currentTrack.artist}</span>
        </div>
        
        {/* Listen on Spotify Button (Mobile friendly) */}
        <a
          href={currentTrack.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#1DB954] hover:text-[#1ed760] transition-colors bg-white/5 hover:bg-white/10 px-2 py-1 rounded"
        >
          Spotify <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Controls */}
      <div className="flex-1 w-full max-w-md flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => setIsShuffle(!isShuffle)}
            className={`transition-colors ${isShuffle ? "text-primary" : "text-white/40 hover:text-white"}`}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          
          <button onClick={playPrevious} className="text-white/70 hover:text-white transition-colors">
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          <button
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-1" />
            )}
          </button>

          <button onClick={playNext} className="text-white/70 hover:text-white transition-colors">
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full flex items-center gap-2 group">
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />
        </div>
      </div>

      {/* Volume (Hidden on small mobile) */}
      <div className="flex-1 hidden sm:flex items-center justify-end gap-3 min-w-[120px]">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="text-white/70 hover:text-white transition-colors"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
        <div className="w-24">
          <Slider
            value={[isMuted ? 0 : volume * 100]}
            max={100}
            step={1}
            onValueChange={handleVolume}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
