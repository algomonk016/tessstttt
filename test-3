/* eslint-disable */
class LimeChatWhatsapp {
  constructor({ accessToken: t, phoneNumber: e }) {
    console.log('[WhatsApp Widget] Constructor called with:', {
      accessToken: t,
      phoneNumber: e,
    });
    (this.accessToken = t),
      (this.phoneNumber = e),
      (this.getConfig = this.getConfig.bind(this)),
      (this.initializeWidget = this.initializeWidget.bind(this));

    // Timer tracking for cleanup
    this.appearanceTimers = new Set();
    this.mediaValidationTimers = new Set();
    this.popupTimers = new Set();

    // Bind cleanup to page unload
    window.addEventListener('beforeunload', () => this.cleanup());
    window.addEventListener('unload', () => this.cleanup());
  }
  // Hide widget icon and popup with transition based on side ('left' or 'right')
  hideWidgetWithTransition(side) {
    if (this.widgetContainer) {
      this.widgetContainer.style.transition =
        'opacity 0.3s ease-out, transform 0.3s ease-out';
      if (side === 'left') {
        this.widgetContainer.style.transform = 'translateX(-100%)';
      } else {
        this.widgetContainer.style.transform = 'translateX(100%)';
      }
      this.widgetContainer.style.opacity = '0';
      setTimeout(() => {
        this.widgetContainer.style.display = 'none';
      }, 300);
    }
    const popup = document.getElementById('whatsapp-first-time-popup');
    if (popup) {
      popup.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      if (side === 'left') {
        popup.style.transform = 'translateX(-100%)';
      } else {
        popup.style.transform = 'translateX(100%)';
      }
      popup.style.opacity = '0';
      setTimeout(() => {
        if (popup.parentNode) {
          popup.style.display = 'none';
        }
      }, 300);
    }
  }

  // Show widget icon and popup with transition based on side ('left' or 'right')
  showWidgetWithTransition(side) {
    if (this.widgetContainer) {
      this.widgetContainer.style.display = '';
      this.widgetContainer.style.transition =
        'opacity 0.3s ease-out, transform 0.3s ease-out';
      if (side === 'left') {
        this.widgetContainer.style.transform = 'translateX(-100%)';
      } else {
        this.widgetContainer.style.transform = 'translateX(100%)';
      }
      this.widgetContainer.style.opacity = '0';
      // Force reflow
      void this.widgetContainer.offsetWidth;
      this.widgetContainer.style.transform = 'translateX(0)';
      this.widgetContainer.style.opacity = '1';
    }
    const popup = document.getElementById('whatsapp-first-time-popup');
    if (popup) {
      popup.style.display = '';
      popup.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      if (side === 'left') {
        popup.style.transform = 'translateX(-100%)';
      } else {
        popup.style.transform = 'translateX(100%)';
      }
      popup.style.opacity = '0';
      // Force reflow
      void popup.offsetWidth;
      popup.style.transform = 'translateX(0)';
      popup.style.opacity = '1';
    }
  }

  async getConfig() {
    try {
      const t = await fetch(
        `https://app-whatsapp-widget.limechat.ai/api/getWidgetConfig/${this.phoneNumber}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${this.accessToken}` },
        }
      );
      if (!t.ok) throw new Error(`Error fetching config: ${t.status}`);
      const e = await t.json();

      // Handle popup_configs if available
      if (e.popup_configs) {
        this.popup_configs =
          typeof e.popup_configs === 'string'
            ? JSON.parse(e.popup_configs)
            : e.popup_configs;
      }
      this.popup_message_enabled = e.popup_message_enabled || false;

