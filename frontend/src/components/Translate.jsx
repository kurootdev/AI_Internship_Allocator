import React, { useEffect } from "react";
const GoogleTranslateWidget = () => {
  useEffect(() => {
    if (document.getElementById("google-translate-script")) {
      return;
    }
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      delete window.googleTranslateElementInit;
    };
  }, []);
  return <div id="google_translate_element"></div>;
};
export default GoogleTranslateWidget;
