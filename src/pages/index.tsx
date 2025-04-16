import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import dynamic from "next/dynamic";

// Dynamically import the MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import("../components/MainMap"), {
  ssr: false,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <MapComponent />
    </div>
  );
}
