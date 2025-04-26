// src/components/StackedPlatformLogos.jsx
import StreamingPlatformLogo from "./StreamingPlatformLogo";

function StackedPlatformLogos({ platforms, maxVisible = 3 }) {
  if (!platforms || platforms.length === 0) return null;

  // Determine how many platforms to show and if we need a "more" indicator
  const visiblePlatforms = platforms.slice(0, maxVisible);
  const remainingCount = platforms.length - maxVisible;
  const showMoreIndicator = remainingCount > 0;

  return (
    <div className="relative h-8 flex items-center">
      {/* Stack of platform logos */}
      <div className="relative flex">
        {visiblePlatforms.map((platform, index) => (
          <div
            key={platform}
            className="absolute rounded-md overflow-hidden shadow-sm"
            style={{
              width: "30px",
              height: "30px",
              left: `${index * 10}px`,
              zIndex: visiblePlatforms.length - index,
              border: "1px solid var(--bsky-border)",
              backgroundColor: "var(--bsky-bg-tertiary)",
            }}
          >
            <StreamingPlatformLogo
              platform={platform}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* "More" indicator */}
      {showMoreIndicator && (
        <div
          className="ml-2 text-xs font-medium rounded-full px-1.5 py-0.5"
          style={{
            marginLeft: `${visiblePlatforms.length * 10 + 22}px`,
            backgroundColor: "var(--bsky-bg-tertiary)",
            color: "var(--bsky-text-muted)",
          }}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

export default StackedPlatformLogos;
