import React from "react";

const WHATSAPP_NUMBER = "919742826665";
const DEFAULT_MESSAGE = "Hi MyAnmol team, I have a query: ";

interface WhatsAppFloatProps {
  phone?: string;
  message?: string;
}

const WhatsAppFloat: React.FC<WhatsAppFloatProps> = ({
  phone = WHATSAPP_NUMBER,
  message = DEFAULT_MESSAGE,
}) => {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with MyAnmol on WhatsApp"
        className="wa-float"
      >
        <svg
          viewBox="0 0 32 32"
          width={30}
          height={30}
          fill="#fff"
          aria-hidden="true"
        >
          <path d="M16.003 3C8.83 3 3 8.83 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.68-1.75A12.94 12.94 0 0 0 16 29c7.17 0 13-5.83 13-13S23.17 3 16.003 3zm0 23.7c-1.94 0-3.84-.52-5.5-1.5l-.39-.23-3.97 1.04 1.06-3.87-.26-.4A10.66 10.66 0 0 1 5.3 16c0-5.9 4.8-10.7 10.7-10.7S26.7 10.1 26.7 16s-4.8 10.7-10.7 10.7zm5.87-8c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.26-.19.21-.37.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.15 3.09 1.31 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37z" />
        </svg>
      </a>

      <style>{`
        .wa-float {
          position: fixed;
          right: 20px;
          bottom: calc(20px + env(safe-area-inset-bottom, 0px));
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: #25D366;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
          z-index: 9999;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .wa-float:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
        }
        .wa-float:focus-visible {
          outline: 3px solid #075E54;
          outline-offset: 3px;
        }
        .wa-float::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #25D366;
          opacity: 0.5;
          z-index: -1;
          animation: wa-pulse 2s infinite;
        }
        @keyframes wa-pulse {
          0%   { transform: scale(1);   opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wa-float::before { animation: none; }
        }
        @media (max-width: 600px) {
          .wa-float { right: 14px; width: 52px; height: 52px; }
        }
      `}</style>
    </>
  );
};

export default WhatsAppFloat;