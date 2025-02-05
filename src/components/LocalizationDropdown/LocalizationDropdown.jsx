import i18next from "i18next";
import styles from "./LocalizationDropdown.module.css";

const lngs = {
  en: { nativeName: "EN" },
  ua: { nativeName: "UA" },
};

const LanguageDropdown = () => {
  const changeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18next.changeLanguage(selectedLanguage);
  };

  return (
    <div className={styles.divDropdown}>
      <select
        id="language-select"
        className={styles.dropdown}
        onChange={changeLanguage}
        defaultValue={i18next.language}
      >
        {Object.keys(lngs).map((lng) => (
          <option className="font-quantico" key={lng} value={lng}>
            {lngs[lng].nativeName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageDropdown;
