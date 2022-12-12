import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getPath } from "../../utils/routing";
import MainButton from "../atom/button/MainButton";
import TextButton from "../atom/button/textButton";
import Cookies from "js-cookie";

const cookieConsentName = "cookie-consent";

type CookieOptions = "necessary" | "agree";

const getConsent = () => {
  const result = Cookies.get(cookieConsentName);
  if (result === "necessary" || result === "agree")
    return result as CookieOptions;
  return null;
};
const setConsent = (value: CookieOptions) => {
  Cookies.set(cookieConsentName, value, {
    expires: value === "agree" ? 365 : undefined,
  });
};

export default function CookiesBanner() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!getConsent()) setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  const handleAccept = () => {
    setConsent("agree");
    setIsOpen(false);
  };
  const handleAcceptOnlyNecessary = () => {
    setConsent("necessary");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-0 inset-x-0 z-20 text-white bg-transparent-grey py-4 px-6 md:px-24 main-shadow">
      <h3>Używamy plików cookie</h3>
      <p>
        Kontynuując korzystanie z naszej strony internetowej, wyrażasz zgodę na
        przetwarzanie Twoich danych osobowych takich jak adres IP czy
        identyfikatory plików cookies w celach analitycznych i statystycznych, a
        także na zapisywanie i przechowywanie plików cookies na Twoim
        urządzeniu. Więcej informacji znajdziesz w naszej{" "}
        <Link
          className="text-primary font-medium"
          href={getPath("privacy")("")}
        >
          polityce prywatności
        </Link>
        .
      </p>

      <div className="flex items-center justify-end gap-4 mt-4">
        <TextButton className="text-white " onClick={handleAcceptOnlyNecessary}>
          Tylko niezbędne
        </TextButton>
        <MainButton size="small" className="w-36" onClick={handleAccept}>
          Akceptuj
        </MainButton>
      </div>
    </div>
  );
}
