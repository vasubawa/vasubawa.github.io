/**
 * Main index.js - Handles toggle functionality between React GUI and Terminal views
 * This script loads after React app initialization and manages the view switching
 */

// Use IIFE pattern to avoid polluting global scope
(function() {
  /**
   * Initialize the toggle functionality when DOM is ready
   */
  function initToggle() {
    const toggleButton = document.getElementById('toggle-view');
    const terminalContainer = document.getElementById('terminal-container');
    const reactRoot = document.getElementById('root');
    const terminalFrame = document.getElementById('terminal-frame');
    
    // Exit if required elements aren't found
    if (!toggleButton || !terminalContainer || !reactRoot) {
      console.error('Toggle functionality: Required DOM elements not found');
      return;
    }
    
    // Set initial visibility for both views (prevent flash of terminal content)
    // By default, hide terminal and show GUI
    terminalContainer.style.display = 'none';
    reactRoot.style.display = 'block';
    
    /**
     * Safely store a value in session storage
     * @param {string} key - Storage key
     * @param {string} value - Storage value
     */
    function safelyStorePreference(key, value) {
      try {
        sessionStorage.setItem(key, value);
      } catch {
        // Silently handle storage errors
      }
    }
    
    /**
     * Handle toggle button click
     */
    function handleToggleClick() {
      const isTerminalActive = terminalContainer.style.display === 'block';
      
      if (isTerminalActive) {
        // Switch to GUI
        switchToGUI();
      } else {
        // Switch to Terminal
        switchToTerminal();
      }
    }
    
    /**
     * Switch to GUI view
     */
    function switchToGUI() {
      terminalContainer.style.display = 'none';
      reactRoot.style.display = 'block';
      toggleButton.textContent = 'Switch to Terminal';
      toggleButton.focus();
      safelyStorePreference('viewPreference', 'gui');
    }
    
    /**
     * Switch to Terminal view
     */
    function switchToTerminal() {
      terminalContainer.style.display = 'block';
      reactRoot.style.display = 'none';
      toggleButton.textContent = 'Switch to GUI';
      
      // Ensure iframe has focus for keyboard interactions
      try {
        if (terminalFrame && terminalFrame.contentWindow) {
          terminalFrame.contentWindow.focus();
        }
      } catch {
        console.warn('Could not focus terminal iframe');
      }
      
      safelyStorePreference('viewPreference', 'terminal');
    }
    
    // Check for previous preference in session storage
    try {
      const preference = sessionStorage.getItem('viewPreference');
      if (preference === 'terminal') {
        switchToTerminal();
      }
    } catch {
      // Ignore storage errors
    }
    
    // Add click event listener
    toggleButton.addEventListener('click', handleToggleClick);
    
    // Enable keyboard shortcut (Ctrl+Shift+T) to toggle
    document.addEventListener('keydown', function(event) {
      if (event.ctrlKey && event.shiftKey && event.key === 'T') {
        event.preventDefault(); // Prevent default browser action
        handleToggleClick();
      }
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initToggle);
  } else {
    // DOM already loaded
    initToggle();
  }
  
  // Handle loading screen
  window.addEventListener('load', function() {
    // Hide loading screen after everything is loaded
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
      // Fade out effect
      loadingScreen.style.opacity = '0';
      loadingScreen.style.transition = 'opacity 0.5s ease';
      
      // Remove loading screen after fade out
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  });
})();
