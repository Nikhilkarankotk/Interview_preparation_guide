import React from 'react';

export default function AdvancedDSVisualizer({ state }) {
  if (!state) return null;

  const { tree, bit, map, list, currentIdx, action, found } = state;

  const renderArray = (arr, label, highlightIdx = null) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{label}</div>
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {arr.map((val, idx) => (
          <div key={idx} style={{
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: idx === highlightIdx ? '#4299E1' : 'white', 
            color: idx === highlightIdx ? 'white' : '#2D3748',
            border: '2px solid #CBD5E0', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem',
            transition: 'all 0.3s'
          }}>
            {val}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
        {arr.map((_, idx) => (
          <div key={idx} style={{ width: '36px', textAlign: 'center', fontSize: '0.7rem', color: '#A0AEC0' }}>{idx}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Segment Tree / Fenwick Tree Display */}
      {tree && renderArray(tree, 'Segment Tree Array', currentIdx)}
      {bit && renderArray(bit, 'Fenwick Tree (BIT) Array', currentIdx)}

      {/* LRU Cache Display */}
      {map && (
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-purple)', textAlign: 'center', marginBottom: '15px' }}>Hash Map</div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {Object.entries(map).map(([k, v]) => (
              <div key={k} style={{ padding: '8px 16px', background: '#FAF5FF', border: '2px solid #D6BCFA', borderRadius: '8px', fontFamily: 'var(--font-code)' }}>
                {k} : {v}
              </div>
            ))}
          </div>
        </div>
      )}

      {list && (
        <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-green)', marginBottom: '15px' }}>Doubly Linked List (MRU → LRU)</div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            {list.map((val, idx) => (
              <React.Fragment key={idx}>
                <div style={{ 
                  padding: '8px 16px', 
                  background: val === 'Head' ? '#EDF2F7' : val === 'Tail' ? '#EDF2F7' : 'white', 
                  border: val === 'Head' || val === 'Tail' ? '2px dashed #A0AEC0' : '2px solid #9AE6B4', 
                  borderRadius: '4px', fontWeight: 'bold', fontFamily: 'var(--font-code)',
                  color: val === 'Head' || val === 'Tail' ? '#A0AEC0' : '#22543D'
                }}>
                  {val}
                </div>
                {idx < list.length - 1 && <span style={{ color: '#CBD5E0', fontWeight: 'bold' }}>⇄</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* State Panel */}
      <div className="state-panel" style={{ marginBottom: '20px' }}>
        {found && (
          <div className="state-item state-found">
            <span>🎯</span>
            <strong>DONE</strong>
          </div>
        )}
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