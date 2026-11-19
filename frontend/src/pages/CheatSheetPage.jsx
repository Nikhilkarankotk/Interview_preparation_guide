import React, { useState } from 'react';
import { cheatSheetSections } from '../data/CheatSheet';
import { ArrowLeft } from 'lucide-react';

/* ---------- Shared inline styles (match existing card typography) ---------- */

const sectionHeadingStyle = {
  fontSize: '0.66rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#2D3748',
  marginTop: '12px',
  marginBottom: '6px'
};

const paraStyle = {
  fontSize: '0.72rem',
  color: '#4A5568',
  lineHeight: 1.55,
  margin: '0 0 4px 0'
};

const bulletStyle = {
  fontSize: '0.72rem',
  color: '#4A5568',
  lineHeight: 1.55,
  marginBottom: '3px'
};

const listStyle = {
  margin: '0 0 4px 0',
  paddingLeft: '18px'
};

/* ---------- Small presentational helpers ---------- */

function SectionHeading({ children }) {
  return <div style={sectionHeadingStyle}>{children}</div>;
}

function LabeledRow({ label, children }) {
  return (
    <p style={paraStyle}>
      <strong style={{ color: '#2D3748' }}>{label}: </strong>
      {children}
    </p>
  );
}

function BulletList({ items }) {
  if (!items || items.length === 0) return null;
  return (
    <ul style={listStyle}>
      {items.map((it, i) => (
        <li key={i} style={bulletStyle}>{it}</li>
      ))}
    </ul>
  );
}

/* ---------- Structured tips renderer ---------- */

