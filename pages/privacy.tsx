import Head from "next/head";
import { GetStaticProps } from "next/types";
import { getCategories } from "../api/categories";
import { getProducts } from "../api/products";
import logo from "../assets/logo.png";
import MainLayout from "../components/layout/MainLayout";
import { GetLayout } from "../types/page";

export default function PrivacyPage() {
  const description =
    "Rękodzieło z pasją. Ręcznie robione przytulanki, biżuteria, chusty. Wyroby gotowe jak i na zamówienie ";

  return (
    <div className="px-5">
      <Head>
        <title>Polityka prywatności - Plushka.</title>
        <meta name="description" content={description} />
        <meta property="og:title" content="Plushka - Rękodzieło z pasją" />
        <meta property="og:image" content={logo.src} />
        <meta property="og:description" content={description} />
      </Head>

      <h1 className="text-center mb-4">Polityka Cookies</h1>
      <p>
        Poniższa Polityka Cookies określa zasady zapisywania i uzyskiwania
        dostępu do danych na Urządzeniach Użytkowników korzystających z Serwisu
        do celów świadczenia usług drogą elektroniczną przez Administratora
        Serwisu.
      </p>

      <h2 className="text-center my-3">§ 1 Definicje</h2>
      <ul>
        <li>
          <p>
            <strong>Serwis</strong> - serwis internetowy działający pod adresem{" "}
            <span id="serwis">
              <span className="font-medium font-medium"> www.plushka.pl</span>
            </span>
          </p>
        </li>
        <li>
          <p>
            <strong>Serwis zewnętrzny</strong> - serwis internetowe partnerów,
            usługodawców lub usługobiorców Administratora
          </p>
        </li>
        <li>
          <p>
            <strong>Administrator</strong> - firma{" "}
            <span id="firma">
              <span className="font-medium font-medium">Krzysztof Ziemski</span>
              , prowadząca działalność pod adresem:{" "}
              <span className="font-medium font-medium">
                Opinogórska 5 04-039 Warszawa
              </span>
              , o nadanym numerze identyfikacji podatkowej (NIP):{" "}
              <span className="font-medium font-medium">5213265848</span>
            </span>
            , świadcząca usługi drogą elektroniczną za pośrednictwem Serwisu
            oraz przechowująca i uzyskująca dostęp do informacji w urządzeniach
            Użytkownika
          </p>
        </li>
        <li>
          <p>
            <strong>Użytkownik</strong> - osba fizyczna, dla której
            Administrator świadczy usługi drogą elektroniczna za pośrednictwem
            Serwisu.
          </p>
        </li>
        <li>
          <p>
            <strong>Urządzenie</strong> - elektroniczne urządzenie wraz z
            oprogramowaniem, za pośrednictwem, którego Użytkownik uzyskuje
            dostęp do Serwisu
          </p>
        </li>
        <li>
          <p>
            <strong>Cookies (ciasteczka)</strong> - dane tekstowe gromadzone w
            formie plików zamieszczanych na Urządzeniu Użytkownika
          </p>
        </li>
      </ul>
      <h2 className="text-center my-3">§ 2 Rodzaje Cookies</h2>
      <ul>
        <li>
          <p>
            <strong>Cookies wewnętrzne</strong> - pliki zamieszczane i
            odczytywane z Urządzenia Użytkownika przes system teleinformatyczny
            Serwisu
          </p>
        </li>
        <li>
          <p>
            <strong>Cookies zewnętrzne</strong> - pliki zamieszczane i
            odczytywane z Urządzenia Użytkownika przez systemy teleinformatyczne
            Serwisów zewnętrznych
          </p>
        </li>
        <li>
          <p>
            <strong>Cookies sesyjne</strong> - pliki zamieszczane i odczytywane
            z Urządzenia Użytkownika przez Serwis podczas jednej sesji danego
            Urządzenia. Po zakończeniu sesji pliki są usuwane z Urządzenia
            Użytkownika.
          </p>
        </li>
        <li>
          <p>
            <strong>Cookies trwałe</strong> - pliki zamieszczane i odczytywane z
            Urządzenia Użytkownika przez Serwis do momentu ich ręcznego
            usunięcia. Pliki nie są usuwane automatycznie po zakończeniu sesji
            Urządzenia chyba że konfiguracja Urządzenia Użytkownika jest
            ustawiona na tryb usuwanie plików Cookie po zakończeniu sesji
            Urządzenia.
          </p>
        </li>
      </ul>

      <h2 className="text-center my-3">§ 3 Bezpieczeństwo</h2>
      <ul>
        <li>
          <p>
            <strong>Mechanizmy składowania i odczytu</strong> - Mechanizmy
            składowania i odczytu Cookies nie pozwalają na pobierania
            jakichkolwiek danych osobowych ani żadnych informacji poufnych z
            Urządzenia Użytkownika. Przeniesienie na Urządzenie Użytkownika
            wirusów, koni trojańskich oraz innych robaków jest praktynie
            niemożliwe.
          </p>
        </li>
        <li>
          <p>
            <strong>Cookie wewnętrzne</strong> - zastosowane przez
            Administratora Cookie wewnętrzne są bezpieczne dla Urządzeń
            Użytkowników
          </p>
        </li>
        <li>
          <p>
            <strong>Cookie zewnętrzne</strong> - za bezpieczeństwo plików Cookie
            pochodzących od partnerów Serwisu Administrator nie ponosi
            odpowiedzialności. Lista partnerów zamieszczona jest w dalszej
            części Polityki Cookie.
          </p>
        </li>
      </ul>

      <h2 className="text-center my-3">
        § 4 Cele do których wykorzystywane są pliki Cookie
      </h2>
      <ul id="cele">
        <li>
          <p>
            <strong>
              <span className="font-medium font-medium">
                Usprawnienie i ułatwienie dostępu do Serwisu
              </span>
            </strong>{" "}
            - Administrator może przechowywać w plikach Cookie informacje o
            prefernecjach i ustawieniach użytkownika dotyczących Serwisu aby
            usprawnić, polepszyć i przyśpieszyć świadczenie usług w ramach
            Serwisu.
          </p>
        </li>
        <li>
          <p>
            <strong>
              <span className="font-medium font-medium">
                Marketing i reklama
              </span>
            </strong>{" "}
            - Administrator <span>oraz Serwisy zewnętrzne</span> wykorzystują
            pliki Cookie do celów marketingowych oraz serwowania reklam
            Użytkowników.
          </p>
        </li>
        <li>
          <p>
            <strong>
              <span className="font-medium font-medium">Dane statystyczne</span>
            </strong>{" "}
            - Administrator <span>oraz Serwisy zewnętrzne</span> wykorzystuje
            pliki Cookie do zbirania i przetwarzania danych statystycznych
            takich jak np. statystyki odwiedzin, statystyki Urządzeń
            Użytkowników czy statystyki zachowań użytkowników. Dane te zbierane
            są w celu analizy i ulepszania Serwisu.
          </p>
        </li>
        <li>
          <p>
            <strong>
              <span className="font-medium font-medium">
                Serwowanie usług multimedialnych
              </span>
            </strong>{" "}
            - Administrator <span>oraz Serwisy zewnętrzne</span> wykorzystuje
            pliki Cookie do serwowania Użytkownikom usług multimedialnych.
          </p>
        </li>
        <li>
          <p>
            <strong>
              <span className="font-medium font-medium">
                Usługi społecznościowe
              </span>
            </strong>{" "}
            - Administrator{" "}
            <span id="sz7" className="font-medium font-medium">
              oraz Serwisy zewnętrzne
            </span>{" "}
            wykorzystują pliki Cookie do wsparcia usług społecznościowych
          </p>
        </li>
      </ul>
      <h2 className="text-center my-3">§ 5 Serwisy zewnętrzne</h2>
      <p id="zewinfo">
        <span className="font-medium font-medium">
          Administrator nie współpracuje z serwisami zewnętrznymi i Serwis nie
          umieszcza ani nie korzysta z żadnych plików zewnętrznych plików
          Cookie.
        </span>
      </p>
      <ul id="zewnetrzne"></ul>
      <h2 className="text-center my-3">
        § 6 Możliwości określania warunków przechowywania i uzyskiwania dostępu
        na Urządzeniach Użytkownika przez Serwis
      </h2>
      <ul>
        <li>
          <p>
            Użytkownik może w dowolnym momencie, samodzielnie zmienić ustawienia
            dotyczące zapisywania, usuwania oraz dostępu do danych zapisanych
            plików Cookies
          </p>
        </li>
        <li>
          <p>
            Informacje o sposobie wyłączenia plików Cookie w najpopularniejszych
            przeglądarkach komputerowych i urządzeń mobilnych dostępna są na
            stronie:{" "}
            <a href="http://jakwylaczyccookie.pl">jak wyłączyć cookie</a>.
          </p>
        </li>
        <li>
          <p>
            Użytkownik może w dowolnym momencie usunąć wszelkie zapisane do tej
            pory pliki Cookie korzystając z narzędzi Urządzenia Użytkownika za
            pośrednictwem którego Użytkowanik korzysta z usług Serwisu.
          </p>
        </li>
      </ul>

      <h2 className="text-center my-3">§ 7 Wyłączenie odpowiedzialności</h2>
      <ul>
        <li>
          Administrator stosuje wszelkie możliwe środki w celu zapewnienia
          bezpieczeństwa danych umieszczanych w plikach Cookie. Należy jednak
          zwrócić uwagę, że zapewnienie bezpieczeństwa tych danych zależy od obu
          stron, w tym działalności Użytkownika oraz satnu zabezpieczeń
          urządzenia z którego korzysta.
        </li>
        <li>
          Administrator nie bierze odpowiedzialności za przechwycenie danych
          zawartych w plikach Cookie, podszycie się pod sesję Użytkownika lub
          ich usunięcie, na skutek świadomej lub nieświadomej działalność
          Użytkownika, wirusów, koni trojańskich i innego oprogramowania
          szpiegującego, którymi może być zainfekowane Urządzenie Użytkownika.
        </li>
        <li>
          Użytkownicy w celu zabezpieczenia się przed wskazanymi w punkcie
          poprzednim zagrożeniami powinni stosować się do{" "}
          <span id="cyber_random">
            zasad{" "}
            <a href="https://nety.pl/cyberbezpieczenstwo/zasady-ogolne-korzystania-z-sieci-internet/">
              cyberbezpieczeństwa
            </a>{" "}
            w sieci
          </span>
          .
        </li>
        <li>
          Usługi świadczone przez podmioty trzecie są poza kontrolą
          Administratora. Podmioty te mogą w każdej chwili zmienić swoje warunki
          świadczenia usług, cel oraz wykorzystanie plików cookie. Administrator
          nie odpowiada na tyle na ile pozwala na to prawo za działanie plików
          cookies używanych przez serwisy partnerskie. Użytkownicy w każdej
          chwili mogą samodzielnie zarządzać zezwoleniami i ustawieniami plików
          cookie dla każedej dowolnej witryny.
        </li>
      </ul>

      <h2 className="text-center my-3">§ 8 Wymagania Serwisu</h2>
      <ul>
        <li>
          <p>
            Ograniczenie zapisu i dostępu do plików Cookie na Urządzeniu
            Użytkownika może spowodować nieprawidłowe działanie niektórych
            funkcji Serwisu.
          </p>
        </li>
        <li>
          <p>
            Administrator nie ponosi żadnej odpowiedzialności za nieprawidłowo
            działające funkcje Serwisu w przypadku gdy Użytkownik ograniczy w
            jakikolwiek sposób możliwość zapisywania i odczytu plików Cookie.
          </p>
        </li>
      </ul>
      <h2 className="text-center my-3">§ 9 Zmiany w Polityce Cookie</h2>
      <ul>
        <li>
          <p>
            Administrator zastrzega sobie prawo do dowolnej zmiany niniejszej
            Polityki Cookie bez konieczności informowania o tym użytkowników.
          </p>
        </li>
        <li>
          <p>
            Wprowadzone zmiany w Polityce Cookie zawsze będą publikowane na tej
            stronie.
          </p>
        </li>
        <li>
          <p>
            Wprowadzone zmiany wchodzą w życie w dniu publikacji Polityki
            Cookie.
          </p>
        </li>
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  const categories = await getCategories();

  return {
    props: { products, categories },
  };
};

const getLayout: GetLayout = (page, pageProps) => (
  <MainLayout products={pageProps.products} categories={pageProps.categories}>
    {page}
  </MainLayout>
);

PrivacyPage.getLayout = getLayout;
