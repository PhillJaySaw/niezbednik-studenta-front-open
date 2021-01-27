import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faHandsHelping, faCodeBranch } from '@fortawesome/free-solid-svg-icons';
import Title from '../items/CurrentPageTitle';
import ReactTooltip from 'react-tooltip';
import './style.scss';
import { fetchUserData } from '../../store/reducers/user/action';

class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
    };
  }

  componentDidMount() {
    const { fetchUserData } = this.props;

    Promise.resolve(fetchUserData()).then((value) => {
      if (value) {
        if (!value.payload.admin) {
          this.setState({
            isAdmin: false,
          });
        } else {
          this.setState({
            isAdmin: true,
          });
        }
      }
    });
  }

  render() {
    const { isAdmin } = this.state;
    const { intl } = this.props;

    return (
      <div className="current-page-container info-page-container">
        <Title title={intl.formatMessage({ id: 'settings.about' })} />
        <div className="current-option-content">
          <p className="about-header">
            <FontAwesomeIcon icon={faUniversity} className="header-icon" />
            {intl.formatMessage({ id: 'about.who.header' })}
          </p>
          <p>{intl.formatMessage({ id: 'about.who' })}</p>
          <p className="about-header">
            <FontAwesomeIcon icon={faHandsHelping} className="header-icon" />
            {intl.formatMessage({ id: 'about.what.header' })}
          </p>
          <p>{intl.formatMessage({ id: 'about.what' })}</p>
          <p className="about-header">
            <FontAwesomeIcon icon={faCodeBranch} className="header-icon" />
            {intl.formatMessage({ id: 'about.open-source.header' })}
          </p>
          <p>
            {intl.formatMessage({ id: 'about.open-source' })}
            {!isAdmin && (
              <span>
                <span
                  className="clickable-sentence"
                  data-tip={intl.formatMessage({ id: 'tooltip.become-admin' })}
                >
                  {' '}
                  {intl.formatMessage({ id: 'about.open-source.become-admin.1' })}
                </span>
                {intl.formatMessage({ id: 'about.open-source.become-admin.2' })}
                <ReactTooltip />
              </span>
            )}
          </p>
          {isAdmin && (
            <div className="tiny-section">
              <p className="tiny-section-header">
                <p>{intl.formatMessage({ id: 'about.open-source.repositories' })}</p>
                <span>
                  Front-end:{' '}
                  <a
                    className="repo-link"
                    href="https://github.com/PhillJaySaw/NiezbednikStudentaFront"
                  >
                    https://github.com/PhillJaySaw/NiezbednikStudentaFront
                  </a>
                </span>
                <span>
                  Back-end:{' '}
                  <a className="repo-link" href="https://github.com/Adiiks/niezbednik-studenta">
                    https://github.com/Adiiks/niezbednik-studenta
                  </a>
                </span>
              </p>
              <p className="tiny-section-header">
                <p>{intl.formatMessage({ id: 'about.open-source.docs' })}</p>
                <span>
                  Front-end:{' '}
                  <a
                    className="repo-link"
                    href="https://github.com/PhillJaySaw/NiezbednikStudentaFront/wiki"
                  >
                    https://github.com/PhillJaySaw/NiezbednikStudentaFront/wiki
                  </a>
                </span>
                <span>
                  Back-end:{' '}
                  <a
                    className="repo-link"
                    href="https://niezbednik-studenta.azurewebsites.net/swagger-ui.html#"
                  >
                    https://niezbednikstudenta.azurewebsites.net/swagger-ui.html#
                  </a>
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData: () => dispatch(fetchUserData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(InfoPage));
