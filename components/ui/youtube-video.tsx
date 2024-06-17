export default function YouTubeVideo({ src }: { src: string }) {
  return (
    <iframe
      src={src}
      className="w-full aspect-video mb-4"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
}
