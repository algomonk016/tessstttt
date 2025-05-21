import Cookies from 'js-cookie';
import { IFrameHelper } from '../sdk/IFrameHelper';
import { getBubbleView } from '../sdk/bubbleHelpers';
import md5 from 'md5';
const REQUIRED_USER_KEYS = ['avatar_url', 'email', 'name'];
const ALLOWED_USER_ATTRIBUTES = ['avatar_url', 'email', 'name'];
const WIDGET_Z_INDEX = 2147483647;

export const getUserCookieName = () => {
  const SET_USER_COOKIE_PREFIX = 'cw_user_';
  const { websiteToken: websiteIdentifier } = window.$chatwoot;
  return `${SET_USER_COOKIE_PREFIX}${websiteIdentifier}`;
};
export const getUserString = ({ identifier = '', user }) => {
  const userStringWithSortedKeys = ALLOWED_USER_ATTRIBUTES.reduce(
    (acc, key) => `${acc}${key}${user[key] || ''}`,
    ''
  );
  return `${userStringWithSortedKeys}identifier${identifier}`;
};
const computeHashForUserData = (...args) => md5(getUserString(...args));
// fallback image
const bubbleImg = 'https://ik.imagekit.io/3lj5qznld/LC%20Icon.svg';
export const hasUserKeys = (user) =>
  REQUIRED_USER_KEYS.reduce((acc, key) => acc || !!user[key], false);
const runSDK = async ({ baseUrl, websiteToken }) => {
  let config_url = `${baseUrl}/widget_config?website_token=${websiteToken}`;
  let default_config = {};
  let widgetColor = null;
  let homepopupsettingOptions = null;
  let closepopupsettingOptions = null;
  let firsttimepopupsettingOptions = null;
  let utm_for_widget = false;

  const fetchWidgetConfig = async () => {
    await fetch(config_url)
      .then((data) => data.json())
      .then((data) => {
        if (typeof data?.config === 'string') {
          default_config = JSON.parse(data?.config) || {};
        }
        widgetColor = data?.widget_color;
        firsttimepopupsettingOptions = data?.firsttimepopupsettingOptions;
        homepopupsettingOptions = data?.homepopupsettingOptions;
        closepopupsettingOptions = data?.closewidgetpopupsettingOptions;
        utm_for_widget = data?.utm_for_widget || false;
        return null;
      });
  };

  await fetchWidgetConfig();

  const chatwootSettings = window.chatwootSettings || default_config;
  window.$chatwoot = {
    baseUrl,
    hasLoaded: false,
    hideMessageBubble: chatwootSettings.hideMessageBubble || false,
    isOpen: false,
    position: chatwootSettings.position === 'left' ? 'left' : 'right',
    position_mobile:
      chatwootSettings.position_mobile === 'left' ? 'left' : 'right',
    websiteToken,
    locale: chatwootSettings.locale,
    type: getBubbleView(chatwootSettings.type),
    type_mobile: getBubbleView(chatwootSettings.type_mobile),
    launcherTitle: chatwootSettings.launcherTitle || '',
    launcherTitle_mobile: chatwootSettings.launcherTitle_mobile || '',
    bottomMargin: chatwootSettings.bottomMargin || 20,
    leftMargin: chatwootSettings.leftMargin || 20,
    rightMargin: chatwootSettings.rightMargin || 20,
    bottomMargin_mobile: chatwootSettings.bottomMargin_mobile || 20,
    leftMargin_mobile: chatwootSettings.leftMargin_mobile || 20,
    rightMargin_mobile: chatwootSettings.rightMargin_mobile || 20,
    showPopoutButton: chatwootSettings.showPopoutButton || false,
    bubbleImage: chatwootSettings.image || bubbleImg,
    defaultWidgetImage: !chatwootSettings.image,
    unreadPopup: chatwootSettings.unreadPopup || false,
    isEnabledOnDesktop: chatwootSettings.isEnabledOnDesktop || true,
    isEnabledOnMobile: chatwootSettings.isEnabledOnMobile || true,
    widgetBodyFont: chatwootSettings.widgetBodyFont || 'Lato',
    widgetBGColor: chatwootSettings.widgetBGColor || '#fafafa',
    botAvatarImage:
      chatwootSettings.botAvatarImage ||
      `https://ik.imagekit.io/limechatai/Ellipse_2-3_j9UWmYtQ6.png`,
    widgetZIndex: chatwootSettings.widgetZIndex || WIDGET_Z_INDEX,
    utm_for_widget,
    toggle() {
      IFrameHelper.events.toggleBubble();
    },
    setUser(identifier, user) {
      if (typeof identifier !== 'string' && typeof identifier !== 'number') {
        throw new Error('Identifier should be a string or a number');
      }
      if (!hasUserKeys(user)) {
        throw new Error(
          'User object should have one of the keys [avatar_url, email, name]'
        );
      }
      const userCookieName = getUserCookieName();
      const existingCookieValue = Cookies.get(userCookieName);
      const hashToBeStored = computeHashForUserData({ identifier, user });
      if (hashToBeStored === existingCookieValue) {
        return;
      }
      window.$chatwoot.identifier = identifier;
      window.$chatwoot.user = user;
      IFrameHelper.sendMessage('set-user', { identifier, user });
      Cookies.set(userCookieName, hashToBeStored, {
        expires: 365,
        sameSite: 'Lax',
      });
    },
    setCustomAttributes(customAttributes = {}) {
      if (!customAttributes || !Object.keys(customAttributes).length) {
        throw new Error('Custom attributes should have atleast one key');
      } else {
        IFrameHelper.sendMessage('set-custom-attributes', { customAttributes });
      }
    },
    deleteCustomAttribute(customAttribute = '') {
      if (!customAttribute) {
        throw new Error('Custom attribute is required');
      } else {
        IFrameHelper.sendMessage('delete-custom-attribute', {
          customAttribute,
        });
      }
    },
    setLabel(label = '') {
      IFrameHelper.sendMessage('set-label', { label });
    },
    removeLabel(label = '') {
      IFrameHelper.sendMessage('remove-label', { label });
    },
    setLocale(localeToBeUsed = 'en') {
      IFrameHelper.sendMessage('set-locale', { locale: localeToBeUsed });
    },
    reset() {
      if (window.$chatwoot.isOpen) {
        IFrameHelper.events.toggleBubble();
      }
      localStorage.removeItem('cw_conversation');
      Cookies.remove(getUserCookieName());
      const iframe = IFrameHelper.getAppFrame();
      iframe.src = IFrameHelper.getUrl({
        baseUrl: window.$chatwoot.baseUrl,
        websiteToken: window.$chatwoot.websiteToken,
      });
    },
  };
  IFrameHelper.createFrame({
    baseUrl,
    websiteToken,
    widgetColor,
    homepopupsettingOptions,
    closepopupsettingOptions,
    firsttimepopupsettingOptions,
  });
  document.querySelectorAll('.limechat_widget_toggle').forEach((el) => {
    el.onclick = () => {
      window.$chatwoot.toggle();
    };
  });
};
window.chatwootSDK = {
  run: runSDK,
};
