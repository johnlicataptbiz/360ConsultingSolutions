import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../types';

interface ConsultModalProps {
  onClose: () => void;
  selectedService?: ServiceItem | null;
}

const ensureHubSpotEmbedUrl = (url: string) => {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    if (!parsed.searchParams.has('embed')) parsed.searchParams.set('embed', 'true');
    return parsed.toString();
  } catch {
    if (url.includes('embed=true')) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}embed=true`;
  }
};

const ConsultModal: React.FC<ConsultModalProps> = ({ onClose, selectedService }) => {
  const [loading, setLoading] = useState(true);
  const meetingUrl = ensureHubSpotEmbedUrl(
    import.meta.env.VITE_HUBSPOT_MEETING_URL ||
      (process.env.HUBSPOT_MEETING_URL as string | undefined) ||
      'https://meetings.hubspot.com/john2490'
  );

  useEffect(() => {
    // Lock body scroll when modal is open
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    // Load HubSpot script
    const scriptSrc = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);
    const script = existingScript || document.createElement('script');
    const didAppendScript = !existingScript;

    if (didAppendScript) {
      script.setAttribute('src', scriptSrc);
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('async', 'true');
      document.body.appendChild(script);
    }

    const applyIframeStyles = () => {
      const iframe = document.querySelector('.meetings-iframe-container iframe') as HTMLIFrameElement | null;
      if (!iframe) return;
      iframe.style.border = 'none';
      iframe.style.backgroundColor = '#0a0a0f';
      iframe.style.filter = 'invert(0.9) hue-rotate(180deg) brightness(1.2) contrast(0.9)';
    };

    const container = document.querySelector('.meetings-iframe-container');
    const observer = container
      ? new MutationObserver(() => applyIframeStyles())
      : null;
    if (container && observer) observer.observe(container, { childList: true, subtree: true });

    const styleInterval = window.setInterval(applyIframeStyles, 500);
    const stopStyling = window.setTimeout(() => window.clearInterval(styleInterval), 5000);

    const timer = setTimeout(() => setLoading(false), 2000);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      clearTimeout(timer);
      window.clearTimeout(stopStyling);
      window.clearInterval(styleInterval);
      if (observer) observer.disconnect();
      if (didAppendScript && script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-gray-950/98 backdrop-blur-2xl"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 40 }}
        className="relative z-10 w-full max-w-5xl bg-[#0a0a0f] rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col h-[90vh]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-[100] w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all backdrop-blur-md border border-white/10"
          aria-label="Close"
        >
          <span className="text-xl">✕</span>
        </button>

        {/* Header Overlay - Styled to match screenshot */}
        <div className="relative z-50 pt-10 pb-6 px-6 text-center border-b border-white/[0.03] bg-[#0a0a0f]">
          <p className="text-[10px] font-black tracking-[0.4em] text-orange-500 uppercase mb-2">
            Schedule Your Session
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2 font-heading">
            Select a Date & Time
          </h2>
          <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.3em]">
            Secure Booking • 45-Minute Session • Priority Access
          </p>
        </div>

        {/* HubSpot Embed Section */}
        <div className="flex-1 relative bg-[#0a0a0f] overflow-hidden flex flex-col">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center z-[70] bg-[#0a0a0f]">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mb-4" />
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-600">Syncing Systems</p>
              </div>
            </div>
          )}

          {/* HubSpot Iframe with Strategic Overlays */}
          <div className="flex-1 relative w-full h-full overflow-hidden">
             {/* Darken the HubSpot iframe to match the site theme */}
            <div className="absolute inset-0 bg-[#0a0a0f]/75 mix-blend-multiply pointer-events-none z-[65]" />
             {/* Side Overlay to cover "Available Times" text if HubSpot adds it */}
            <div className="absolute top-[80px] right-0 w-[240px] h-[100px] bg-[#0a0a0f] z-[65] pointer-events-none hidden lg:flex flex-col justify-center px-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-[9px] font-black tracking-[0.3em] text-gray-500 uppercase">
                  Available
                </p>
                <p className="text-[9px] font-black tracking-[0.3em] text-white/40 uppercase">
                  HubSpot ↗
                </p>
              </div>
              <p className="text-lg font-black text-white tracking-tight">
                Time Slots
              </p>
              <p className="text-[10px] text-white/30 mt-1">
                45-minute session
              </p>
            </div>

            <div 
              className="meetings-iframe-container w-full h-full custom-scrollbar"
              data-src={meetingUrl}
              style={{ minHeight: '100%' }}
            ></div>
          </div>
        </div>

        {/* Global styles for HubSpot iframe */}
        <style>{`
          .meetings-iframe-container iframe {
            border: none !important;
            border-radius: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: #0a0a0f;
            filter: invert(0.9) hue-rotate(180deg) brightness(1.2) contrast(0.9) !important;
          }
          /* This is the magic to make HubSpot's white background dark */
          .meetings-iframe-container {
             background: #0a0a0f;
          }
          
          /* Custom Scrollbar for the modal and iframe */
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #0a0a0f;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default ConsultModal;
