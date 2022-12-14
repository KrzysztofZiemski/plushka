import Link from "next/link";
import Script from "next/script";
import useConsent from "../../hooks/useConsent";
import { isProduction } from "../../utils/next";
import { getPath } from "../../utils/routing";
import MainButton from "../atom/button/MainButton";
import TextButton from "../atom/button/textButton";

export default function CookiesBanner() {
  const { setConsent, cookieConstent } = useConsent();
  const handleAccept = () => {
    setConsent("agree");
  };
  const handleAcceptOnlyNecessary = () => {
    setConsent("necessary");
  };

  if (cookieConstent === "agree")
    return (
      <>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_G_TAG}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_G_TAG}');
          `}
        </Script>
      </>
    );

  if (cookieConstent === "empty")
    return (
      <div className="fixed bottom-0 inset-x-0 z-20 text-white bg-transparent-grey py-4 px-6 md:px-24 main-shadow">
        <h3>Używamy plików cookie</h3>
        <p>
          Kontynuując korzystanie z naszej strony internetowej, wyrażasz zgodę
          na przetwarzanie Twoich danych osobowych takich jak adres IP czy
          identyfikatory plików cookies w celach analitycznych i statystycznych,
          a także na zapisywanie i przechowywanie plików cookies na Twoim
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
          <TextButton
            className="text-white "
            onClick={handleAcceptOnlyNecessary}
          >
            Tylko niezbędne
          </TextButton>
          <MainButton size="small" className="w-36" onClick={handleAccept}>
            Akceptuj
          </MainButton>
        </div>
      </div>
    );

  return null;
}
