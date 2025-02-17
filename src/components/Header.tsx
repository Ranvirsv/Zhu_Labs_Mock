import iublogo from "../assets/iublogo.png";

export default function Header() {
  return (
    <div className="header d-flex flex-row">
      <img className="header__logo" src={iublogo} alt="IUB LOGO" />
      <div className="header__text text-white p-2">
        <p className="header__text__iub mt-2 h5">
          INDIANA UNIVERSITY BLOOMINGTON
        </p>
      </div>
    </div>
  );
}
