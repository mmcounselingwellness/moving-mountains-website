/**
 * Google Analytics Manager
 * Conditionally loads Google Analytics based on user consent
 */

(function() {
  'use strict';

  const STORAGE_KEY = 'mm-analytics-consent';
  const GA_TRACKING_ID = 'G-PY8ER15JZK';

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
   * Disable Google Analytics tracking
   */
  function disableAnalytics() {
    // Set the GA opt-out property
    window['ga-disable-' + GA_TRACKING_ID] = true;

    // Clear any existing GA cookies
    const cookiesToClear = ['_ga', '_gat', '_gid'];
    cookiesToClear.forEach(cookieName => {
      document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    });

    console.log('Google Analytics has been disabled');
  }

  /**
   * Enable Google Analytics tracking
   */
  function enableAnalytics() {
    // Remove the opt-out property if it exists
    window['ga-disable-' + GA_TRACKING_ID] = false;

    // Initialize gtag if not already initialized
    if (!window.dataLayer) {
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA_TRACKING_ID);

      // Load the GA script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(script);

      console.log('Google Analytics has been enabled');
    }
  }

  /**
   * Initialize analytics based on consent
   */
  function init() {
    const consent = getConsent();

    if (consent === 'declined') {
      // User has explicitly declined - disable analytics
      disableAnalytics();
    } else if (consent === 'accepted') {
      // User has explicitly accepted (or auto-accepted) - enable analytics
      enableAnalytics();
    } else {
      // No preference set yet - disable analytics temporarily
      // Analytics will be auto-enabled when user navigates (implicit consent)
      disableAnalytics();
      console.log('Analytics disabled - awaiting user consent');
    }
  }

  /**
   * Listen for consent changes
   */
  function listenForConsentChanges() {
    // Listen for storage events from other tabs
    window.addEventListener('storage', function(e) {
      if (e.key === STORAGE_KEY) {
        if (e.newValue === 'accepted') {
          enableAnalytics();
        } else if (e.newValue === 'declined') {
          disableAnalytics();
        }
      }
    });

    // Listen for custom consent events in the same tab
    window.addEventListener('mm-consent-changed', function(e) {
      if (e.detail === 'accepted') {
        enableAnalytics();
        // Reload the page to ensure GA loads properly
        setTimeout(() => location.reload(), 500);
      } else if (e.detail === 'declined') {
        disableAnalytics();
      }
    });
  }

  // Initialize when script loads
  init();
  listenForConsentChanges();

  // Export for manual control
  window.MMAnalytics = {
    enable: enableAnalytics,
    disable: disableAnalytics,
    getConsent: getConsent
  };
})();
