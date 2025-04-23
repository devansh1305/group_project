// src/components/StreamingPlatformLogo.jsx

function StreamingPlatformLogo({ platform, className = "" }) {
  const logos = {
    // Maps platform names to their logo URLs and brand colors
    "Netflix": {
      url: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png",
      bgColor: "bg-black",
      textColor: "text-red-600"
    },
    "Disney+": {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
      bgColor: "bg-blue-900",
      textColor: "text-white"
    },
    "Prime Video": {
      url: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png",
      bgColor: "bg-gray-900",
      textColor: "text-blue-400"
    },
    "Hulu": {
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Hulu_Logo.svg",
      bgColor: "bg-green-700",
      textColor: "text-white"
    },
    "HBO Max": {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg",
      bgColor: "bg-purple-900",
      textColor: "text-white"
    },
    "Apple TV": {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Apple_TV_Plus_Logo.svg",
      bgColor: "bg-black",
      textColor: "text-white"
    },
    "Paramount+": {
      url: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Paramount_Plus.svg",
      bgColor: "bg-blue-800",
      textColor: "text-white"
    },
    "Peacock": {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/d3/NBCUniversal_Peacock_Logo.svg",
      bgColor: "bg-gradient-to-r from-purple-600 to-blue-500",
      textColor: "text-white"
    },
    "Showtime": {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/22/Showtime.svg",
      bgColor: "bg-red-700",
      textColor: "text-white"
    }
  };

  // Fallback if no logo is available for this platform
  if (!logos[platform]) {
    return (
      <div className={`rounded-lg flex items-center justify-center bg-gray-100 ${className}`}>
        <span className="font-medium text-sm">{platform}</span>
      </div>
    );
  }

  const { url, bgColor, textColor } = logos[platform];

  return (
    <div className={`rounded-lg flex flex-col items-center justify-center p-2 ${bgColor} ${className}`}>
      <div className="relative w-full h-full">
        <img 
          src={url} 
          alt={`${platform} logo`} 
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
      </div>
      {/* Only show platform name for larger/square logos, not in movie detail compact view */}
      {className.includes('aspect-square') && (
        <span className={`text-xs font-medium mt-1 ${textColor}`}>{platform}</span>
      )}
    </div>
  );
}

export default StreamingPlatformLogo;