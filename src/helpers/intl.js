import messages_pl from '../translation/pl.json';
import messages_en from '../translation/en.json';
import { createIntl, defineMessages } from 'react-intl';
import { getCookie } from './cookies';

export function getIntl() {
  const language = getCookie('locale');
  const locale = language !== null ? language : 'pl';
  const localeMessages = locale === 'pl' ? messages_pl : messages_en;
  const messages = defineMessages(localeMessages);
  const intl = createIntl({ locale, messages });
  return intl;
}
