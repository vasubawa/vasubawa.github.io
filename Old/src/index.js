/**
 * Main index.js - Handles toggle functionality between React GUI and Terminal views
 * This script loads after React app initialization and manages the view switching
 * with clean URL persistence (no hash fragments)
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

    // Store or retrieve view preference using localStorage
    const VIEW_MODE_KEY = 'portfolioViewMode';
    
    function saveViewPreference(mode) {
      try {
        localStorage.setItem(VIEW_MODE_KEY, mode);
      } catch {
        console.warn('Could not save view preference');
      }
    }
    
    function getViewPreference() {
      try {
        return localStorage.getItem(VIEW_MODE_KEY) || 'gui';
      } catch {
        return 'gui';
      }
    }
    
    // Show Terminal View
    function showTerminalView() {
      // Remove initial state class if it exists
      document.documentElement.classList.remove('terminal-mode-initial');
      
      // Animate the transition (reduced time for faster switching)
      reactRoot.style.opacity = '0';
      
      setTimeout(() => {
        reactRoot.style.display = 'none';
        terminalContainer.style.display = 'block';
        
        // Fade in terminal (reduced time)
        setTimeout(() => {
          terminalContainer.style.opacity = '1';
        }, 20);
        
        toggleButton.innerHTML = '<span class="toggle-icon">&#9001;</span><span class="toggle-text">GUI View</span>';
        toggleButton.className = 'toggle-button terminal-mode';
        
        // Update browser history without adding hash
        try {
          window.history.pushState({ view: 'terminal' }, '', window.location.pathname);
        } catch {
          console.warn('Could not update history');
        }
        
        // Save preference
        saveViewPreference('terminal');
        
        // Ensure iframe has focus and knows it's in iframe mode
        if (terminalFrame && terminalFrame.contentWindow) {
          try {
            terminalFrame.contentWindow.focus();
            terminalFrame.contentWindow.postMessage('iframe-mode', '*');
          } catch {
            console.warn('Could not communicate with iframe');
          }
        }
      }, 80);  // Reduced from 200ms to 80ms for faster transition
    }
    
    // Show GUI View
    function showGUIView() {
      // Remove initial state class if it exists
      document.documentElement.classList.remove('terminal-mode-initial');
      
      // Animate the transition (reduced time for faster switching)
      terminalContainer.style.opacity = '0';
      
      setTimeout(() => {
        terminalContainer.style.display = 'none';
        reactRoot.style.display = 'block';
        
        // Fade in GUI (reduced time)
        setTimeout(() => {
          reactRoot.style.opacity = '1';
        }, 20);
        
        toggleButton.innerHTML = '<span class="toggle-icon">&#9002;</span><span class="toggle-text">Terminal View</span>';
        toggleButton.className = 'toggle-button gui-mode';
        
        // Update browser history without adding hash
        try {
          window.history.pushState({ view: 'gui' }, '', window.location.pathname);
        } catch {
          console.warn('Could not update history');
        }
        
        // Save preference
        saveViewPreference('gui');
      }, 80);  // Reduced from 200ms to 80ms for faster transition
    }
    
    // Handle toggle click
    toggleButton.addEventListener('click', function() {
      const isTerminalVisible = terminalContainer.style.display === 'block';
      if (isTerminalVisible) {
        showGUIView();
      } else {
        showTerminalView();
      }
    });
    
    // Initialize view based on stored preference or URL parameters
    function setInitialView() {
      // Get view preference from localStorage or fall back to GUI
      const savedView = getViewPreference();
      
      // Check URL params for first-time direct navigation to terminal
      const urlParams = new URLSearchParams(window.location.search);
      const requestedView = urlParams.get('view');
      
      // Determine which view to show
      const viewToShow = requestedView || savedView;
      
      // If we got a view param in the URL, clean it by replacing with clean URL
      if (requestedView) {
        try {
          window.history.replaceState(
            { view: viewToShow }, 
            '', 
            window.location.pathname
          );
        } catch {
          console.warn('Could not update history');
        }
      }
      
      // Set up initial visibility based on terminal-mode-initial class
      // which may have been set before DOM was ready
      const hasInitialTerminalClass = document.documentElement.classList.contains('terminal-mode-initial');
      
      if (hasInitialTerminalClass) {
        // Already in terminal mode from early init - just update button state
        toggleButton.innerHTML = '<span class="toggle-icon">&#9001;</span><span class="toggle-text">GUI View</span>';
        toggleButton.className = 'toggle-button terminal-mode';
        reactRoot.style.display = 'none';
        terminalContainer.style.display = 'block';
        terminalContainer.style.opacity = '1';
        
        // Clear the initial class now that JS has taken over
        document.documentElement.classList.remove('terminal-mode-initial');
      } else {
        // Show the appropriate view with transition
        if (viewToShow === 'terminal') {
          showTerminalView();
        } else {
          showGUIView();
        }
      }
    }
    
    // Run setInitialView to set up the initial state
    setInitialView();
    
    // Listen to popstate events (back/forward navigation)
    window.addEventListener('popstate', function(event) {
      if (event.state && event.state.view) {
        const viewToShow = event.state.view;
        if (viewToShow === 'terminal') {
          showTerminalView();
        } else {
          showGUIView();
        }
      }
    });
    
    // Make functions available for message handler
    window.portfolioToggle = {
      showGUIView,
      showTerminalView
    };
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
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
      loadingScreen.style.opacity = '0';
      loadingScreen.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }
  });
  
  // Listen for messages from the terminal iframe
  window.addEventListener('message', function(event) {
    if (event.data === 'switch-to-gui' && window.portfolioToggle) {
      // Use the exposed function to switch to GUI view
      window.portfolioToggle.showGUIView();
    }
  });
})();
