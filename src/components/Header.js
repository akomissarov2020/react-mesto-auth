import headerLogoPath from '../images/logo.svg';

function Header() {
  return (
    <header className="header page__header">
        <a href="/" className="header__logo" target="_self">
          <img src={headerLogoPath} alt="Логотип проекта Место" />
        </a>
    </header>
  );
}

export default Header;
