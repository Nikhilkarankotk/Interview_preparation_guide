import React from 'react';

export default function RecursionVisualizer({ state }) {
  if (!state) return null;

  const { callStack, currentAction, result, action, found } = state;

  return (
    <div className="two-ptr-visualizer" style={{ padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Call Stack Display */}
      <div style={{ 
        display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', 
        minHeight: '200px', width: '100%', maxWidth: '300px',
        borderBottom: '4px solid #CBD5E0', paddingBottom: '10px', marginBottom: '20px'
      }}>
        {callStack.length === 0 ? (
          <div style={{ color: '#A0AEC0', fontStyle: 'italic', marginBottom: '20px' }}>Stack Empty</div>
        ) : (
          callStack.map((frame, idx) => {
            const isActive = frame.status === 'active';
            const isReturning = frame.status === 'returning';
            
            let bg = 'white';
            let border = '2px solid #CBD5E0';
            let color = '#2D3748';

            if (isActive) { bg = '#EBF8FF'; border = '2px solid #4299E1'; color = '#2B6CB0'; }
            if (isReturning) { bg = '#F0FFF4'; border = '2px solid #48BB78'; color = '#22543D'; }

            return (
              <div key={idx} style={{
                width: '90%', padding: '12px', marginBottom: '8px',
                background: bg, border: border, borderRadius: '8px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                boxShadow: isActive ? '0 4px 12px rgba(66, 153, 225, 0.2)' : 'none',
                transition: 'all 0.3s ease'
              }}>
                <strong style={{ fontFamily: 'var(--font-code)', fontSize: '1rem', color: color }}>
                  {frame.name}
                </strong>
                
                {frame.returnValue !== null && (
                  <span style={{ 
                    fontSize: '0.8rem', background: '#48BB78', color: 'white', 
                    padding: '2px 8px', borderRadius: '12px', fontWeight: 'bold' 
                  }}>
                    return {frame.returnValue}
                  </span>
                )}
                {isActive && <span style={{ fontSize: '0.75rem', color: '#4299E1', fontWeight: 'bold' }}>ACTIVE</span>}
              </div>
            );
          })
        )}
      </div>

      <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '-10px', marginBottom: '20px' }}>
        ↑ Top of Stack (Active Call)
      </div>

      {/* State Panel */}
      <div className="state-panel" style={{ marginBottom: '20px', width: '100%', justifyContent: 'center' }}>
        {currentAction && (
          <div className="state-item">
            <span>Current Action</span>
            <strong style={{ color: 'var(--accent-purple)' }}>{currentAction}</strong>
          </div>
        )}
        {result !== null && (
          <div className="state-item state-found">
            <span>Final Result</span>
            <strong>{result}</strong>
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