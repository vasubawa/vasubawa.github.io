'use client';

import React from 'react';

function SidebarItem({ label, color, active, onClick, children, counter }) {
  const colorMap = {
    blue: 'border-blue-400 text-blue-300',
    orange: 'border-orange-400 text-orange-300',
    green: 'border-green-400 text-green-300',
  };
  const baseClass = `relative border border-gray-800 p-1 text-left font-mono ${colorMap[color]} ${active ? 'bg-gray-800 border-l-4 border-l-accent' : ''} transition-all duration-200 shadow hover:shadow border-l-2 border-l-transparent hover:border-l-accent`;
  const counterClass = `absolute bottom-0 right-1 px-1 text-xs ${colorMap[color]} bg-gray-900 -translate-y-1/2`;

  return (
    <button
      className={baseClass}
      onClick={onClick}
      disabled={!onClick}
    >
      <div className="text-xs font-bold">{label}</div>
      <div className="mt-1">{children}</div>
      {counter && <div className={counterClass}>{counter}</div>}
    </button>
  );
}

export default SidebarItem;