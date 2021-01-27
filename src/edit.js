      <nav>
        <div className="title-bar">
          <div className="title-bar__title">
            <a className="hyper-home" href="/">
              <img src={logo} alt="logo" className="logo" />
              <p className="app-title">
                <FormattedMessage id="application.title" />
              </p>
            </a>
          </div>
          <div className="title-bar__icons">
            {/* {adminNotifications.totalElements !== 0 && user.admin && (
              <div className="notification-number"></div>
            )} */}
            <FontAwesomeIcon
              icon={faBell}
              className="bell-icon"
              onClick={() => this.handleNotificationsBar()}
            />
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="menu-icon"
              onClick={() => this.handleSettingsBar()}
            />
          </div>
        </div>
        {location.pathname !== '/' && location.pathname !== '/admin_page' && (
          <div className="categories">
            <ul className="categories-list">{categories}</ul>
          </div>
        )}
        {isNotificationsBarActive ? (
          <NotificationsBar
            close={this.handleNotificationsBar}
            adminNotifications={adminNotifications}
          />
        ) : undefined}
        {isSettingsBarActive ? <SettingsBar close={this.handleSettingsBar} /> : undefined}
      </nav>