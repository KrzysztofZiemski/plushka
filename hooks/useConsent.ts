import Cookies from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";

const cookieConsentName = "cookie-consent";

type CookieOptions = "necessary" | "agree" | "empty";

const getConsent = () => {
  const result = Cookies.get(cookieConsentName);
  if (result === "necessary" || result === "agree" || result === "empty")
    return result as CookieOptions;
  return null;
};

const setConsent = (value: CookieOptions) => {
  Cookies.set(cookieConsentName, value, {
    expires: value === "agree" ? 365 : undefined,
  });
};

export default function useConsent() {
  const [agree, setAgree] = useState<null | CookieOptions>(null);

  useEffect(() => {
    const result = getConsent();
    if (!result) return setAgree("empty");
    setAgree(result);
  }, []);

  const handlesetConsent = useCallback((value: CookieOptions) => {
    setConsent(value);
    setAgree(value);
  }, []);

  return { setConsent: handlesetConsent, cookieConstent: agree };
}
