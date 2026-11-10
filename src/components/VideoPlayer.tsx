import React, { useRef, useState } from 'react';
import { VideoItem, company } from '../data/ksgData';
import { Icon } from './Icon';

interface VideoPlayerProps {
  video: VideoItem;
  openQuoteModal: (productName?: string) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  openQuoteModal,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const waText = encodeURIComponent(
    `Hi K.S.G. Tools, I watched your video demo "${video.title}" on your website and would like technical specs and quote.`
  );

  return (
    <div className="video-showcase-card">
      <div className="video-media-box" style={{ position: 'relative' }}>
        <video
          ref={videoRef}
          src={video.src}
          preload="metadata"
          playsInline
          className="video-element"
          controls={isPlaying}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {!isPlaying && (
          <div
            className="video-media-overlay"
            role="button"
            tabIndex={0}
            aria-label={`Play ${video.title}`}
            onClick={togglePlay}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(9, 14, 23, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '16px',
              cursor: 'pointer',
            }}
          >
            <div className="video-badges-row">
              <span className="v-tag">{video.tag}</span>
              <span className="v-pill-live">● {video.badge}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="button"
                className="video-center-play"
                aria-label={`Play video ${video.title}`}
              >
                <Icon name="play" size={24} />
              </button>
            </div>
            <div style={{ color: '#e2e8f0', fontSize: '12px', fontWeight: 600 }}>
              Duration: {video.duration}
            </div>
          </div>
        )}
      </div>

      <div className="video-info-box" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#fff' }}>
          {video.title}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '13.5px', marginBottom: '14px', lineHeight: 1.55 }}>
          {video.desc}
        </p>

        <div className="video-highlights-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
          {video.highlights.map((h, idx) => (
            <span
              key={idx}
              className="v-highlight-chip"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '12px',
                color: '#cbd5e1',
              }}
            >
              ✓ {h}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <a
            href={`https://wa.me/${company.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noreferrer"
            className="btn-video-wa"
            style={{
              flex: 1,
              justifyContent: 'center',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 14px',
              background: '#1e7e46',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '13px',
              textDecoration: 'none',
            }}
          >
            <Icon name="chat" size={16} />
            <span>WhatsApp Enquiry</span>
          </a>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => openQuoteModal(video.title)}
            style={{
              padding: '10px 14px',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            Request Specs
          </button>
        </div>
      </div>
    </div>
  );
};
