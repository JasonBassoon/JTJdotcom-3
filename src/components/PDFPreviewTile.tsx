import { FileText } from 'lucide-react';
import { useState } from 'react';

interface PDFPreviewTileProps {
  pdfUrl: string;
  title: string;
  subtitle: string;
}

export default function PDFPreviewTile({ pdfUrl, title, subtitle }: PDFPreviewTileProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      marginTop: '16px',
      marginBottom: '24px'
    }}>
      <a
        href={pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          position: 'relative',
          display: 'block',
          width: '280px',
          aspectRatio: '8.5 / 11',
          background: '#ffffff',
          borderRadius: '6px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          overflow: 'hidden',
          textDecoration: 'none',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: isHovered ? 'scale(1.03)' : 'scale(1)',
          cursor: 'pointer'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 0,
          height: 0,
          borderStyle: 'solid',
          borderWidth: '0 24px 24px 0',
          borderColor: 'transparent #f3f4f6 transparent transparent'
        }} />

        <div style={{
          padding: '32px 24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #ffffff 0%, #fafafa 100%)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '20px',
            paddingBottom: '16px',
            borderBottom: '2px solid #e5e7eb'
          }}>
            <FileText size={28} style={{ color: '#dc2626', flexShrink: 0 }} />
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#6b7280',
              letterSpacing: '0.1em'
            }}>
              INCIDENT REPORT
            </div>
          </div>

          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '8px',
            lineHeight: '1.3'
          }}>
            {title}
          </h3>

          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            marginBottom: '20px',
            lineHeight: '1.4'
          }}>
            {subtitle}
          </p>

          <div style={{
            marginTop: 'auto',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{
              height: '4px',
              background: '#e5e7eb',
              marginBottom: '8px',
              borderRadius: '2px'
            }} />
            <div style={{
              height: '4px',
              background: '#e5e7eb',
              width: '80%',
              marginBottom: '8px',
              borderRadius: '2px'
            }} />
            <div style={{
              height: '4px',
              background: '#e5e7eb',
              width: '60%',
              borderRadius: '2px'
            }} />
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}>
          <FileText size={48} style={{ color: '#ffffff' }} />
          <span style={{
            color: '#ffffff',
            fontSize: '1.125rem',
            fontWeight: '600',
            letterSpacing: '0.025em'
          }}>
            View Report
          </span>
        </div>
      </a>
    </div>
  );
}
