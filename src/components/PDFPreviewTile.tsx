import { FileText, Download, FileCheck } from 'lucide-react';
import { useState } from 'react';

interface PDFPreviewTileProps {
  pdfUrl: string;
  title: string;
  subtitle: string;
  pageCount?: number;
  fileSize?: string;
  incidentId?: string;
  classification?: string;
  date?: string;
}

export default function PDFPreviewTile({
  pdfUrl,
  title,
  subtitle,
  pageCount = 9,
  fileSize = '244 KB',
  incidentId = 'INC-2024-0312',
  classification = 'INTERNAL',
  date = 'March 12, 2024'
}: PDFPreviewTileProps) {
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
          width: '320px',
          aspectRatio: '8.5 / 11',
          background: '#ffffff',
          borderRadius: '8px',
          boxShadow: isHovered
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          overflow: 'hidden',
          textDecoration: 'none',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'scale(1)',
          cursor: 'pointer',
          border: '1px solid #e5e7eb'
        }}
      >
        <div style={{
          padding: '28px 24px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '3px solid #1e40af'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
                padding: '8px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileCheck size={24} style={{ color: '#ffffff', strokeWidth: 2.5 }} />
              </div>
              <div>
                <div style={{
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  color: '#1e40af',
                  letterSpacing: '0.08em',
                  marginBottom: '2px'
                }}>
                  SOC ANALYSIS
                </div>
                <div style={{
                  fontSize: '0.65rem',
                  fontWeight: '600',
                  color: '#6b7280',
                  letterSpacing: '0.05em'
                }}>
                  {incidentId}
                </div>
              </div>
            </div>
            <div style={{
              background: '#fef3c7',
              color: '#92400e',
              fontSize: '0.6rem',
              fontWeight: '700',
              padding: '4px 8px',
              borderRadius: '4px',
              letterSpacing: '0.05em',
              border: '1px solid #fbbf24'
            }}>
              {classification}
            </div>
          </div>

          <div style={{
            marginBottom: '16px'
          }}>
            <h3 style={{
              fontSize: '1.1rem',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '6px',
              lineHeight: '1.25',
              letterSpacing: '-0.01em'
            }}>
              {title}
            </h3>

            <p style={{
              fontSize: '0.8rem',
              color: '#4b5563',
              lineHeight: '1.4',
              fontWeight: '500'
            }}>
              {subtitle}
            </p>
          </div>

          <div style={{
            marginBottom: '16px',
            paddingTop: '12px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '8px'
            }}>
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#3b82f6'
              }} />
              <div style={{
                height: '3px',
                flex: 1,
                background: '#e5e7eb',
                borderRadius: '2px'
              }} />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '8px'
            }}>
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#3b82f6'
              }} />
              <div style={{
                height: '3px',
                width: '85%',
                background: '#e5e7eb',
                borderRadius: '2px'
              }} />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '8px'
            }}>
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#3b82f6'
              }} />
              <div style={{
                height: '3px',
                width: '70%',
                background: '#e5e7eb',
                borderRadius: '2px'
              }} />
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: '#3b82f6'
              }} />
              <div style={{
                height: '3px',
                width: '60%',
                background: '#e5e7eb',
                borderRadius: '2px'
              }} />
            </div>
          </div>

          <div style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '16px',
            borderTop: '1px solid #e5e7eb'
          }}>
            <div style={{
              display: 'flex',
              gap: '12px',
              fontSize: '0.7rem',
              color: '#6b7280',
              fontWeight: '500'
            }}>
              <span>{pageCount} pages</span>
              <span>•</span>
              <span>{fileSize}</span>
            </div>
            <div style={{
              fontSize: '0.7rem',
              color: '#9ca3af',
              fontWeight: '500'
            }}>
              {date}
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.95) 0%, rgba(59, 130, 246, 0.95) 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none'
        }}>
          <FileText size={56} style={{ color: '#ffffff', strokeWidth: 1.5 }} />
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              color: '#ffffff',
              fontSize: '1.25rem',
              fontWeight: '700',
              letterSpacing: '0.025em'
            }}>
              View Full Report
            </span>
            <span style={{
              color: '#dbeafe',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Click to open PDF
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
