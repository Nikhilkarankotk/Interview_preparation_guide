import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PageNavigation({ currentIndex, totalPages, onPrev, onNext, pageLabel }) {
  return (
    <nav className="page-navigation">
      <button className="btn-page" onClick={onPrev} disabled={currentIndex === 0}>
        <ChevronLeft size={16} /> Previous
      </button>
      <div className="page-indicator">
        <div className="page-indicator-text">Page {currentIndex + 1} of {totalPages}</div>
        {pageLabel && <div className="page-indicator-label">{pageLabel}</div>}
      </div>
      <button className="btn-page" onClick={onNext} disabled={currentIndex === totalPages - 1}>
        Next <ChevronRight size={16} />
      </button>
    </nav>
  );
}