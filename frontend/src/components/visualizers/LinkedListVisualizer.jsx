import React from 'react';

export default function LinkedListVisualizer({ state }) {
  if (!state) return null;

  const { nodes, list1, list2, result, prev, curr, next, slow, fast, p1, p2, action, found } = state;

  const renderList = (list, label, pointers) => {
    if (!list) return null;
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 'bold', minWidth: '60px' }}>{label}:</span>
        {list.map((val, idx) => (
          <React.Fragment key={idx}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'white', border: '2px solid #CBD5E0', borderRadius: '8px',
                fontWeight: 'bold', fontFamily: 'var(--font-code)', color: '#2D3748',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}>
                {val}
              </div>
              {/* Pointer Labels */}
              {pointers && pointers.map((p, i) => {
                if (p.idx === idx) {
                  return (
                    <div key={i} style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', color: p.color, fontWeight: 'bold', fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
                      {p.label}
                    </div>
                  );
                }
                return null;
              })}
            </div>
            {idx < list.length - 1 && <span style={{ color: '#A0AEC0', fontWeight: 'bold' }}>→</span>}
          </React.Fragment>
        ))}
        <span style={{ color: '#A0AEC0', fontWeight: 'bold' }}>→ null</span>
      </div>
    );
  };

  return (
    <div className="two-ptr-visualizer" style={{ padding: '30px 10px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Single list display (for Reverse) */}
      {nodes && renderList(nodes, 'List', [
        { idx: prev, label: 'prev', color: 'var(--accent-blue)' },
        { idx: curr, label: 'curr', color: 'var(--accent-pink)' },
        { idx: next, label: 'next', color: 'var(--accent-purple)' }
      ])}

      {/* Two list display (for Merge) */}
      {list1 && renderList(list1, 'List 1', [{ idx: p1, label: 'p1', color: 'var(--accent-blue)' }])}
      {list2 && renderList(list2, 'List 2', [{ idx: p2, label: 'p2', color: 'var(--accent-pink)' }])}
      
      {/* Result accumulator for Merge */}
      {result && renderList(result, 'Result', [])}

      {/* Gap pointers display (for Remove Nth) */}
      {nodes && slow !== undefined && fast !== undefined && renderList(nodes, 'List', [
        { idx: slow, label: 'slow', color: 'var(--accent-green)' },
        { idx: fast, label: 'fast', color: 'var(--accent-pink)' }
      ])}

      {/* Action Message */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '15px auto 0' }}>
          {action}
        </div>
      )}
    </div>
  );
}