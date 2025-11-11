/**
 * Cookie Consent & Analytics Opt-Out Manager
 * Handles user preferences for Google Analytics tracking
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'mm-analytics-consent';
  const BANNER_DISPLAY_DELAY = 1000; // Show banner after 1 second

  /**
   * Get the consent banner element
   */
  function getBanner() {
    return document.getElementById('cookie-consent-banner');
  }

  /**
   * Show the consent banner
   */
  function showBanner() {
    const banner = getBanner();
    if (banner) {
      banner.classList.remove('hidden');
      // Add animation
      banner.style.animation = 'slideUp 0.3s ease-out';
    }
  }

  /**
   * Hide the consent banner
   */
  function hideBanner() {
    const banner = getBanner();
    if (banner) {
      banner.style.animation = 'slideDown 0.3s ease-in';
      setTimeout(() => {
        banner.classList.add('hidden');
      }, 300);
    }
  }

  /**
   * Get the user's stored consent preference
   */
  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Unable to access localStorage:', e);
      return null;
    }
  }

  /**
   * Save the user's consent preference
   */
  function saveConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      console.warn('Unable to save to localStorage:', e);
    }
  }

  /**
   * Handle accept button click
   */
  function handleAccept() {
    console.log('Accept button clicked');
    saveConsent('accepted');
    console.log('Consent saved, checking localStorage:', localStorage.getItem(STORAGE_KEY));
    hideBanner();
    // Dispatch event so analytics manager can enable tracking
    window.dispatchEvent(new CustomEvent('mm-consent-changed', { detail: 'accepted' }));
    console.log('Analytics tracking accepted - event dispatched');
  }

  /**
   * Handle decline button click
   */
  function handleDecline() {
    console.log('Decline button clicked');
    saveConsent('declined');
    console.log('Consent saved, checking localStorage:', localStorage.getItem(STORAGE_KEY));
    hideBanner();
    // Dispatch event so analytics manager can disable tracking
    window.dispatchEvent(new CustomEvent('mm-consent-changed', { detail: 'declined' }));
    console.log('Analytics tracking declined - event dispatched');
  }

  /**
   * Handle privacy settings link click
   */
  function handlePrivacySettings() {
    // Clear the stored preference and show the banner again
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Unable to clear localStorage:', e);
    }
    showBanner();
  }

  /**
   * Set up event listeners with retry logic for dynamically loaded elements
   */
  function setupEventListeners() {
    const acceptButton = document.getElementById('accept-analytics');
    const declineButton = document.getElementById('decline-analytics');
    const privacyLink = document.getElementById('privacy-settings-link');

    if (acceptButton && !acceptButton.dataset.listenerAttached) {
      acceptButton.addEventListener('click', handleAccept);
      acceptButton.dataset.listenerAttached = 'true';
      console.log('Accept button listener attached');
    }

    if (declineButton && !declineButton.dataset.listenerAttached) {
      declineButton.addEventListener('click', handleDecline);
      declineButton.dataset.listenerAttached = 'true';
      console.log('Decline button listener attached');
    }

    if (privacyLink && !privacyLink.dataset.listenerAttached) {
      privacyLink.addEventListener('click', handlePrivacySettings);
      privacyLink.dataset.listenerAttached = 'true';
      console.log('Privacy settings listener attached');
    }
  }

  /**
   * Auto-accept consent if user navigates away without making a choice
   */
  function handleBeforeUnload() {
    const consent = getConsent();
    const banner = getBanner();
    const bannerIsVisible = banner && !banner.classList.contains('hidden');

    // If banner was shown but user didn't make a choice, auto-accept
    if (!consent && bannerIsVisible) {
      console.log('User navigating away without choice - auto-accepting consent');
      saveConsent('accepted');
    }
  }

  /**
   * Initialize the consent manager
   */
  function init() {
    // Check if user has already made a choice
    const consent = getConsent();
    console.log('Initial consent status:', consent);

    // Set up event listeners (will retry if elements not ready)
    setupEventListeners();

    // Use MutationObserver to watch for dynamically loaded elements
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          setupEventListeners();
        }
      });
    });

    // Observe the document for changes
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    if (!consent) {
      // Show banner after a delay if no preference is set
      console.log('No consent preference found, will show banner');
      setTimeout(showBanner, BANNER_DISPLAY_DELAY);

      // Set up auto-accept on navigation
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes slideDown {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export functions for testing or manual control
  window.MMAnalyticsConsent = {
    getConsent,
    showBanner,
    hideBanner
  };
})();
