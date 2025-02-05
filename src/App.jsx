import { useContext, useState } from "react";
import { useTranslation } from "react-i18next"; // Хук для отримання функцій i18n
import { ThemeContext, themes } from "./contexts/ThemeContext";
import LanguageDropdown from "./components/LocalizationDropdown/LocalizationDropdown";
import { frontEnd, frontEndBlack } from "./utils/importData";
function App() {
  const { t } = useTranslation(); // Витягнуто функцію t для перекладів і i18n для зміни мови
  const [count, setCount] = useState(0);
  const { theme, setTheme } = useContext(ThemeContext);
  const handleThemeToggle = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };
  return (
    <div className="bg-background">
      <div
        className="bg-center bg-no-repeat h-screen"
        style={{
          backgroundImage: `url(${
            theme === themes.dark ? frontEnd : frontEndBlack
          })`,
        }}
      >
        <LanguageDropdown />
        {/* Виведення перекладів на сторінці */}
        <h1 className="font-quantico font-bold bg-background transition-all decoration-3 hover:text-color-yellow">
          {t("welcome")}
        </h1>
        <button
          onClick={handleThemeToggle}
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {theme === themes.dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
        <p className="font-quantico text-text-color">{t("description")}!</p>
        <div className="card">
          <button onClick={() => setCount(count + 1)}>count is {count}</button>
          <p>
            Edit <code>src/App.js</code> and save to test HMR
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