      return Object.assign(this, e), e;
    } catch (t) {
      return console.error('Error fetching config:', t), null;
    }
  }
  async initializeWidget() {
    console.log('[WhatsApp Widget] Initializing widget...');
    const config = await this.getConfig();
    console.log('[WhatsApp Widget] Config received:', config);
    if (config) {
      this.renderWidget();
    } else {
      console.error('[WhatsApp Widget] Failed to get config');
    }
  }
  deviceCheck(t) {
    const e = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    return (
      ('desktop' === t && !e) ||
      !('mobile' !== t || !e) ||
      'both' === t ||
      void 0
    );
  }
  titleCase(t) {
    const e = t.toLowerCase().split(' ');
    for (let t = 0; t < e.length; t++)
      e[t] = e[t].charAt(0).toUpperCase() + e[t].substring(1);
    return e.join(' ');
  }
  renderWidget() {
    console.log('[WhatsApp Widget] renderWidget called');
    console.log('[WhatsApp Widget] display_on:', this.display_on);
    const deviceCheckResult = this.deviceCheck(this.display_on);
    console.log('[WhatsApp Widget] deviceCheck result:', deviceCheckResult);
    if (deviceCheckResult) {
      this.renderButton();
    } else {
      console.log(
        '[WhatsApp Widget] Device check failed, not rendering button'
      );
    }
  }
  pageCheck(t) {
    console.log('[WhatsApp Widget] pageCheck called with pages:', t);
    console.log(
      '[WhatsApp Widget] Current pathname:',
      window.location.pathname
    );
    console.log('[WhatsApp Widget] isShopify:', this.isShopify);

    let e = !1;
    t.forEach((t) => {
      if ('homepage' == t && '/' == window.location.pathname) {
        console.log('[WhatsApp Widget] Matched homepage');
        e = !0;
      }
      if (
        'collections' == t &&
        (window.location.pathname.includes('/collections/') ||
          window.location.pathname === '/collections')
      ) {
        console.log('[WhatsApp Widget] Matched collections');
        e = !0;
      }
      if (
        'products' == t &&
        (window.location.pathname.includes('/products/') ||
          window.location.pathname === '/products')
      ) {
        console.log('[WhatsApp Widget] Matched products');
        e = !0;
      }
      if ('cart' == t && '/cart' == window.location.pathname) {
        console.log('[WhatsApp Widget] Matched cart');
        e = !0;
      }
      if (
        'pages' == t &&
        (window.location.pathname.includes('/pages/') ||
          window.location.pathname === '/pages')
      ) {
        console.log('[WhatsApp Widget] Matched pages');
        e = !0;
      }
      if ('checkout' == t && window.location.pathname.includes('/checkouts/')) {
        console.log('[WhatsApp Widget] Matched checkout');
        e = !0;
      }
      if (
        'blogs' == t &&
        (window.location.pathname.includes('/blogs/') ||
          window.location.pathname === '/blogs')
      ) {
        console.log('[WhatsApp Widget] Matched blogs');
        e = !0;
      }
    });

    const result = e || !this.isShopify;
    console.log(
      '[WhatsApp Widget] pageCheck result:',
      result,
      '(matched:',
      e,
      ', non-shopify override:',
      !this.isShopify,
      ')'
    );
    return result;
  }
  getParameterByName(t, e) {
    t = t.replace(/[\[\]]/g, '\\$&');
    const s = new RegExp(`[?&]${t}(=([^&#]*)|&|#|$)`).exec(e);
    return s
      ? s[2]
        ? decodeURIComponent(s[2].replace(/\+/g, ' '))
        : ''
      : null;
  }

  appendCurrentUrl(t) {
    return this.utm_for_widget
      ? `Hi, I was browsing ${encodeURIComponent(window.location.href)} and have a few questions`
      : t;
  }

  // Main popup creation method
  createFirstTimePopup() {
    if (!this.popup_message_enabled || !this.popup_configs) {
      return;
    }

    const config = this.getPopupConfig();

    if (!config) return;

    // Validate if popup has any meaningful content before creating it
    if (!this.hasValidPopupContent(config)) {
      return;
    }

    const popupContainer = this.createPopupContainer();
    const popupContent = this.createPopupContent(config);

    popupContainer.appendChild(popupContent);
    this.positionAndShowPopup(popupContainer, config);
    this.setupPopupBehavior(popupContainer, config);
    this.setupEventListeners(popupContainer, config);
  }

  // Validate if popup has meaningful content
  hasValidPopupContent(config) {
    const hasValidCta = config.cta && config.cta.trim() !== '';
    const hasValidMediaHeader =
      config.media_header && config.media_header.trim() !== '';
    const hasValidHeader = config.header && config.header.trim() !== '';
    const hasValidTitle = config.title && config.title.trim() !== '';
    const hasValidBody = config.body && config.body.trim() !== '';

    // Return true if at least one field has valid content
    return (
      hasValidCta ||
      hasValidMediaHeader ||
      hasValidHeader ||
      hasValidTitle ||
      hasValidBody
    );
  }

  // Get appropriate config based on device
  getPopupConfig() {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    return isMobile ? this.popup_configs.mobile : this.popup_configs.desktop;
  }

  // Create main popup container
  createPopupContainer() {
    const popupContainer = document.createElement('div');
    popupContainer.id = 'whatsapp-first-time-popup';
    popupContainer.className = 'whatsapp-first-time-popup';
    return popupContainer;
  }

  // Create popup content with all elements
  createPopupContent(config) {
    const popupContent = document.createElement('div');
    popupContent.className = 'whatsapp-popup-content';

    popupContent.appendChild(this.createCloseButton());

    // Create a placeholder for media that will be inserted at the correct position
    const mediaPlaceholder = document.createElement('div');
    mediaPlaceholder.className = 'whatsapp-media-placeholder';
    popupContent.appendChild(mediaPlaceholder);

    // Add text content if any text exists
    const hasText = config.header || config.body || config.cta;
    if (hasText) {
      popupContent.appendChild(this.createTextContainer(config));
    }

    // Add media (image or video) if provided and valid - insert at placeholder position
    if (config.media_header?.trim() !== '') {
      if (config.popup_type === 'video') {
        this.validateAndCreateVideo(
          config.media_header,
          popupContent,
          mediaPlaceholder
        );
      } else {
        this.validateAndCreateImage(config.media_header, () => {
          const imageContainer = this.createImageContainer(config.media_header);

          if (config.header || config.body) {
            this.validateAndCreateCompanyImage(config.company_image, () => {
              const companyImageContainer = this.createCompanyImageContainer(
                config.company_image
              );
              imageContainer.appendChild(companyImageContainer);
              popupContent.classList.add('whatsapp-has-company-image');
            });
          }

          popupContent.insertBefore(imageContainer, mediaPlaceholder);
          popupContent.removeChild(mediaPlaceholder);
        });
      }
    } else {
      // Remove placeholder if no media
      popupContent.removeChild(mediaPlaceholder);
    }

    return popupContent;
  }

  // Create close button
  createCloseButton() {
    const closeButton = document.createElement('span');
    closeButton.id = 'whatsapp-close-popup';
    closeButton.className = 'whatsapp-popup-close-button';
    closeButton.textContent = '✕';
    return closeButton;
  }

  // Validate URL format
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  validateAndCreateImage = (imageSrc, callback) => {
    if (!this.isValidUrl(imageSrc)) {
      // eslint-disable-next-line no-console
      console.warn('Invalid image URL format:', imageSrc);
      return;
    }

    const img = new Image();
    img.onload = () => callback();
    // eslint-disable-next-line no-console
    img.onerror = () => console.warn('Failed to load image:', imageSrc);

    const timerId = setTimeout(() => {
      if (!img.complete) {
        // eslint-disable-next-line no-console
        console.warn('Image loading timeout:', imageSrc);
      }
      this.mediaValidationTimers.delete(timerId);
    }, 10000);

    this.mediaValidationTimers.add(timerId);

    img.src = imageSrc;
  };

  // Validate and create video with error handling
  validateAndCreateVideo(videoSrc, popupContent, mediaPlaceholder) {
    if (!this.isValidUrl(videoSrc)) {
      console.warn('Invalid video URL format:', videoSrc);
      if (mediaPlaceholder && mediaPlaceholder.parentNode) {
        popupContent.removeChild(mediaPlaceholder);
      }
      return;
    }

    const video = document.createElement('video');

    video.onloadedmetadata = () => {
      const videoContainer = this.createVideoContainer(videoSrc);
      if (mediaPlaceholder && mediaPlaceholder.parentNode) {
        popupContent.insertBefore(videoContainer, mediaPlaceholder);
        popupContent.removeChild(mediaPlaceholder);
      } else {
        popupContent.appendChild(videoContainer);
      }
    };

    video.onerror = () => {
      console.warn('Failed to load video:', videoSrc);
      if (mediaPlaceholder && mediaPlaceholder.parentNode) {
        popupContent.removeChild(mediaPlaceholder);
      }
    };

    video.onabort = () => {
      console.warn('Video loading aborted:', videoSrc);
      if (mediaPlaceholder && mediaPlaceholder.parentNode) {
        popupContent.removeChild(mediaPlaceholder);
      }
    };

    // Set a timeout to prevent hanging
    const timerId = setTimeout(() => {
      if (video.readyState === 0) {
        console.warn('Video loading timeout:', videoSrc);
        if (mediaPlaceholder && mediaPlaceholder.parentNode) {
          popupContent.removeChild(mediaPlaceholder);
        }
      }
      this.mediaValidationTimers.delete(timerId);
    }, 15000); // 15 second timeout for videos

    this.mediaValidationTimers.add(timerId);

    // Start loading the video
    video.src = videoSrc;
    video.load(); // Explicitly trigger loading
  }

  // Create image container
  createImageContainer(imageSrc) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'whatsapp-popup-image-container';

    const popupImage = document.createElement('img');
    popupImage.className = 'whatsapp-popup-image';
    popupImage.src = imageSrc;
    popupImage.alt = 'Popup image';

    imageContainer.appendChild(popupImage);
    return imageContainer;
  }

  // Create video container
  createVideoContainer(videoSrc) {
    const videoContainer = document.createElement('div');
    videoContainer.className = 'whatsapp-popup-image-container'; // Use same styling as image

    const popupVideo = document.createElement('video');
    popupVideo.className = 'whatsapp-popup-image'; // Use same styling as image
    popupVideo.src = videoSrc;
    popupVideo.autoplay = true;
    popupVideo.muted = true; // Required for autoplay in most browsers
    popupVideo.loop = true;
    popupVideo.playsInline = true; // Better mobile support
    popupVideo.controls = false; // No controls for cleaner look
    popupVideo.setAttribute('preload', 'auto');

    videoContainer.appendChild(popupVideo);
    return videoContainer;
  }

  // Create text container with header, body, and CTA
  createTextContainer(config) {
    const textContainer = document.createElement('div');
    textContainer.className = 'whatsapp-popup-text-container';

    // Create wrapper for header and body with horizontal padding
    if (config.header || config.body) {
      const textContentWrapper = document.createElement('div');
      textContentWrapper.className = 'whatsapp-popup-text-content';

      if (config.header) {
        const header = document.createElement('h3');
        header.className = 'whatsapp-popup-header';
        header.textContent = config.header;
        textContentWrapper.appendChild(header);
      }

      if (config.body) {
        const bodyText = document.createElement('p');
        bodyText.className = 'whatsapp-popup-body';
        bodyText.textContent = config.body;
        textContentWrapper.appendChild(bodyText);
      }

      textContainer.appendChild(textContentWrapper);
    }

    // Add CTA button if provided
    if (config.cta) {
      const ctaContainer = document.createElement('div');
      ctaContainer.className = 'whatsapp-popup-cta-container';

      const ctaButton = document.createElement('button');
      ctaButton.id = 'whatsapp-cta-button';
      ctaButton.className = 'whatsapp-popup-cta-button';
      ctaButton.textContent = config.cta;

      ctaContainer.appendChild(ctaButton);
      textContainer.appendChild(ctaContainer);
    }

    return textContainer;
  }

  // Create company image container
  createCompanyImageContainer(companySrc) {
    const companyImageContainer = document.createElement('div');
    companyImageContainer.className = 'whatsapp-popup-company-image-container';

    const companyImage = document.createElement('img');
    companyImage.className = 'whatsapp-popup-company-image';
    companyImage.src = companySrc;
    companyImage.alt = 'Company logo';

    companyImageContainer.appendChild(companyImage);
    return companyImageContainer;
  }

  // Position popup and add to DOM
  positionAndShowPopup(popupContainer, config) {
    const widgetRoot = document.querySelector('.WhatsAppButton__root');

    if (widgetRoot) {
      this.addPositioningClasses(popupContainer, config);
      widgetRoot.parentNode.insertBefore(popupContainer, widgetRoot);
    } else {
      document.body.appendChild(popupContainer);
    }

    this.addPopupStyles(undefined, config);
    this.showPopupWithDelay(popupContainer, config);
  }

  // Add positioning CSS classes
  addPositioningClasses(popupContainer, config) {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const position = isMobile ? this.position_mobile : this.position_desktop;
    const messagePosition = config.message_position || 'top';

    popupContainer.className += ` whatsapp-popup-${messagePosition}-${position}`;

    if (config.popup_type) {
      popupContainer.className += ` popup-type-${config.popup_type}`;
    }
  }

  // Show popup with configured delay
  showPopupWithDelay(popupContainer, config) {
    const appearDelay = config.time_to_appear
      ? parseInt(config.time_to_appear, 10)
      : 1; // Reduced from 3 to 1 second for easier testing

    const timerId = setTimeout(() => {
      popupContainer.style.opacity = '1';
      popupContainer.style.transform = 'translateY(0)';

      // Start disappear timer AFTER popup becomes visible
      if (
        popupContainer._disappearTimer &&
        popupContainer._disappearTimer.start
      ) {
        popupContainer._disappearTimer.start();
      }

      this.appearanceTimers.delete(timerId);
    }, appearDelay * 1000);

    this.appearanceTimers.add(timerId);
  }

  // Setup popup behavior (auto-hide, scroll behavior)
  setupPopupBehavior(popupContainer, config) {
    let disappearTimer = null;

    // Handle auto-disappear with hover pause/restart
    if (config.time_to_disappear) {
      const timerDuration = parseInt(config.time_to_disappear, 10) * 1000;

      const startTimer = () => {
        // Clear any existing timer first
        if (disappearTimer) {
          clearTimeout(disappearTimer);
        }
        disappearTimer = setTimeout(() => {
          this.closePopupGracefully(popupContainer);
        }, timerDuration);
      };

      const pauseTimer = () => {
        if (disappearTimer) {
          clearTimeout(disappearTimer);
          disappearTimer = null;
        }
      };

      const restartTimer = () => {
        if (!disappearTimer) {
          startTimer();
        }
      };

      // Don't start timer immediately - wait for popup to be visible
      // startTimer(); // Removed this line

      // Add hover event listeners
      popupContainer.addEventListener('mouseenter', pauseTimer);
      popupContainer.addEventListener('mouseleave', restartTimer);

      // Store timer functions for cleanup
      const timerControls = {
        start: startTimer, // Add start function to be called after popup appears
        pause: pauseTimer,
        restart: restartTimer,
        clear: () => {
          if (disappearTimer) {
            clearTimeout(disappearTimer);
            disappearTimer = null;
          }
        },
      };

      popupContainer._disappearTimer = timerControls;
      this.popupTimers.add(timerControls);
    }
  }

  // Setup event listeners for popup interactions
  setupEventListeners(popupContainer, config) {
    // Look for close button in both the popup container and content
    const closeButton = popupContainer.querySelector('#whatsapp-close-popup');
    const ctaButton = popupContainer.querySelector('#whatsapp-cta-button');

    // Close button handler
    if (closeButton) {
      closeButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closePopupGracefully(popupContainer);
      });
    }

    // CTA button handler
    if (ctaButton) {
      ctaButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleCtaClick(popupContainer);
      });
    }

    // Make entire popup clickable if no CTA or if it's a video popup
    if (!config.cta || config.popup_type === 'video') {
      popupContainer.addEventListener('click', (e) => {
        if (
          e.target.id !== 'whatsapp-close-popup' &&
          e.target.closest('#whatsapp-close-popup') === null
        ) {
          this.closePopupGracefully(popupContainer);
          this.openWhatsApp(
            config.popup_type === 'video' ? 'video_popup_click' : 'popup_click'
          );
        }
      });
    }
  }

  // Handle CTA click - close popup and open WhatsApp
  handleCtaClick(popupContainer) {
    this.closePopupGracefully(popupContainer);
    this.openWhatsApp('popup_cta');
  }

  // Centralized method to open WhatsApp with logging
  openWhatsApp(source = 'widget_icon') {
    this.logWidgetClick(source);
    const whatsappLink = document.querySelector('.WhatsAppButton__root a');
    if (whatsappLink) {
      window.open(whatsappLink.href, '_blank');
    }
  }

  // Generate or retrieve session ID
  getSessionId() {
    let sessionId = sessionStorage.getItem('limechat_widget_session_id');
    if (!sessionId) {
      // Generate a random 12-character session ID
      sessionId = Math.random().toString(36).substring(2, 14);
      sessionStorage.setItem('limechat_widget_session_id', sessionId);
    }
    return sessionId;
  }

  // Detect device type
  getDeviceType() {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    return isMobile ? 'mobile' : 'desktop';
  }

  async logWidgetClick(source) {
    try {
      // Get inbox_id from widget config
      const configResponse = await fetch(
        `https://app.limechat.ai/widget_config?website_token=${this.accessToken}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!configResponse.ok) {
        throw new Error(`Config API failed: ${configResponse.status}`);
      }

      const configData = await configResponse.json();
      const inboxId = configData.inbox_id;

      if (!inboxId) {
        throw new Error('inbox_id not found in config response');
      }

      // Send widget click event
      const sessionId = this.getSessionId();
      const deviceType = this.getDeviceType();

      const clickEventPayload = {
        session_id: sessionId,
        inbox_id: inboxId,
        device_type: deviceType,
      };

      const clickEventResponse = await fetch(
        'https://app.limechat.ai/api/v1/widget/widget_click_events',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clickEventPayload),
        }
      );

      if (!clickEventResponse.ok) {
        throw new Error(`Click event API failed: ${clickEventResponse.status}`);
      }
    } catch (error) {
      console.warn('Failed to send analytics:', error);
    }
  }

  closePopupGracefully(popupContainer) {
    if (popupContainer && popupContainer.parentNode) {
      // Clear any active disappear timer
      if (popupContainer._disappearTimer) {
        popupContainer._disappearTimer.clear();
        this.popupTimers.delete(popupContainer._disappearTimer);
      }

      // Add hidden class for transition
      popupContainer.classList.add('whatsapp-popup-hidden');
      setTimeout(() => {
        if (popupContainer.parentNode) {
          popupContainer.parentNode.removeChild(popupContainer);
        }
      }, 300);
    }
  }

  addPopupStyles(widgetColor = '#25d366', config = {}) {
    // Avoid adding styles multiple times
    if (document.getElementById('whatsapp-popup-styles')) {
      return;
    }

    // Calculate dynamic positioning based on widget configuration
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const gap = 10; // Gap between widget and popup

    // Helper function to calculate positioning for a specific device
    const calculatePositions = (margins, widgetSize) => {
      const { bottom, left, right } = margins;

      return {
        // When popup appears above widget (top position)
        topPosition: {
          bottom: bottom + widgetSize,
          left,
          right,
        },
        // When popup appears beside widget (side position)
        sidePosition: {
          bottom: bottom,
          left: left + widgetSize + gap,
          right: right + widgetSize + gap,
        },
      };
    };

    // Desktop configuration
    const desktopMargins = {
      bottom: parseInt(this.bottom_margin_desktop || 24),
      left: parseInt(this.left_margin_desktop || 24),
      right: parseInt(this.right_margin_desktop || 24),
    };

    const desktopWidgetSize = parseInt(this.display_size_desktop || 60);
    const desktopPositions = calculatePositions(
      desktopMargins,
      desktopWidgetSize
    );

    // Mobile configuration
    const mobileMargins = {
      bottom: parseInt(this.bottom_margin_mobile || 24),
      left: parseInt(this.left_margin_mobile || 24),
      right: parseInt(this.right_margin_mobile || 24),
    };

    const mobileWidgetSize = parseInt(this.display_size_mobile || 60);
    const mobilePositions = calculatePositions(mobileMargins, mobileWidgetSize);

    const styleElement = document.createElement('style');
    styleElement.id = 'whatsapp-popup-styles';
    styleElement.textContent = `
      .whatsapp-first-time-popup {
        position: fixed;
        z-index: 999999;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
        max-width: 200px;
        background-color: transparent;
        overflow: visible;
        padding: 15px;
      }

      .whatsapp-first-time-popup.whatsapp-popup-hidden {
        opacity: 0;
        transform: translateY(20px);
      }

      /* Video popup specific styling for desktop */
      .whatsapp-first-time-popup.popup-type-video {
        max-width: 251px;
        padding: 4px;
      }

      .whatsapp-popup-top-right {
        bottom: ${desktopPositions.topPosition.bottom}px;
        right: ${desktopPositions.topPosition.right}px;
      }

      .whatsapp-popup-top-left {
        bottom: ${desktopPositions.topPosition.bottom}px;
        left: ${desktopPositions.topPosition.left}px;
      }

      .whatsapp-popup-side-right {
        bottom: ${desktopPositions.sidePosition.bottom}px;
        right: ${desktopPositions.sidePosition.right}px;
      }

      .whatsapp-popup-side-left {
        bottom: ${desktopPositions.sidePosition.bottom}px;
        left: ${desktopPositions.sidePosition.left}px;
      }

      .whatsapp-popup-content {
        position: relative;
        padding: 5px;
        background-color: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        overflow: visible;
      }

      /* Video popup content styling for desktop */
      .popup-type-video .whatsapp-popup-content {
        width: 172px;
        height: 262px;
        display: flex;
        flex-direction: column;
      }

      .whatsapp-popup-close-button {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        position: absolute;
        top: -12px;
        right: -10px;
        background-color: white;
        color: #808975;
        font-size: 12px;
        font-weight: normal;
        line-height: 1;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 0.5px solid silver;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        user-select: none;
      }

      .whatsapp-popup-close-button:hover {
        background-color: #e0e0e0;
      }

      .whatsapp-popup-image-container {
        width: 100%;
        height: 90px;
        border-radius: 10px;
        position: relative;
      }

      /* Video container styling for desktop */
      .popup-type-video .whatsapp-popup-image-container {
        flex: 1;
        position: relative;
      }

      .whatsapp-popup-image {
        width: 100%;
        height: 100%;
        border-radius: 10px;
        object-fit: cover;
      }

      .whatsapp-popup-text-container {
        padding: 0px;
      }

      .whatsapp-popup-text-content {
        padding: 0px 8px;
      }

      .whatsapp-popup-company-image-container {
        position: absolute;
        bottom: -16px;
        left: 50%;
        transform: translateX(-50%);
      }

      .whatsapp-popup-company-image {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid #fff;
      }

      /* Adjust spacing when company image is present */
      .whatsapp-popup-content.whatsapp-has-company-image .whatsapp-popup-text-content {
        padding-top: 10px;
      }

      .whatsapp-popup-header {
        font-size: 12px;
        font-weight: 600;
        margin: 8px 0px 4px 0px;
        padding: 0px;
        letter-spacing: 0.2px;
        line-height: 1.4;
        color: #262626;
      }

      /* Add bottom margin to header only if there's content after it */
      .whatsapp-popup-header + .whatsapp-popup-body {
        margin-top: 8px;
      }

      .whatsapp-popup-body {
        margin: 4px 0px;
        padding: 0px;
        font-size: 11px;
        font-weight: 400;
        color: #434343;
        line-height: 18px;
      }

      /* Add bottom margin to text content wrapper if there's CTA after it */
      .whatsapp-popup-text-content + .whatsapp-popup-cta-container {
        margin-top: 8px;
      }

      .whatsapp-popup-cta-container {
        margin: 0;
      }

      .whatsapp-popup-cta-button {
        width: 100%;
        background-color: ${widgetColor};
        color: white;
        border: none;
        border-radius: 8px;
        padding: 10px 16px;
        font-weight: 600;
        font-size: 12px;
        text-align: center;
        text-transform: capitalize;
        line-height: 20px;
        cursor: pointer;
      }

      .whatsapp-popup-cta-button:hover {
        opacity: 0.9;
      }

      /* Remove any triangle/pointer styles */
      .whatsapp-first-time-popup::before,
      .whatsapp-first-time-popup::after {
        content: none !important;
        display: none !important;
      }

      /* Mobile adjustments */
      @media (max-width: 670px) {
        .whatsapp-first-time-popup {
          max-width: 200px;
          padding: 12px;
        }

        /* Video popup specific styling for mobile */
        .whatsapp-first-time-popup.popup-type-video {
          max-width: 172px;
          padding: 4px;
        }

        /* Video popup content styling for mobile */
        .popup-type-video .whatsapp-popup-content {
          width: 172px;
          height: 262px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
        }

        /* Video container styling for mobile */
        .popup-type-video .whatsapp-popup-image-container {
          flex: 1;
          border-radius: 12px;
          overflow: hidden;
        }

        .whatsapp-popup-top-right {
          bottom: ${mobilePositions.topPosition.bottom}px;
          right: ${mobilePositions.topPosition.right}px;
        }

        .whatsapp-popup-top-left {
          bottom: ${mobilePositions.topPosition.bottom}px;
          left: ${mobilePositions.topPosition.left}px;
        }

        .whatsapp-popup-side-right {
          bottom: ${mobilePositions.sidePosition.bottom}px;
          right: ${mobilePositions.sidePosition.right}px;
        }

        .whatsapp-popup-side-left {
          bottom: ${mobilePositions.sidePosition.bottom}px;
          left: ${mobilePositions.sidePosition.left}px;
        }
      }
    `;
    document.head.appendChild(styleElement);
  }

  renderButton() {
    console.log('[WhatsApp Widget] renderButton called');
    console.log('[WhatsApp Widget] pages_to_display:', this.pages_to_display);

    const pageCheckResult = this.pageCheck(this.pages_to_display);
    const shouldRender = pageCheckResult || !this.isShopify;

    console.log('[WhatsApp Widget] pageCheck result:', pageCheckResult);
    console.log('[WhatsApp Widget] Should render:', shouldRender);

    if (shouldRender) {
      console.log('[WhatsApp Widget] Proceeding to render button...');
      const i = document.createElement('script');
      i.setAttribute('src', 'https://kit.fontawesome.com/2640aa91b4.js'),
        document.body.appendChild(i);
      const o = document.createElement('link');
      o.setAttribute(
        'href',
        'https://fonts.googleapis.com/css2?family=Lato&family=Roboto&display=swap'
      ),
        o.setAttribute('rel', 'stylesheet'),
        document.body.appendChild(o);
      const p = document.createElement('link');
      p.setAttribute(
        'href',
        'https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/whatsapp_widget/LC_whatsapp_stylesheet.css'
      ),
        p.setAttribute('rel', 'stylesheet'),
        p.setAttribute('type', 'text/css'),
        document.body.appendChild(p);
      const a = 1e3 !== this.zIndex ? this.zIndex : 1e3,
        l = document.createElement('div');
      (l.className = 'WhatsAppButton__root'),
        console.log(
          '[WhatsApp Widget] Creating widget container with z-index:',
          a
        ),
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
          ? 'left' === this.position_mobile
            ? l.setAttribute(
                'style',
                `position: fixed; bottom: ${this.bottom_margin_mobile}px; left: ${this.left_margin_mobile}px; z-index: ${a};`
              )
            : l.setAttribute(
                'style',
                `position: fixed; bottom: ${this.bottom_margin_mobile}px; right: ${this.right_margin_mobile}px; z-index: ${a};`
              )
          : 'left' === this.position_desktop
            ? l.setAttribute(
                'style',
                `position: fixed; bottom: ${this.bottom_margin_desktop}px; left: ${this.left_margin_desktop}px; z-index: ${a};`
              )
            : l.setAttribute(
                'style',
                `position: fixed; bottom: ${this.bottom_margin_desktop}px; right: ${this.right_margin_desktop}px; z-index: ${a};`
              ),
        document.body.appendChild(l);
      console.log('[WhatsApp Widget] Widget container appended to body');
      const n = document.createElement('a'),
        h = document.createElement('a');
      console.log('[WhatsApp Widget] Created WhatsApp link elements');
      if (
        window.location.pathname.includes('/products/') &&
        '' !== this.pdp_prefill_text &&
        this.isShopify &&
        ((window.location.href.includes('variant') && !this.includeVariant) ||
          (!window.location.href.includes('variant') && this.includeVariant) ||
          (!window.location.href.includes('variant') && !this.includeVariant))
      ) {
        const i = window.location.href,
          o = i.split('/products/');
        let p = '';
        if (o[1].includes('?')) {
          p = o[1].split('?')[0];
        } else p = o[1];
        var t = p.replace(/\-/g, ' ').replace(/\//g, ''),
          e = `${p}.xml`;
        e = i.replace(p, e);
        var s = this.titleCase(t);
        fetch(e).then((t) => {
          t.text()
            .then((t) => new DOMParser().parseFromString(t, 'text/xml'))
            .then((t) => t.querySelector('title'))
            .then((t) => t.textContent)
            .then((t) => {
              t = t.replaceAll('&', '%26');
              try {
                let e = this.appendCurrentUrl(`${this.pdp_prefill_text} ${t}`);
                n.setAttribute('href', `https://wa.me/${this.phone}?text=${e}`),
                  h.setAttribute(
                    'href',
                    `https://wa.me/${this.phone}?text=${e}`
                  );
              } catch (t) {
                let e = this.appendCurrentUrl(`${this.pdp_prefill_text} ${s}`);
                n.setAttribute('href', `https://wa.me/${this.phone}?text=${e}`),
                  h.setAttribute(
                    'href',
                    `https://wa.me/${this.phone}?text=${e}`
                  );
              }
            });
        });
      } else if (
        window.location.pathname.includes('/collections/') &&
        !window.location.pathname.includes('/products/') &&
        this.isShopify
      ) {
        const e = window.location.href.split('collections/');
        let s = '';
        if (e[1].includes('?')) {
          s = e[1].split('?')[0];
        } else s = e[1];
        t = s.replace(/\-/g, ' ').replace(/\//g, '');
        const i = this.titleCase(t),
          o = this.appendCurrentUrl('Hey! I would like to know more about');
        n.setAttribute('href', `https://wa.me/${this.phone}?text=${o} ${i}`),
          h.setAttribute('href', `https://wa.me/${this.phone}?text=${o} ${i}`);
      } else if (
        window.location.pathname.includes('/products/') &&
        window.location.href.includes('variant') &&
        '' !== this.pdp_prefill_text &&
        this.isShopify &&
        this.includeVariant
      ) {
        const i = window.location.href,
          o = i.split('products/');
        let p = '';
        if (o[1].includes('?')) {
          p = o[1].split('?')[0];
        } else p = o[1];
        (t = p.replace(/\-/g, ' ').replace(/\//g, '')), (e = `${p}.xml`);
        e = i.replace(p, e);
        s = this.titleCase(t);
        const a = this.getParameterByName('variant', window.location.href);
        fetch(e)
          .then((t) => {
            t.text()
              .then((t) => new DOMParser().parseFromString(t, 'text/xml'))
              .then((t) => [
                t.querySelectorAll('variant'),
                t.querySelector('title'),
              ])
              .then((t) => {
                for (const e of t[0])
                  if (e.querySelector('id').textContent === a) {
                    const s = [];
                    let i = 1,
                      o = e.querySelector(`option${i}`);
                    for (; o; )
                      o.textContent && s.push(o.textContent),
                        i++,
                        (o = e.querySelector(`option${i}`));
                    return [s.join(' / '), t[1].textContent];
                  }
              })
              .then((t) => {
                try {
                  const e = t[0].replace(/\-/g, ' ').replace(/\//g, '');

                  const s = this.appendCurrentUrl(
                    `${this.pdp_prefill_text} ${t[1].replaceAll('&', '%26')} ${e}`
                  );
                  n.setAttribute(
                    'href',
                    `https://wa.me/${this.phone}?text=${s}`
                  ),
                    h.setAttribute(
                      'href',
                      `https://wa.me/${this.phone}?text=${s}`
                    );
                } catch (t) {
                  let e = this.appendCurrentUrl(
                    `${this.pdp_prefill_text} ${s}`
                  );
                  n.setAttribute(
                    'href',
                    `https://wa.me/${this.phone}?text=${e}`
                  ),
                    h.setAttribute(
                      'href',
                      `https://wa.me/${this.phone}?text=${e}`
                    );
                }
              });
          })
          .catch((t) => {
            n.setAttribute(
              'href',
              `https://wa.me/${this.phone}?text=${this.pdp_prefill_text} ${s}`
            ),
              h.setAttribute(
                'href',
                `https://wa.me/${this.phone}?text=${this.pdp_prefill_text} ${s}`
              );
          });
      } else {
        let t = this.appendCurrentUrl(this.prefill_text);
        n.setAttribute('href', `https://wa.me/${this.phone}?text=${t}`),
          h.setAttribute('href', `https://wa.me/${this.phone}?text=${t}`);
      }

      // Common attributes for all pages
      n.setAttribute('style', 'text-decoration: none');
      n.setAttribute('target', '_blank');

      // Add click logging to the main widget button
      n.addEventListener('click', (e) => {
        this.logWidgetClick('widget_icon');
      });

      console.log('[WhatsApp Widget] Appending link to widget container');
      l.appendChild(n);
      console.log('[WhatsApp Widget] Link appended successfully');
      h.setAttribute('target', '_blank');
      h.setAttribute('class', 'whatsapp__poweredBy');

      // Check if mobile device
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        // Mobile widget
        if ('widget_text' === this.widget_type_mobile) {
          const t = document.createElement('button');
          t.setAttribute('class', 'landbot-whatsapp__button'),
            t.setAttribute(
              'style',
              `min-width:${this.display_size_mobile}px; padding:${this.display_size_mobile / 16}px`
            ),
            n.appendChild(t);
          const e = document.createElement('i');
          e.setAttribute('class', 'fab fa-whatsapp'),
            e.setAttribute('style', 'font-size: 24px; margin-right: 5px'),
            t.appendChild(e);
          const s = document.createElement('p');
          s.setAttribute('style', 'margin: 0'),
            (s.innerText = this.button_message_mobile),
            t.appendChild(s),
            'left' === this.position_mobile &&
            'top' !== this.pop_up_message_position
              ? (h.setAttribute('class', 'whatsapp__poweredBy'),
                120 === this.display_size_mobile &&
                  (19 === this.button_message_mobile.length ||
                  20 === this.button_message_mobile.length
                    ? h.setAttribute(
                        'style',
                        `left: ${this.display_size_mobile + this.button_message_mobile.length + 40}px;`
                      )
                    : h.setAttribute(
                        'style',
                        `left: ${this.display_size_mobile + this.button_message_mobile.length + 12}px;`
                      )),
                140 === this.display_size_mobile &&
                  (19 === this.button_message_mobile.length ||
                  20 === this.button_message_mobile.length
                    ? h.setAttribute(
                        'style',
                        `left: ${this.display_size_mobile + this.button_message_mobile.length + 20}px;`
                      )
                    : h.setAttribute(
                        'style',
                        `left: ${this.display_size_mobile + this.button_message_mobile.length + 8}px;`
                      )),
                160 === this.display_size_mobile &&
                  (19 === this.button_message_mobile.length ||
                  20 === this.button_message_mobile.length
                    ? h.setAttribute(
                        'style',
                        `left: ${this.display_size_mobile + this.button_message_mobile.length + 10}px;`
                      )
                    : h.setAttribute(
                        'style',
                        `left: ${this.display_size_mobile + this.button_message_mobile.length + 8}px;`
                      )))
              : 'right' === this.position_mobile &&
                'top' !== this.pop_up_message_position &&
                (h.setAttribute(
                  'class',
                  'whatsapp__poweredBy whatsapp__poweredBySideLefty'
                ),
                120 === this.display_size_mobile &&
                  (19 === this.button_message_mobile.length ||
                  20 === this.button_message_mobile.length
                    ? h.setAttribute(
                        'style',
                        `right: ${this.display_size_mobile + this.button_message_mobile.length + 40}px;`
                      )
                    : h.setAttribute(
                        'style',
                        `right: ${this.display_size_mobile + this.button_message_mobile.length + 12}px;`
                      )),
                140 === this.display_size_mobile &&
                  (19 === this.button_message_mobile.length ||
                  20 === this.button_message_mobile.length
                    ? h.setAttribute(
                        'style',
                        `right: ${this.display_size_mobile + this.button_message_mobile.length + 20}px;`
                      )
                    : h.setAttribute(
                        'style',
                        `right: ${this.display_size_mobile + this.button_message_mobile.length + 8}px;`
                      )),
                160 === this.display_size_mobile &&
                  (19 === this.button_message_mobile.length ||
                  20 === this.button_message_mobile.length
                    ? h.setAttribute(
                        'style',
                        `right: ${this.display_size_mobile + this.button_message_mobile.length + 10}px;`
                      )
                    : h.setAttribute(
                        'style',
                        `right: ${this.display_size_mobile + this.button_message_mobile.length + 8}px;`
                      ))),
            'top' === this.pop_up_message_position &&
            'left' === this.position_mobile
              ? (h.setAttribute('class', 'whatsapp__poweredBy'),
                h.setAttribute(
                  'style',
                  `bottom: ${this.display_size_mobile / 2.5 + 2}px; left: 0px;`
                ))
              : 'top' === this.pop_up_message_position &&
                'right' === this.position_mobile &&
                (h.setAttribute(
                  'class',
                  'whatsapp__poweredBy whatsapp__poweredByTopRight'
                ),
                h.setAttribute(
                  'style',
                  `bottom: ${this.display_size_mobile / 2.5 + 2}px; right: 0px;`
                ));
        } else {
          const t = document.createElement('img');
          (t.src =
            this.widget_icon_mobile ||
            'https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/whatsapp_widget/media/LC_WA.png'),
            t.setAttribute(
              'style',
              `width:${this.display_size_mobile}px; opacity:1`
            ),
            t.setAttribute('alt', 'WhatsApp Icon'),
            n.appendChild(t),
            'left' === this.position_mobile &&
            'top' !== this.pop_up_message_position
              ? (h.setAttribute('class', 'whatsapp__poweredBy'),
                h.setAttribute(
                  'style',
                  `left: ${this.display_size_mobile + 12}px;`
                ))
              : 'right' === this.position_mobile &&
                'top' !== this.pop_up_message_position &&
                (h.setAttribute(
                  'class',
                  'whatsapp__poweredBy whatsapp__poweredBySideLefty'
                ),
                h.setAttribute(
                  'style',
                  `right: ${this.display_size_mobile + 12}px;`
                )),
            'top' === this.pop_up_message_position &&
            'left' === this.position_mobile
              ? (h.setAttribute('class', 'whatsapp__poweredBy'),
                h.setAttribute(
                  'style',
                  `bottom: ${this.display_size_mobile + 14}px; left: 0px;`
                ))
              : 'top' === this.pop_up_message_position &&
                'right' === this.position_mobile &&
                (h.setAttribute(
                  'class',
                  'whatsapp__poweredBy whatsapp__poweredByTopRight'
                ),
                h.setAttribute(
                  'style',
                  `bottom: ${this.display_size_mobile + 14}px; right: 0px;`
                ));
        }
      } else {
        // Desktop widget
        if ('widget_text' === this.widget_type_desktop) {
          const t = document.createElement('button');
          t.setAttribute('class', 'landbot-whatsapp__button'),
            t.setAttribute(
              'style',
              `min-width:${this.display_size_desktop}px; padding:${this.display_size_desktop / 16}px`
            ),
            n.appendChild(t);
          const e = document.createElement('i');
          e.setAttribute('class', 'fab fa-whatsapp'),
            e.setAttribute('style', 'font-size: 24px; margin-right: 5px'),
            t.appendChild(e);
          const s = document.createElement('p');
          s.setAttribute('style', 'margin: 0'),
            (s.innerText = this.button_message_desktop),
            t.appendChild(s),
            'left' === this.position_desktop &&
            'top' !== this.pop_up_message_position
              ? (h.setAttribute('class', 'whatsapp__poweredBy'),
                120 === this.display_size_desktop &&
                  (19 === this.button_message_desktop.length ||
                    this.button_message_desktop.length,
                  h.setAttribute('style', 'left: 110%;')),
                140 === this.display_size_desktop &&
                  (19 === this.button_message_desktop.length ||
                    this.button_message_desktop.length,
                  h.setAttribute('style', 'left: 110%;')),
                160 === this.display_size_desktop &&
                  (19 === this.button_message_desktop.length ||
                    this.button_message_desktop.length,
                  h.setAttribute('style', 'left: 110%;')))
              : 'right' === this.position_desktop &&
                'top' !== this.pop_up_message_position &&
                (h.setAttribute(
                  'class',
                  'whatsapp__poweredBy whatsapp__poweredBySideLefty'
                ),
                120 === this.display_size_desktop &&
                  (19 === this.button_message_desktop.length ||
                    this.button_message_desktop.length,
                  h.setAttribute('style', 'right: 110%;')),
                140 === this.display_size_desktop &&
                  (19 === this.button_message_desktop.length ||
                    this.button_message_desktop.length,
                  h.setAttribute('style', 'right: 110%;')),
                160 === this.display_size_desktop &&
                  (19 === this.button_message_desktop.length ||
                    this.button_message_desktop.length,
                  h.setAttribute('style', 'right: 110%;'))),
            'top' === this.pop_up_message_position &&
            'left' === this.position_desktop
              ? (h.setAttribute('class', 'whatsapp__poweredBy'),
                h.setAttribute(
                  'style',
                  `bottom: ${this.display_size_desktop / 2.7 + 2}px; left: 0px;`
                ))
              : 'top' === this.pop_up_message_position &&
                'right' === this.position_desktop &&
                (h.setAttribute(
                  'class',
                  'whatsapp__poweredBy whatsapp__poweredByTopRight'
                ),
                h.setAttribute(
                  'style',
                  `bottom: ${this.display_size_desktop / 2.7 + 2}px; right: 0px;`
                ));
        } else {
          const t = document.createElement('img');
          (t.src =
            this.widget_icon_desktop ||
            'https://s3.ap-south-1.amazonaws.com/cdn.limechat.ai/packs/js/whatsapp_widget/media/LC_WA.png'),
            t.setAttribute(
              'style',
              `width:${this.display_size_desktop}px; opacity:1`
            ),
            t.setAttribute('alt', 'WhatsApp Icon'),
            n.appendChild(t);
          console.log('[WhatsApp Widget] Desktop icon added to link'),
            'left' === this.position_desktop &&
            'top' !== this.pop_up_message_position
              ? (h.setAttribute('class', 'whatsapp__poweredBy'),
                h.setAttribute(
                  'style',
                  `left: ${this.display_size_desktop + 12}px; bottom: ${0.2 * this.display_size_desktop}px;`
                ))
              : 'right' === this.position_desktop &&
                'top' !== this.pop_up_message_position &&
                (h.setAttribute(
                  'class',
                  'whatsapp__poweredBy whatsapp__poweredBySideLefty'
                ),
                h.setAttribute(
                  'style',
                  `right: ${this.display_size_desktop + 12}px; bottom: ${0.2 * this.display_size_desktop}px;`
                )),
            'top' === this.pop_up_message_position &&
            'left' === this.position_desktop
              ? (h.setAttribute('class', 'whatsapp__poweredBy'),
                h.setAttribute(
                  'style',
                  `bottom: ${this.display_size_desktop + 12}px; left: 0px;`
                ))
              : 'top' === this.pop_up_message_position &&
                'right' === this.position_desktop &&
                (h.setAttribute(
                  'class',
                  'whatsapp__poweredBy whatsapp__poweredByTopRight'
                ),
                h.setAttribute(
                  'style',
                  `bottom: ${1.5 * this.display_size_desktop}px; right: 0px;`
                ));
        }
      }

      // Create the new first-time popup after widget is rendered
      setTimeout(() => {
        this.createFirstTimePopup();
      }, 500); // Small delay to ensure widget is fully rendered

      // Store reference to widget container for scroll-based hiding/showing
      this.widgetContainer = l;
      this.setupScrollHandler();

      console.log('[WhatsApp Widget] Widget rendering complete');
      console.log('[WhatsApp Widget] Widget container:', l);
      console.log(
        '[WhatsApp Widget] Widget visibility:',
        window.getComputedStyle(l).display
      );
    } else {
      console.log('[WhatsApp Widget] Widget not rendered - page check failed');
    }
  }

  cleanup() {
    // Clear appearance timers
    this.appearanceTimers.forEach((timerId) => clearTimeout(timerId));
    this.appearanceTimers.clear();

    // Clear media validation timers
    this.mediaValidationTimers.forEach((timerId) => clearTimeout(timerId));
    this.mediaValidationTimers.clear();

    // Clear popup timers
    this.popupTimers.forEach((timerRef) => {
      if (timerRef && timerRef.clear) {
        timerRef.clear();
      }
    });
    this.popupTimers.clear();
  }

  // Validate and create company image with error handling
  validateAndCreateCompanyImage(companySrc, callback) {
    if (!this.isValidUrl(companySrc)) {
      console.warn('Invalid company image URL format:', companySrc);
      return;
    }

    const img = new Image();
    img.onload = () => callback();
    img.onerror = () =>
      console.warn('Failed to load company image:', companySrc);

    const timerId = setTimeout(() => {
      if (!img.complete) {
        console.warn('Company image loading timeout:', companySrc);
      }
      this.mediaValidationTimers.delete(timerId);
    }, 10000);

    this.mediaValidationTimers.add(timerId);

    img.src = companySrc;
  }

  setupScrollHandler() {
    // Determine device type and corresponding hide-on-scroll flag
    const isMobileDevice =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    const shouldDisappear = isMobileDevice
      ? this.disappear_on_scroll_mobile
      : this.disappear_on_scroll_desktop;

    if (!shouldDisappear) {
      return;
    }

    // Use configuration scroll distance if provided, otherwise default to 100px
    const threshold = isMobileDevice
      ? this.scroll_distance_mobile || 100
      : this.scroll_distance_desktop || 100;

    let initialScrollY = window.pageYOffset;
    let isHidden = false;
    let showTimeoutId = null;

    window.addEventListener('scroll', () => {
      const currentY = window.pageYOffset;
      // If not already hidden and scrolled beyond threshold, hide widget
      if (!isHidden && Math.abs(currentY - initialScrollY) > threshold) {
        const side = isMobileDevice
          ? this.position_mobile
          : this.position_desktop;

        this.hideWidgetWithTransition(side);
        isHidden = true;
      }
      // When hidden, debounce showing until 1500ms after scrolling stops
      if (isHidden) {
        if (showTimeoutId) {
          clearTimeout(showTimeoutId);
        }
        showTimeoutId = setTimeout(() => {
          const side = isMobileDevice
            ? this.position_mobile
            : this.position_desktop;

          this.showWidgetWithTransition(side);
          isHidden = false;
          initialScrollY = window.pageYOffset;
        }, 1500);
      }
    });
  }
}
