export default function MedicalWaveBackground() {
  return (
    <div className="medical-bg-fixed" aria-hidden="true">
      <svg
        className="medical-bg-svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d0e2fa" stopOpacity="0.4" />
          </linearGradient>

          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2edff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#b8d3f8" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="waveGrad3" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c6dbfc" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        <path fill="url(#waveGrad1)" opacity="0.4" d="M 1920 0 L 800 0 C 1200 150 1500 50 1920 200 Z" />
        <path fill="url(#waveGrad2)" opacity="0.5" d="M 1920 50 C 1600 80 1300 180 900 0 L 1920 0 Z" />
        <path fill="url(#waveGrad3)" opacity="0.3" d="M 1920 150 C 1500 250 1200 150 1000 0 L 1920 0 Z" />
        <path fill="#e2eeff" opacity="0.4" d="M 1920 250 C 1600 200 1400 300 1100 0 L 1920 0 Z" />

        <path fill="url(#waveGrad1)" opacity="0.6" d="M 0 350 C 500 450 1000 150 1920 300 L 1920 1080 L 0 1080 Z" />
        <path fill="url(#waveGrad2)" opacity="0.5" d="M 0 450 C 400 350 900 550 1920 200 L 1920 1080 L 0 1080 Z" />
        <path fill="#e8f1ff" opacity="0.5" d="M -100 200 C 400 300 800 100 1920 350 L 1920 1080 L -100 1080 Z" />

        <path fill="url(#waveGrad3)" opacity="0.7" d="M 0 600 C 600 500 1100 750 1920 400 L 1920 1080 L 0 1080 Z" />
        <path fill="url(#waveGrad1)" opacity="0.5" d="M 0 650 C 450 750 1200 450 1920 550 L 1920 1080 L 0 1080 Z" />
        <path fill="#dce8fa" opacity="0.4" d="M 0 500 C 500 600 1000 450 1920 650 L 1920 1080 L 0 1080 Z" />

        <path fill="#f0f6ff" opacity="0.8" d="M 0 800 C 500 700 1200 900 1920 650 L 1920 1080 L 0 1080 Z" />
        <path fill="#e4efff" opacity="0.6" d="M 0 850 C 600 950 1300 750 1920 850 L 1920 1080 L 0 1080 Z" />
        <path fill="url(#waveGrad2)" opacity="0.5" d="M 0 950 C 700 850 1400 1050 1920 900 L 1920 1080 L 0 1080 Z" />
        <path fill="#ffffff" opacity="0.3" d="M 0 1000 C 800 1050 1500 950 1920 1050 L 1920 1080 L 0 1080 Z" />

        <path fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.6" d="M 1200 0 C 1400 150 1600 100 1920 220" />
        <path fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.5" d="M 1000 0 C 1300 200 1550 150 1920 280" />
        <path fill="none" stroke="#f0f6ff" strokeWidth="4" opacity="0.3" d="M 800 0 C 1200 300 1500 200 1920 380" />
      </svg>

      <div className="medical-bg-glow" />
    </div>
  )
}
