import React from 'react';

export default function IntervalVisualizer({ state }) {
  if (!state) return null;

  const { intervals, currentIdx, merged, newInterval, removed, lastEnd, action, found } = state;

  const renderInterval = (inv, idx, isHighlighted = false) => {
    return (
      <div key={idx} style={{
        padding: '10px 16px', 
        background: isHighlighted ? '#EBF8FF' : 'white',
        border: isHighlighted ? '2px solid #4299E1' : '1px solid #CBD5E0',
        borderRadius: '8px', fontWeight: 'bold', fontFamily: 'var(--font-code)',
        color: isHighlighted ? '#2B6CB0' : '#2D3748',
        display: 'flex', gap: '8px', alignItems: 'center',
        boxShadow: isHighlighted ? '0 0 0 3px rgba(66, 153, 225, 0.2)' : 'none'
      }}>
        <span>[</span>
        <span>{inv[0]}</span>
        <span>,</span>
        <span>{inv[1]}</span>
        <span>]</span>
      </div>
    );
  };

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* New Interval (if Insert Interval) */}
      {newInterval && (
        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-pink)' }}>New Interval:</div>
          <div style={{ padding: '8px 16px', background: '#FFF5F7', border: '2px solid #FBB6CE', borderRadius: '8px', fontWeight: 'bold', fontFamily: 'var(--font-code)', color: '#B83280' }}>
            [{newInterval[0]}, {newInterval[1]}]
          </div>
        </div>
      )}

      {/* Original Intervals Display */}
      {intervals && (
        <div style={{ marginBottom: '30px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>Input Intervals</div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {intervals.map((inv, idx) => renderInterval(inv, idx, idx === currentIdx))}
          </div>
        </div>
      )}

      {/* Merged Intervals Display */}
      {merged && merged.length > 0 && (
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-green)', marginBottom: '15px' }}>Result Accumulator</div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {merged.map((inv, idx) => (
              <div key={idx} style={{ padding: '8px 16px', background: '#F0FFF4', border: '2px solid #9AE6B4', borderRadius: '8px', fontWeight: 'bold', fontFamily: 'var(--font-code)', color: '#22543D' }}>
                [{inv[0]}, {inv[1]}]
              </div>
            ))}
          </div>
        </div>
      )}

      {/* State Panel */}
      <div className="state-panel" style={{ marginBottom: '20px', flexWrap: 'wrap' }}>
        {lastEnd !== undefined && <div className="state-item"><span>Last End</span><strong>{lastEnd}</strong></div>}
        {removed !== undefined && <div className="state-item" style={{ borderColor: 'var(--accent-red)', background: '#FFF5F5' }}><span>Removed</span><strong style={{ color: 'var(--accent-red)' }}>{removed}</strong></div>}
        {found && <div className="state-item state-found"><span>🎯</span><strong>DONE</strong></div>}
      </div>

      {/* Action Message */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '0 auto' }}>
          {action}
        </div>
      )}
    </div>
  );
}