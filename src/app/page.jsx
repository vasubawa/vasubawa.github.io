"use client";
import React from "react";
import themes from "./themes";

export default function Home() {
  const sidebarLabels = ['Home', 'Works', 'Projects', 'Skills', 'Navigation'];
  const [activeSidebar, setActiveSidebar] = React.useState(sidebarLabels[0]);
  const themeNames = Object.keys(themes);
  const [themeName, setThemeName] = React.useState("Nord");
  const theme = themes[themeName];

  return (
    <div
      className={`min-h-screen p-1 xs:p-2 sm:p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 grid-rows-[auto_1fr_auto] gap-1 xs:gap-2 sm:gap-4 transition-colors duration-300 ${theme.font || ''}`}
      style={{
        background: theme.bg,
        color: theme.fg,
      }}
    >
      {/* Main and Sidebar */}
      <div
        className="col-start-1 col-end-4 row-start-1 row-end-3 flex flex-col flex-1 xl:grid xl:grid-rows-1 xl:grid-cols-[0.7fr_3.3fr] gap-1 xs:gap-2 sm:gap-4 h-full min-h-0"
        style={{
          minHeight: '300px',
          maxWidth: '100vw',
        }}
      >
        {/* Sidebar: 5 stacked boxes */}
        <div className="row-start-1 col-start-1 w-full">
          {/* Dropdown for sidebar: show on all screens below xl */}
          <div className="block xl:hidden mb-2">
            <select
              value={activeSidebar}
              onChange={e => setActiveSidebar(e.target.value)}
              className="w-full px-2 py-2 rounded-md border-2 font-semibold text-xs sm:text-sm border-gray-400 focus:outline-none"
              style={{
                background: theme.sidebar,
                color: theme.fg,
                borderColor: theme.border,
                borderRadius: theme.borderRadius || '0.5rem',
              }}
            >
              {sidebarLabels.map(label => (
                <option key={label} value={label}>{label}</option>
              ))}
            </select>
          </div>
          {/* Desktop (xl+): Stacked sidebar */}
          <div className="hidden xl:flex flex-col gap-1 xs:gap-2 sm:gap-4 h-full w-full">
            {sidebarLabels.map((label, i) => (
              <div
                key={label}
                className={`rounded-md shadow-lg min-h-0 max-h-full overflow-auto flex-1 flex items-center justify-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl hover:ring-2 text-xs sm:text-sm md:text-base w-full ${activeSidebar === label ? 'ring-2 ring-accent' : ''}`}
                style={{
                  background: theme.sidebar,
                  border: `2px solid ${theme.border}`,
                  boxShadow: `0 4px 24px 0 ${theme.glow}40`,
                  color: theme.fg,
                  borderRadius: theme.borderRadius || '0.5rem',
                  ...(themeName === "Nord Light" || themeName === "Catppuccin Latte"
                    ? { boxShadow: `0 4px 24px 0 ${theme.glow}80` }
                    : { boxShadow: `0 4px 24px 0 ${theme.glow}40` }),
                }}
                onClick={() => setActiveSidebar(label)}
                onMouseOver={e => {
                  e.currentTarget.style.boxShadow = `0 8px 32px 0 ${theme.glow}`;
                  e.currentTarget.style.borderColor = theme.accent;
                }}
                onMouseOut={e => {
                  e.currentTarget.style.boxShadow = (themeName === "Nord Light" || themeName === "Catppuccin Latte")
                    ? `0 4px 24px 0 ${theme.glow}80`
                    : `0 4px 24px 0 ${theme.glow}40`;
                  e.currentTarget.style.borderColor = theme.border;
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
        {/* Main */}
        <div
          className="row-start-2 md:row-start-auto col-start-1 md:col-start-2 md:col-end-4 rounded-md shadow flex flex-col items-stretch justify-start border-2 gap-1 xs:gap-2 sm:gap-4 min-h-[120px] md:min-h-[180px] lg:min-h-[240px] flex-1"
          style={{
            background: theme.box,
            borderColor: theme.border,
            color: theme.fg,
            borderRadius: theme.borderRadius || '0.5rem',
          }}
        >
          <div className="w-full text-center font-bold text-base sm:text-lg py-2 px-2 sm:px-4 border-b-2" style={{borderColor: theme.border}}>
            {activeSidebar} - Header
          </div>
          <div className="flex-1 w-full flex items-center justify-center text-xs sm:text-base px-1 sm:px-4">
            {/* Show only the selected sidebar content on mobile, or 'Main' on desktop */}
            <span className="block md:hidden">{activeSidebar}</span>
            <span className="hidden md:block">Main</span>
          </div>
        </div>
      </div>
      {/* Footer with theme toggle */}
      <div
        className="col-start-1 col-end-4 row-start-3 rounded-md shadow flex flex-col sm:flex-row items-center justify-between font-bold text-base sm:text-lg py-2 px-2 sm:px-4 border-2 gap-2"
        style={{
          background: theme.box,
          borderColor: theme.border,
          borderRadius: theme.borderRadius || '0.5rem',
        }}
      >
        <span className="mb-2 sm:mb-0">Footer</span>
        <select
          value={themeName}
          onChange={e => setThemeName(e.target.value)}
          className="w-full sm:w-auto px-2 sm:px-4 py-2 rounded-md shadow-lg font-semibold border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200"
          style={{
            background: theme.accent,
            color: theme.bg,
            borderColor: theme.border,
            minWidth: 120,
            fontSize: 14,
            cursor: 'pointer',
            borderRadius: theme.borderRadius || '0.375rem',
          }}
        >
          {themeNames.map(name => (
            <option key={name} value={name} style={{ color: theme.fg, background: theme.bg }}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
