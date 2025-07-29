'use client';
import { useState } from 'react';
import Filter from './filter';
import { FiChevronRight } from 'react-icons/fi';

export default function CollapsibleFilter() {
  const [open, setOpen] = useState(false);
  return (
    <div className="lg:col-span-3 md:col-span-4">
      <button
        className="w-full py-2 px-4 bg-slate-900 dark:bg-slate-800 text-white rounded-md font-semibold mb-2 flex items-center justify-between"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="filter-panel"
      >
        Filtros
        <span className={`ml-2 transition-transform ${open ? 'rotate-90' : 'rotate-0'}`}>
          <FiChevronRight />
        </span>
      </button>
      <div
        id="filter-panel"
        className={`transition-all duration-300 overflow-hidden ${open ? 'lg:col-span-4 md:col-span-4' : 'max-h-0 opacity-0'}`}
        aria-hidden={!open}
      >
        <Filter />
      </div>
    </div>
  );
}
