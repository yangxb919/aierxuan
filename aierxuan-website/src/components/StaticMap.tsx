'use client';

interface StaticMapProps {
  className?: string;
  center?: { lat: number; lng: number };
  address?: string;
  title?: string;
}

export default function StaticMap({
  className = 'w-full h-96',
  center = { lat: 22.6589, lng: 114.2188 },
  address = 'Juyin Science and Technology Industrial Park, Jihua Street, Longgang District, Shenzhen, China',
  title = 'AIERXUAN Office Location',
}: StaticMapProps) {
  // Google Maps Static API URL (doesn't require API key for basic usage)
  // Or use OpenStreetMap embed
  const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${center.lng - 0.01},${center.lat - 0.01},${center.lng + 0.01},${center.lat + 0.01}&layer=mapnik&marker=${center.lat},${center.lng}`;

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;

  return (
    <div className={className}>
      <div className="w-full h-full rounded-lg overflow-hidden shadow-lg relative">
        {/* OpenStreetMap Embed */}
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          src={openStreetMapUrl}
          title={title}
          className="border-0"
        />

        {/* Overlay with info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="text-white">
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-white/90 mb-2">{address}</p>
            <a
              href={googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
