import React from 'react';

const POINTER_LABELS = {
  left: 'L', right: 'R',
  slow: 'S', fast: 'F',
  lo: 'lo', mid: 'mid', hi: 'hi',
  i: 'i',
};

export default function TwoPointerVisualizer({ state, type }) {
  if (!state) return null;
  const { array, highlighted = {}, left, right, slow, fast, lo, mid, hi, i, pivot, sum, target, comparison, found } = state;

  // Determine which pointers are in use based on the type
  const pointerIndices = [];
  if (type === 'opposite-ends') {
    if (left != null) pointerIndices.push({ idx: left, label: 'L', cls: 'ptr-left' });
    if (right != null) pointerIndices.push({ idx: right, label: 'R', cls: 'ptr-right' });
  } else if (type === 'same-direction') {
    if (slow != null) pointerIndices.push({ idx: slow, label: 'S', cls: 'ptr-slow' });
    if (fast != null) pointerIndices.push({ idx: fast, label: 'F', cls: 'ptr-fast' });
  } else if (type === 'dutch-flag') {
    if (lo != null) pointerIndices.push({ idx: lo, label: 'lo', cls: 'ptr-lo' });
    if (mid != null) pointerIndices.push({ idx: mid, label: 'mid', cls: 'ptr-mid' });
    if (hi != null) pointerIndices.push({ idx: hi, label: 'hi', cls: 'ptr-hi' });
  } else if (type === 'multi-pointer') {
    if (i != null) pointerIndices.push({ idx: i, label: 'i', cls: 'ptr-i' });
    if (left != null) pointerIndices.push({ idx: left, label: 'L', cls: 'ptr-left' });
    if (right != null) pointerIndices.push({ idx: right, label: 'R', cls: 'ptr-right' });
  }

  return (
    <div className="two-ptr-visualizer">
      <div className="array-container">
        {array.map((val, idx) => {
          const hl = highlighted[idx];
          const ptrs = pointerIndices.filter(p => p.idx === idx);
          return (
            <div key={idx} className="array-cell-wrap">
              <div className={`array-cell ${hl ? `cell-${hl}` : ''} ${pivot === val && type === 'dutch-flag' ? 'cell-pivot-hint' : ''}`}>
                {val}
              </div>
              <div className="pointer-stack">
                {ptrs.map((p, k) => (
                  <div key={k} className={`pointer-label ${p.cls}`}>
                    <span className="pointer-arrow">▲</span>
                    <span className="pointer-text">{p.label}</span>
                  </div>
                ))}
              </div>
              <div className="array-index">{idx}</div>
            </div>
          );
        })}
      </div>

      <div className="state-panel">
        {sum != null && target != null && (
          <div className="state-item">
            <span>Sum</span>
            <strong>{sum}</strong>
          </div>
        )}
        {target != null && (
          <div className="state-item">
            <span>Target</span>
            <strong>{target}</strong>
          </div>
        )}
        {comparison && (
          <div className={`state-item comparison ${comparison.includes('==') ? 'comparison-match' : ''}`}>
            <span>Compare</span>
            <strong>{comparison}</strong>
          </div>
        )}
        {pivot != null && type === 'dutch-flag' && (
          <div className="state-item">
            <span>Pivot</span>
            <strong>{pivot}</strong>
          </div>
        )}
        {found && (
          <div className="state-item state-found">
            <span>🎯</span>
            <strong>FOUND</strong>
          </div>
        )}
      </div>
    </div>
  );
}