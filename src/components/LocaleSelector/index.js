import React from 'react';
import { connect } from 'react-redux';
import { useCookies } from 'react-cookie';
import { setUserLocale } from '../../store/reducers/user/action.js';
import { useIntl, FormattedMessage } from 'react-intl';
import enFlag from '../../assets/img/flag-uk.png';
import plFlag from '../../assets/img/flag-pl.png';
import './styles.scss';

const LocaleSelector = ({ setUserLocale }) => {
  const [cookies, setCookie] = useCookies(['locale']);
  const intl = useIntl();

  const handleLocaleChange = async (locale) => {
    await setCookie('locale', `${locale}`, {
      path: '/',
      expire: new Date(2147483647 * 1000).toUTCString(), // set late expiration date
    });
    await setUserLocale(locale);
    window.location.reload();
  };

  return (
    <div className="locale-selector" 
      onClick={intl.locale === 'en' ? () => handleLocaleChange('pl') : () => handleLocaleChange('en')} 
      title={intl.locale === 'en' ? "zmień język na polski" : "switch to english"}>
      <span><FormattedMessage id="settings.change-language" /></span>
      {intl.locale === 'en' ? <img className="country-flag-icon" src={plFlag} /> : <img className="country-flag-icon" src={enFlag} />}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setUserLocale: (locale) => dispatch(setUserLocale(locale)),
});

export default connect(null, mapDispatchToProps)(LocaleSelector);
