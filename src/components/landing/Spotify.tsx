"use client";
import useSWR from "swr";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import SpotifyIcon from "@/components/svgs/Spotify";
import { FaPlay, FaPause } from "react-icons/fa";
import Container from "../common/Container";
import { toast } from "sonner";

interface SpotifyData {
  isPlaying: boolean;
  album: string;
  albumImageUrl: string;
  artist: string;
  songUrl: string;
  title: string;
  previewUrl: string | null;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Spotify() {
  const { data, error } = useSWR<SpotifyData>("/api/spotify", fetcher, {
    refreshInterval: 5000,
  });

  // State for handling the "Open/Close" interaction
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocalPlaying, setIsLocalPlaying] = useState(false);

  const barsRef = useRef<HTMLDivElement[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);

  // Reset expansion if music stops
  useEffect(() => {
    if (!data?.isPlaying) {
      setIsExpanded(false);
    }
  }, [data?.isPlaying]);

  // Set volume safely
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
    }
  }, [data?.previewUrl]);

  // Stop local music if song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsLocalPlaying(false);
    }
  }, [data?.songUrl]);

  const toggleAudio = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent Link click
    if (!audioRef.current) return;

    if (isLocalPlaying) {
      audioRef.current.pause();
      setIsLocalPlaying(false);
    } else {
      audioRef.current.play();
      setIsLocalPlaying(true);
    }
  };

  // 2. The Logic for the Offline Click
  const handleOnClickOfflineStatus = () => {
    toast("Kunal is currently offline on Spotify");
  };

  // Click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  // GSAP Animation
  useEffect(() => {
    if (data?.isPlaying && isExpanded && barsRef.current.length > 0) {
      gsap.to(barsRef.current, {
        height: () => Math.random() * 20 + 4,
        duration: 0.4,
        ease: "power1.inOut",
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
      });
    } else {
      gsap.killTweensOf(barsRef.current);
      if (barsRef.current.length > 0) {
        gsap.to(barsRef.current, { height: 4, duration: 0.5 });
      }
    }
  }, [data?.isPlaying, isExpanded, data?.previewUrl]);

  if (error) return null;

  return (
    <Container>
      {/* Audio Element (Hidden) */}
      {data?.previewUrl && (
        <audio
          ref={audioRef}
          src={data.previewUrl}
          onEnded={() => setIsLocalPlaying(false)}
        />
      )}

      {/* --- RENDER LOGIC --- */}
      {!data?.isPlaying ? (
        // STATE 1: Offline (Gray Logo) -> Now a Button!
        <button
          onClick={handleOnClickOfflineStatus}
          className="flex cursor-pointer items-center gap-2 p-2 opacity-50 grayscale transition-all duration-300 hover:opacity-100"
        >
          <SpotifyIcon />
        </button>
      ) : (
        // STATE 2: Playing -> Green Spinning Logo
        <div className="relative flex items-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center p-2 transition-transform duration-300 hover:scale-110"
          >
            <div className="animate-[spin_4s_linear_infinite]">
              <span className="cursor-pointer text-[#1DB954]">
                <SpotifyIcon />
              </span>
            </div>
          </button>

          {/* STATE 3: Expanded Popup */}
          {isExpanded && (
            <div
              ref={popupRef}
              className="animate-in fade-in slide-in-from-top-2 absolute top-12 left-[-40px] z-50 duration-200 md:left-0"
            >
              <Link
                href={data.songUrl}
                target="_blank"
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/80 p-3 pr-5 shadow-xl backdrop-blur-md"
              >
                {/* Album Art (Vinyl Style) */}
                <div className="relative h-10 w-10 shrink-0 md:h-12 md:w-12">
                  <img
                    src={data.albumImageUrl}
                    alt={data.album}
                    className={`absolute z-10 h-full w-full rounded-full object-cover ${
                      isLocalPlaying ? "animate-[spin_4s_linear_infinite]" : ""
                    }`}
                  />
                  {/* Vinyl Record Center Hole Effects */}
                  <div className="absolute inset-0 top-[50%] left-[50%] z-20 h-2 w-2 translate-x-[-50%] translate-y-[-50%] rounded-full bg-black md:h-3 md:w-3"></div>
                  <div className="absolute inset-0 top-[50%] left-[50%] z-10 h-4 w-4 translate-x-[-50%] translate-y-[-50%] rounded-full bg-neutral-500/65 md:h-5 md:w-5"></div>
                </div>

                {/* Song Info */}
                <div className="flex max-w-[140px] flex-col overflow-hidden">
                  <span className="truncate text-[10px] leading-tight font-medium text-[#1DB954] underline md:text-sm">
                    {data.title}
                  </span>
                  <span className="truncate text-[10px] text-neutral-400 md:text-xs">
                    {data.artist}
                  </span>
                </div>

                {/* Controls */}
                <div className="ml-2 flex items-center gap-3 border-l border-white/10 pl-3">
                  {data.previewUrl ? (
                    <button
                      onClick={toggleAudio}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#1DB954] hover:text-black"
                    >
                      {isLocalPlaying ? (
                        <FaPause size={10} />
                      ) : (
                        <FaPlay size={10} className="ml-0.5" />
                      )}
                    </button>
                  ) : (
                    <div className="flex h-4 items-end gap-[2px]">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          ref={(el) => {
                            if (el) barsRef.current[i] = el;
                          }}
                          className="h-1 w-1 rounded-t-sm bg-[#1DB954]"
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}
