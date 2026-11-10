import React from 'react';

export default function StackVisualizer({ state }) {
  if (!state) return null;

  const { string, tokens, operations, currentIdx, stack, minStack, action, found } = state;

  // Determine what sequence we are displaying at the top
  let sequence = null;
  if (string) sequence = string.split('');
  else if (tokens) sequence = tokens;
  else if (operations) sequence = operations;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Top Sequence (String or Tokens) */}
      {sequence && (
        <div className="array-container" style={{ marginBottom: '30px' }}>
          {sequence.map((val, idx) => {
            let cellClass = 'array-cell';
            if (idx === currentIdx) cellClass += ' cell-target';

            return (
              <div key={idx} className="array-cell-wrap">
                <div className={cellClass}>{val}</div>
                {idx === currentIdx && (
                  <div className="pointer-stack">
                    <div className="pointer-label" style={{ color: 'var(--accent-blue)' }}>
                      <span className="pointer-arrow" style={{ color: 'var(--accent-blue)' }}>▲</span>
                      <span className="pointer-text" style={{ color: 'var(--accent-blue)' }}>Curr</span>
                    </div>
                  </div>
                )}
                <div className="array-index">{idx}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* Stacks Display */}
      <div style={{ display: 'flex', gap: '40px', marginBottom: '20px' }}>
        
        {/* Main Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Main Stack</div>
          <div style={{ 
            display: 'flex', flexDirection: 'column-reverse', 
            borderBottom: '3px solid #718096', borderLeft: '3px solid #718096', borderRight: '3px solid #718096',
            borderRadius: '0 0 8px 8px', padding: '5px', minHeight: '50px', minWidth: '60px', gap: '4px', background: '#F7FAFC'
          }}>
            {stack.length === 0 ? (
              <div style={{ fontSize: '0.8rem', color: '#A0AEC0', padding: '10px' }}>Empty</div>
            ) : (
              stack.map((val, idx) => (
                <div key={idx} style={{
                  padding: '8px 16px', background: 'white', border: '2px solid #CBD5E0', borderRadius: '4px',
                  fontWeight: 'bold', textAlign: 'center', fontFamily: 'var(--font-code)'
                }}>
                  {val}
                </div>
              ))
            )}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '5px' }}>↑ Top</div>
        </div>

        {/* Min Stack (if exists) */}
        {minStack && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px', color: 'var(--accent-pink)' }}>Min Stack</div>
            <div style={{ 
              display: 'flex', flexDirection: 'column-reverse', 
              borderBottom: '3px solid var(--accent-pink)', borderLeft: '3px solid var(--accent-pink)', borderRight: '3px solid var(--accent-pink)',
              borderRadius: '0 0 8px 8px', padding: '5px', minHeight: '50px', minWidth: '60px', gap: '4px', background: '#FFF5F7'
            }}>
              {minStack.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: '#A0AEC0', padding: '10px' }}>Empty</div>
              ) : (
                minStack.map((val, idx) => (
                  <div key={idx} style={{
                    padding: '8px 16px', background: 'white', border: '2px solid #FBB6CE', borderRadius: '4px',
                    fontWeight: 'bold', textAlign: 'center', fontFamily: 'var(--font-code)', color: 'var(--accent-pink)'
                  }}>
                    {val}
                  </div>
                ))
              )}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '5px' }}>↑ Top</div>
          </div>
        )}
      </div>

      {/* Action Message */}
      {action && (
        <div className={`action-pill ${found ? 'action-found' : ''}`} style={{ display: 'block', textAlign: 'center', margin: '10px auto 0' }}>
          {action}
        </div>
      )}
    </div>
  );
}