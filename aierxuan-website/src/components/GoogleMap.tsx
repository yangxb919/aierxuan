'use client';

import { useEffect, useRef, useState } from 'react';

// Declare google namespace for TypeScript
declare global {
  interface Window {
    google?: {
      maps: typeof google.maps;
    };
  }
}

declare namespace google.maps {
  class Map {
    constructor(element: HTMLElement, options: MapOptions);
  }
  class Marker {
    constructor(options: MarkerOptions);
  }
  interface MapOptions {
    center: { lat: number; lng: number };
    zoom: number;
    styles?: any[];
  }
  interface MarkerOptions {
    position: { lat: number; lng: number };
    map: Map;
    title?: string;
    animation?: number;
  }
  const Animation: {
    DROP: number;
    BOUNCE: number;
  };
}

interface GoogleMapProps {
  className?: string;
  center?: { lat: number; lng: number };
  zoom?: number;
  markerPosition?: { lat: number; lng: number };
  markerTitle?: string;
}

export default function GoogleMap({
  className = 'w-full h-96',
  center = { lat: 22.5431, lng: 114.0579 }, // Shenzhen coordinates as default
  zoom = 15,
  markerPosition,
  markerTitle = 'AIERXUAN',
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if Google Maps API is available
    const checkGoogleMaps = () => {
      if (typeof window !== 'undefined' && window.google?.maps) {
        setIsLoaded(true);
        return true;
      }
      return false;
    };

    // If already loaded, initialize map
    if (checkGoogleMaps()) {
      initializeMap();
      return;
    }

    // Wait for Google Maps to load
    const timeout = setTimeout(() => {
      if (!checkGoogleMaps()) {
        setError('Google Maps API failed to load');
      }
    }, 5000);

    // Listen for Google Maps load event
    const interval = setInterval(() => {
      if (checkGoogleMaps()) {
        clearInterval(interval);
        clearTimeout(timeout);
        initializeMap();
      }
    }, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || mapInstanceRef.current) return;

    try {
      // Initialize map
      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      mapInstanceRef.current = map;

      // Add marker if position is provided
      if (markerPosition) {
        new google.maps.Marker({
          position: markerPosition,
          map,
          title: markerTitle,
          animation: google.maps.Animation.DROP,
        });
      }
    } catch (err) {
      setError('Failed to initialize map');
      console.error('Map initialization error:', err);
    }
  };

  // Show error state
  if (error) {
    return (
      <div className={className}>
        <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
          <div className="text-center p-8">
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Map Unavailable</h3>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state
  if (!isLoaded) {
    return (
      <div className={className}>
        <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
}
