import {createIntl, createIntlCache} from 'react-intl'
import messages from 'assets/i18n/es/locale.json';

// This is optional but highly recommended
// since it prevents memory leak
const cache = createIntlCache();

const intl = createIntl({
  locale: 'es',
  messages: messages
}, cache);

export default intl;