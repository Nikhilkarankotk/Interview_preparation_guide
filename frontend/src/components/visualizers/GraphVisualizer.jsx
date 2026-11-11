import React from 'react';

export default function GraphVisualizer({ state }) {
  if (!state) return null;

  const { distances, queue, current, matrix, edges, parent, visited, colors, action, found } = state;

  // Helper to render an array
  const renderArray = (arr, label, highlightIdx = null) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
      <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>{label}</div>
      <div style={{ display: 'flex', gap: '4px' }}>
        {arr.map((val, idx) => (
          <div key={idx} style={{
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: idx === highlightIdx ? '#4299E1' : 'white', 
            color: idx === highlightIdx ? 'white' : '#2D3748',
            border: '2px solid #CBD5E0', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem',
            transition: 'all 0.3s'
          }}>
            {val === Infinity ? '∞' : val}
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
      
      {/* Distances Display */}
      {distances && renderArray(distances, 'Distance Array', current)}

      {/* Colors Display (Bipartite) */}
      {colors && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Node Colors</div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {colors.map((c, i) => (
              <div key={i} style={{
                width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 'bold', border: '2px solid #CBD5E0',
                background: c === 0 ? '#EBF8FF' : c === 1 ? '#F0FFF4' : '#EDF2F7',
                color: c === 0 ? '#2B6CB0' : c === 1 ? '#22543D' : '#A0AEC0'
              }}>
                {i}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visited Display (Prim's) */}
      {visited && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Visited Nodes</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {visited.map((v, i) => (
              <div key={i} style={{
                padding: '5px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.85rem',
                background: v ? '#C6F6D5' : '#EDF2F7', color: v ? '#22543D' : '#A0AEC0'
              }}>
                {i}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Queue Display */}
      {queue && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
          <div style={{ fontWeight: 'bold', color: 'var(--accent-purple)', marginBottom: '8px' }}>Queue / Priority Queue</div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {queue.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: '#A0AEC0', fontStyle: 'italic' }}>Empty</div>
            ) : (
              queue.map((item, idx) => {
                let display = item;
                if (Array.isArray(item)) display = `(${item[0]}, ${item[1]})`;
                return (
                  <div key={idx} style={{
                    padding: '6px 12px', background: '#FAF5FF', border: '2px solid #D6BCFA', 
                    borderRadius: '4px', fontWeight: 'bold', fontFamily: 'var(--font-code)',
                    color: '#553C9A', fontSize: '0.85rem'
                  }}>
                    {display}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Edge List Display (Kruskal / Bellman-Ford) */}
      {edges && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px', width: '100%' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Edges</div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {edges.map((e, i) => (
              <div key={i} style={{ padding: '6px 12px', background: 'white', border: '1px solid #CBD5E0', borderRadius: '4px', fontFamily: 'var(--font-code)', fontSize: '0.85rem' }}>
                {e[0]} → {e[1]} ({e[2]})
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Message */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '0 auto' }}>
          {action}
        </div>
      )}
    </div>
  );
}