import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MobileNavMenu = () => {
  const { t } = useTranslation();

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>{t("home")}</Link>          
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/about"}>{t("about")}</Link>          
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/login-register"}>{t("login_register")}</Link>          
        </li>

        <li>
          <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
            {t("collection")}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/career"}>{t("career")}</Link>          
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {t("contact_us")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavMenu;
