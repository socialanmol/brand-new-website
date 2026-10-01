"use client";

import React, { useEffect, useRef, useState } from "react";
import { SAMPLE_GOOGLE_REVIEWS, type GoogleReviewsData } from "../data/googleReviews";

interface GoogleReviewsBadgeProps {
  endpoint?: string;
}

const Stars: React.FC<{ value: number; size?: number }> = ({ value, size = 16 }) => (
  <span className="gr-stars" aria-label={`${value} out of 5 stars`} role="img">
    {[1, 2, 3, 4, 5].map((n) => {
      const fill = Math.max(0, Math.min(1, value - (n - 1)));
      return (
        <svg key={n} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id={`gr-s-${size}-${n}-${Math.round(value * 10)}`}>
              <stop offset={`${fill * 100}%`} stopColor="#FBBC04" />
              <stop offset={`${fill * 100}%`} stopColor="#DADCE0" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#gr-s-${size}-${n}-${Math.round(value * 10)})`}
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      );
    })}
  </span>
);

const GoogleReviewsBadge: React.FC<GoogleReviewsBadgeProps> = ({
  endpoint = "/api/google-reviews",
}) => {
  const [data, setData] = useState<GoogleReviewsData>(SAMPLE_GOOGLE_REVIEWS);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(endpoint)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json: GoogleReviewsData) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(SAMPLE_GOOGLE_REVIEWS);
      });
    return () => {
      cancelled = true;
    };
  }, [endpoint]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const top5 = data.reviews.slice(0, 5);

  return (
    <div className="gr-root" ref={rootRef}>
      {open && (
        <div className="gr-panel" role="dialog" aria-label="Google reviews for MyAnmol">
          <div className="gr-panel-head">
            <div>
              <strong>{data.isSample ? "Sample Google reviews" : "MyAnmol on Google"}</strong>
              {data.isSample && <div className="gr-sample-note">Preview only — not live customer reviews</div>}
              <div className="gr-panel-sub">
                <span className="gr-score">{data.rating.toFixed(1)}</span>
                <Stars value={data.rating} size={14} />
                <span className="gr-count">({data.total.toLocaleString("en-IN")})</span>
              </div>
            </div>
            <button className="gr-close" onClick={() => setOpen(false)} aria-label="Close reviews">
              ×
            </button>
          </div>

          <ul className="gr-list">
            {top5.map((r, i) => (
              <li key={i} className="gr-item">
                <div className="gr-item-head">
                  {r.photoUrl ? (
                    <img src={r.photoUrl} alt="" width={32} height={32} className="gr-avatar" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="gr-avatar gr-avatar-fallback">{r.author.charAt(0)}</span>
                  )}
                  <div>
                    <div className="gr-author">{r.author}</div>
                    <div className="gr-meta">
                      <Stars value={r.rating} size={12} /> <span>{r.timeAgo}</span>
                    </div>
                  </div>
                </div>
                {r.text && <p className="gr-text">{r.text}</p>}
              </li>
            ))}
          </ul>

          {data.isSample ? (
            <div className="gr-more gr-sample-note">
              Live Google reviews will appear after Places API setup.
            </div>
          ) : (
            <a className="gr-more" href={data.mapsUrl} target="_blank" rel="noopener noreferrer">
              See all reviews on Google
            </a>
          )}
        </div>
      )}

      <button
        className="gr-pill"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`Google rating ${data.rating.toFixed(1)} out of 5. ${open ? "Hide" : "Show"} reviews`}
      >
        <span className="gr-g" aria-hidden="true">G</span>
        <span className="gr-score">{data.rating.toFixed(1)}</span>
        <Stars value={data.rating} size={16} />
        <span className="gr-count">({data.total.toLocaleString("en-IN")})</span>
        {data.isSample && <span className="gr-sample-tag">SAMPLE</span>}
      </button>

      <style>{`
        .gr-root {
          position: fixed;
          left: 20px;
          bottom: calc(20px + env(safe-area-inset-bottom, 0px));
          z-index: 9998;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
        }
        .gr-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border: 1px solid #dadce0;
          border-radius: 999px;
          background: #fff;
          color: #202124;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
          font-size: 14px;
        }
        .gr-pill:hover { box-shadow: 0 6px 18px rgba(0, 0, 0, 0.24); }
        .gr-pill:focus-visible, .gr-close:focus-visible, .gr-more:focus-visible {
          outline: 3px solid #1a73e8;
          outline-offset: 2px;
        }
        .gr-g {
          width: 22px; height: 22px; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          background: #4285F4; color: #fff; font-weight: 700; font-size: 13px;
        }
        .gr-score { font-weight: 700; }
        .gr-count { color: #5f6368; font-size: 13px; }
        .gr-sample-note { color: #6b7280; font-size: 11px; line-height: 1.4; }
        .gr-sample-tag {
          padding: 2px 5px; border-radius: 4px; background: #fff4ce;
          color: #7a5b00; font-size: 9px; font-weight: 800; letter-spacing: .04em;
        }
        .gr-stars { display: inline-flex; gap: 1px; }
        .gr-panel {
          position: absolute;
          left: 0;
          bottom: calc(100% + 10px);
          width: min(360px, calc(100vw - 40px));
          max-height: min(70vh, 520px);
          display: flex;
          flex-direction: column;
          background: #fff;
          color: #202124;
          border: 1px solid #dadce0;
          border-radius: 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }
        .gr-panel-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 14px 16px; border-bottom: 1px solid #eee;
        }
        .gr-panel-sub { display: flex; align-items: center; gap: 6px; margin-top: 4px; }
        .gr-close {
          border: 0; background: none; font-size: 24px; line-height: 1;
          cursor: pointer; color: #5f6368; padding: 0 4px;
        }
        .gr-list { list-style: none; margin: 0; padding: 0; overflow-y: auto; }
        .gr-item { padding: 12px 16px; border-bottom: 1px solid #f1f3f4; }
        .gr-item-head { display: flex; gap: 10px; align-items: center; }
        .gr-avatar { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; }
        .gr-avatar-fallback {
          display: inline-flex; align-items: center; justify-content: center;
          background: #e8eaed; color: #5f6368; font-weight: 600;
        }
        .gr-author { font-size: 14px; font-weight: 600; }
        .gr-meta { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #5f6368; }
        .gr-text { margin: 8px 0 0; font-size: 13px; line-height: 1.5; color: #3c4043; }
        .gr-more {
          display: block; text-align: center; padding: 12px;
          font-size: 13px; font-weight: 600; color: #1a73e8; text-decoration: none;
          border-top: 1px solid #eee;
        }
        div.gr-more { color: #6b7280; font-weight: 400; }
        .gr-more:hover { background: #f8f9fa; }
        @media (max-width: 600px) {
          .gr-root { left: 14px; }
          .gr-pill { padding: 8px 12px; }
        }
      `}</style>
    </div>
  );
};

export default GoogleReviewsBadge;