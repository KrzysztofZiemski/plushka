import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <main>
        <Component {...pageProps} />
      </main>
      <footer className="text-3xl text-green-600 p-2">footer</footer>
    </div>
  );
}
