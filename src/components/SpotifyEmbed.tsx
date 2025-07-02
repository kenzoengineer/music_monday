import { linkToEmbedLink } from "../script";

interface SpotifyEmbedProps {
  url?: string;
  id?: string;
}

const SpotifyEmbed = ({ url, id }: SpotifyEmbedProps) => {
  return (
    <iframe
      id={`${id ?? Math.random().toString()}-embed`}
      src={linkToEmbedLink(url ?? "")}
      height={80}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="eager"
    />
  );
};

export default SpotifyEmbed;
