import React from 'react';

export default function UnionFindVisualizer({ state }) {
  if (!state) return null;

  const { parent, rank, edges, currentEdge, components, action, found } = state;

  const renderArray = (arr, label) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{label}</div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {arr.map((val, idx) => (
          <div key={idx} style={{
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'white', color: '#2D3748',
            border: '2px solid #CBD5E0', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem'
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
      
      {/* Parent Array */}
      {parent && renderArray(parent, 'Parent Array')}

      {/* Rank Array */}
      {rank && renderArray(rank, 'Rank Array')}

      {/* Edges Display */}
      {edges && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Edges</div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {edges.map((e, i) => {
              const isCurrent = currentEdge && e[0] === currentEdge[0] && e[1] === currentEdge[1];
              return (
                <div key={i} style={{ 
                  padding: '8px 16px', 
                  background: isCurrent ? '#EBF8FF' : 'white', 
                  border: isCurrent ? '2px solid #4299E1' : '1px solid #CBD5E0', 
                  borderRadius: '4px', fontFamily: 'var(--font-code)', fontSize: '0.9rem', fontWeight: 'bold',
                  color: isCurrent ? '#2B6CB0' : '#2D3748'
                }}>
                  {e[0]} - {e[1]}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* State Panel */}
      <div className="state-panel" style={{ marginBottom: '20px' }}>
        {components !== undefined && <div className="state-item"><span>Components</span><strong>{components}</strong></div>}
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