function TipsPanel({ tips }) {
  const hasRecognition =
    tips.recognition &&
    (tips.recognition.keywords?.length ||
      tips.recognition.signals?.length ||
      tips.recognition.notFor?.length);

  const hasOptimization =
    tips.optimization &&
    (tips.optimization.bottleneck ||
      tips.optimization.path ||
      tips.optimization.why ||
      tips.optimization.tradeoff);

  const hasTricks = tips.tricks?.length > 0;
  const hasTraps = tips.traps?.length > 0;
  const hasEdge = tips.edgeCases?.length > 0;
  const hasJava = tips.java?.length > 0;
  const hasFollow = tips.followUps?.length > 0;
  const hasRecall = tips.recall?.length > 0;

  const nothingToShow =
    !hasRecognition && !hasTricks && !hasOptimization &&
    !hasTraps && !hasEdge && !hasJava && !hasFollow && !hasRecall;

  if (nothingToShow) return null;

  return (
    <div
      style={{
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px dashed var(--border-soft)'
      }}
    >
      {/* A. Pattern Recognition Shortcuts */}
      {hasRecognition && (
        <div>
          <SectionHeading>🎯 Pattern Recognition Shortcuts</SectionHeading>
          {tips.recognition.keywords?.length > 0 && (
            <LabeledRow label="Keywords">
              {tips.recognition.keywords.join(', ')}
            </LabeledRow>
          )}
          {tips.recognition.signals?.length > 0 && (
            <LabeledRow label="Signals">
              {tips.recognition.signals.join(' • ')}
            </LabeledRow>
          )}
          {tips.recognition.notFor?.length > 0 && (
            <LabeledRow label="Don't use when">
              {tips.recognition.notFor.join(' • ')}
            </LabeledRow>
          )}
        </div>
      )}

      {/* B. Algorithmic Tricks */}
      {hasTricks && (
        <div>
          <SectionHeading>⚡ Algorithmic Tricks</SectionHeading>
          <BulletList items={tips.tricks} />
        </div>
      )}

      {/* C. Interview Optimization Tips */}
      {hasOptimization && (
        <div>
          <SectionHeading>🚀 Interview Optimization</SectionHeading>
          {tips.optimization.bottleneck && (
            <LabeledRow label="Brute-force bottleneck">
              {tips.optimization.bottleneck}
            </LabeledRow>
          )}
          {tips.optimization.path && (
            <LabeledRow label="Path to optimal">
              {tips.optimization.path}
            </LabeledRow>
          )}
          {tips.optimization.why && (
            <LabeledRow label="Why it works">
              {tips.optimization.why}
            </LabeledRow>
          )}
          {tips.optimization.tradeoff && (
            <LabeledRow label="Trade-off">
              {tips.optimization.tradeoff}
            </LabeledRow>
          )}
        </div>
      )}

      {/* D. Common Traps & Mistakes */}
      {hasTraps && (
        <div>
          <SectionHeading>⚠️ Common Traps & Mistakes</SectionHeading>
          {tips.traps.map((trap, i) => (
            <div
              key={i}
              style={{
                borderLeft: '3px solid #C53030',
                paddingLeft: '10px',
                marginBottom: '10px'
              }}
            >
              <p style={{ ...paraStyle, margin: '0 0 3px 0' }}>
                <span style={{ color: '#C53030', fontWeight: 700 }}>✗</span>{' '}
                <strong style={{ color: '#2D3748' }}>{trap.wrong}</strong>
              </p>
              <p style={{ ...paraStyle, margin: '0 0 3px 0' }}>
                <strong>Why:</strong> {trap.why}
              </p>
              <p style={{ ...paraStyle, margin: '0 0 3px 0' }}>
                <span style={{ color: '#2F855A', fontWeight: 700 }}>✓</span>{' '}
                <strong style={{ color: '#2D3748' }}>{trap.right}</strong>
              </p>
              {trap.ex && (
                <p
                  style={{
                    ...paraStyle,
                    margin: 0,
                    fontSize: '0.68rem',
                    color: '#718096',
                    fontFamily: 'ui-monospace, Menlo, Consolas, monospace'
                  }}
                >
                  <strong>Example:</strong> {trap.ex}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* E. Edge Cases to Remember */}
      {hasEdge && (
        <div>
          <SectionHeading>🧪 Edge Cases to Remember</SectionHeading>
          <BulletList items={tips.edgeCases} />
        </div>
      )}

      {/* F. Java Implementation Tricks */}
      {hasJava && (
        <div>
          <SectionHeading>☕ Java Implementation Tricks</SectionHeading>
          <BulletList items={tips.java} />
        </div>
      )}

      {/* G. Interviewer's Follow-up Questions */}
      {hasFollow && (
        <div>
          <SectionHeading>🗣️ Interviewer's Follow-up Questions</SectionHeading>
          {tips.followUps.map((f, i) => (
            <div key={i} style={{ marginBottom: '6px' }}>
              <p
                style={{
                  ...paraStyle,
                  margin: '0 0 2px 0',
                  fontWeight: 600,
                  color: '#2D3748'
                }}
              >
                Q: {f.q}
              </p>
              <p style={{ ...paraStyle, margin: 0 }}>
                <strong>A:</strong> {f.a}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* H. Quick Recall — Before Coding */}
      {hasRecall && (
        <div>
          <SectionHeading>✅ Quick Recall — Before Coding</SectionHeading>
          <ul style={{ ...listStyle, listStyle: 'none', paddingLeft: 0 }}>
            {tips.recall.map((r, i) => (
              <li
                key={i}
                style={{
                  ...bulletStyle,
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '6px'
                }}
              >
                <span style={{ color: '#2F855A', fontWeight: 700 }}>☐</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------- Card wrapper (preserves original look, adds toggle) ---------- */

function ItemCard({ item }) {
  const [open, setOpen] = useState(false);
  const hasTips = !!item.tips;

  return (
    <div
      style={{
        background: 'white',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid var(--border-soft)'
      }}
    >
      <strong
        style={{
          display: 'block',
          fontSize: '0.85rem',
          color: 'var(--main-text)',
          marginBottom: '4px'
        }}
      >
        {item.title}
      </strong>
      <p style={{ fontSize: '0.75rem', color: '#4A5568', margin: 0, lineHeight: 1.5 }}>
        {item.desc}
      </p>

      {hasTips && (
        <>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Hide Tips & Tricks' : 'Show Tips & Tricks'}
            style={{
              marginTop: '10px',
              background: 'transparent',
              border: '1px solid var(--border-soft)',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.7rem',
              fontWeight: 600,
              cursor: 'pointer',
              color: 'var(--main-text)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transition: 'transform 0.15s',
                transform: open ? 'rotate(90deg)' : 'rotate(0deg)'
              }}
            >
              ▸
            </span>
            {open ? 'Hide Tips & Tricks' : 'Show Tips & Tricks'}
          </button>

          {open && <TipsPanel tips={item.tips} />}
        </>
      )}
    </div>
  );
}

/* ---------- Page (unchanged structure) ---------- */

export default function CheatSheetPage({ navigateTo }) {
  return (
    <div
      className="cheat-sheet-page"
      style={{ maxWidth: '1100px', margin: '0 auto', paddingBottom: '40px' }}
    >
      <header className="page-hero" style={{ marginBottom: '30px' }}>
        <h1 className="page-title">DSA Master Cheat Sheet</h1>
        <p className="page-subtitle">The ultimate quick-reference guide for interviews</p>

        <button
          onClick={() => navigateTo('dashboard')}
          className="btn-secondary"
          style={{ marginTop: '15px' }}
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </button>
      </header>

      <div
        className="cheat-sheet-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px'
        }}
      >
        {cheatSheetSections.map((section, idx) => (
          <div
            key={idx}
            className={`content-card ${section.color}`}
            style={{ marginBottom: 0 }}
          >
            <h2
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '1.1rem',
                marginBottom: '15px'
              }}
            >
              <span style={{ fontSize: '1.3rem' }}>{section.icon}</span>{' '}
              {section.category}
            </h2>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {section.items.map((item, i) => (
                <ItemCard key={i} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}




