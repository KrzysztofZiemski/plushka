import { GetStaticProps } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { getCategories } from "../api/categories";
import { getProducts } from "../api/products";
import logo from "../assets/logo.png";
import MainButton from "../components/atom/button/MainButton";
import MaterialInput from "../components/atom/input/MaterialInput";
import TextArea from "../components/atom/input/TextArea";
import PageTitle from "../components/atom/pageTitle/pageTitle";
import MainLayout from "../components/layout/MainLayout";
import { Category } from "../types/category";
import { GetLayout } from "../types/page";
import { Product } from "../types/product";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { LocalStorageManager } from "../utils/localstorage";
import { useEffect, useState } from "react";
import { validator } from "../utils/validators";
import { ContactMessage } from "../types/message";
import { sendMessage } from "../api/message";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { RequestStatus } from "../types/fetch";
import { toast } from "react-toastify";
import mailbox from "../assets/inbox.png";
import Image from "next/image";

const localStorageValidator = (data: string | unknown) => {
  if (typeof data !== "string" || !validator.email.regexp.test(data))
    return false;
  return true;
};

const localStorageManager = new LocalStorageManager<string>(
  "contact",
  localStorageValidator
);

const schema = yup
  .object({
    email: yup
      .string()
      .matches(validator.email.regexp, "Pole wymagane")
      .required("Pole Wymagane"),
    title: yup.string().required("Pole Wymagane"),
    content: yup.string().required("Pole Wymagane"),
  })
  .required();

interface Props {
  products: Product[];
  categories: Category[];
}

export default function ContactPage({}: Props) {
  const [status, setStatus] = useState<RequestStatus>("idle");

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactMessage>({
    defaultValues: {
      email: "",
      content: "",
      title: "",
    },
    resolver: yupResolver(schema),
  });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const onSubmit = async (data: ContactMessage) => {
    if (!executeRecaptcha) return;
    setStatus("loading");
    try {
      const gReCaptchaToken = await executeRecaptcha("enquiryFormSubmit");
      await sendMessage(data, gReCaptchaToken);
      setStatus("success");
      reset();
    } catch (err) {
      toast.error("Wystąpił problem z wysłanie mwiadomości");
      setStatus("failed");
    }
  };

  useEffect(() => {
    const savedEmail = localStorageManager.state;

    if (savedEmail) setValue("email", savedEmail);
  }, [setValue]);

  return (
    <>
      <Head>
        <title>Plushka - rękodzieło z pasją. Kontakt</title>
        <meta name="description" content={"Wyślij wiadomość"} />
        <meta property="og:title" content="Plushka - Rękodzieło z pasją" />
        <meta property="og:image" content={logo.src} />
        <meta property="og:description" content={"Wyślij wiadomość"} />
      </Head>
      <PageTitle className="justify-center">Kontakt</PageTitle>
      <div className="w-full p-5 m">
        {status !== "success" && (
          <form
            className="w-full flex flex-col gap-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <MaterialInput
              error={errors.email?.message}
              label="E-mail"
              {...register("email")}
              aria-label="contact email"
            />
            <MaterialInput
              error={errors.title?.message}
              label="Tytuł"
              {...register("title")}
              aria-label="message title"
            />
            <TextArea
              error={errors.content?.message}
              inputProps={{
                style: {
                  minHeight: "200px",
                },
              }}
              {...register("content")}
              label={"Wiadomość"}
              aria-label="message conrent"
            />
            <MainButton type="submit" isLoading={status === "loading"}>
              Wyślij
            </MainButton>
          </form>
        )}
        {status === "success" && (
          <div className="w-60 mx-auto flex flex-col gap-3">
            <Image
              className="mx-auto"
              src={mailbox}
              width={100}
              height={100}
              alt="sukces sended mail icon"
            />
            <p className="text-center">Wyszłano wiadomość</p>
            <MainButton
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-9"
            >
              OK
            </MainButton>
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts();
  const categories = await getCategories();
  return {
    props: { products, categories },
  };
};

const getLayout: GetLayout = (page, pageProps: Props) => (
  <GoogleReCaptchaProvider
    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA || ""}
    scriptProps={{
      async: true,
    }}
  >
    <MainLayout products={pageProps.products} categories={pageProps.categories}>
      {page}
    </MainLayout>
  </GoogleReCaptchaProvider>
);

ContactPage.getLayout = getLayout;
