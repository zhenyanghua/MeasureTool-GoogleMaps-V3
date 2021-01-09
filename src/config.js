import i18n from './i18n';

const defaultLangCode = 'en';

const getProp = (langCode, prop) => {
  if (i18n[langCode]) {
    return i18n[langCode][prop];
  }
  const code = langCode.split('-')[0];
  if (i18n[code]) {
    return i18n[code][prop];
  }
  return i18n[defaultLangCode][prop];
};

export const Config = {
  prefix: 'measure-tool',
  tooltipText1: (langCode = defaultLangCode) =>
    getProp(langCode, 'tooltipText1'),
  tooltipText2: (langCode = defaultLangCode) =>
    getProp(langCode, 'tooltipText2'),
};
