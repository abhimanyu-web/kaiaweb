import K1 from '../assets/vedio/K1.mov';
import K2 from '../assets/vedio/K2.mp4';
import K3 from '../assets/vedio/K3.mov';

export default function VideoAlphaTest() {
  const videos = [
    { id: "k1", src: K1, type: "video/quicktime", label: "K1 — MOV (ProRes/H.265?)" },
    { id: "k2", src: K2, type: "video/mp4", label: "K2 — MP4 (HEVC?)" },
    { id: "k3", src: K3, type: "video/quicktime", label: "K3 — MOV (H.265)" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#f87171] via-[#3b82f6] to-[#10b981] flex flex-col items-center justify-center px-10">
      <h1 className="text-3xl font-bold text-white mb-10 drop-shadow-md">
        Alpha Channel Safari/Chrome Compatibility Test
      </h1>

      <div className="flex flex-wrap justify-center gap-10">
        {videos.map((v) => (
          <div
            key={v.id}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg flex flex-col items-center"
          >
            <h2 className="text-lg font-semibold text-white mb-4">{v.label}</h2>

            <video
              autoPlay
              loop
              muted
              playsInline
              width="320"
              height="320"
              className="rounded-xl border border-white/30 object-contain bg-transparent"
              onError={(e) => console.log('video load error', v.id, e)}
            >
              <source src={v.src} type={v.type} />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </section>
  );
}
