export default function VideoAlphaTest() {
  const videos = [
    { id: "k1", src: "/assets/vedio/k1.mov", label: "K1 — MOV (ProRes 4444, 83 MB)" },
    { id: "k2", src: "/assets/vedio/k2.mp4", label: "K2 — MP4 (HEVC, 4 MB)" },
    { id: "k3", src: "/assets/vedio/k3.mov", label: "K3 — MOV (H.265, 4 MB)" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#f87171] via-[#3b82f6] to-[#10b981] flex flex-col items-center justify-center px-10">
      <h1 className="text-3xl font-bold text-white mb-10 drop-shadow-md">
        Alpha Channel Safari/Chrome Compatibility Test
      </h1>

      <div className="flex flex-wrap justify-center gap-10">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg flex flex-col items-center"
          >
            <h2 className="text-lg font-semibold text-white mb-4">{video.label}</h2>

            <video
              autoPlay
              loop
              muted
              playsInline
              width="320"
              height="320"
              className="rounded-xl border border-white/30 object-contain bg-transparent"
            >
              <source src={video.src} type='video/mp4; codecs="hvc1"' />
              <source src={video.src} type="video/quicktime" />
              <source src={video.src} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </section>
  );
}
