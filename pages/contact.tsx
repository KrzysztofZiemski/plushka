import { yupResolver } from "@hookform/resolvers/yup";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { getCategories } from "../api/categories";
import { sendMessage } from "../api/message";
import { getProducts } from "../api/products";
import { CloseIcon } from "../assets/icons";
import mailbox from "../assets/inbox.png";
import logo from "../assets/logo.png";
import CloseButton from "../components/atom/button/closeButton";
import MainButton from "../components/atom/button/MainButton";
import TextButton from "../components/atom/button/textButton";
import MaterialInput from "../components/atom/input/MaterialInput";
import TextArea from "../components/atom/input/TextArea";
import PageTitle from "../components/atom/pageTitle/pageTitle";
import MainLayout from "../components/layout/MainLayout";
import { Category } from "../types/category";
import { RequestStatus } from "../types/fetch";
import { ContactMessage } from "../types/message";
import { GetLayout } from "../types/page";
import { Product } from "../types/product";
import { LocalStorageManager } from "../utils/localstorage";
import { hygraphLoader } from "../utils/next";
import { getPath } from "../utils/routing";
import { validator } from "../utils/validators";

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

export default function ContactPage({ products }: Props) {
  const [status, setStatus] = useState<RequestStatus>("idle");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    setFocus,
    formState: { errors },
  } = useForm<ContactMessage>({
    defaultValues: {
      email: "",
      content: "",
      title: "",
    },
    resolver: yupResolver(schema),
  });

  const askFor = useMemo(() => {
    const productId = router.query?.product;
    if (!productId) return;
    return products.find(({ id }) => id === productId);
  }, [products, router.query]);

  useEffect(() => {
    if (!askFor) return;
    setValue("title", `Pytanie o ${askFor.name}`);
    const { email } = getValues();
    if (email) setFocus("content");
  }, [askFor, getValues, setFocus, setValue]);

  useEffect(() => {
    const savedEmail = localStorageManager.state;
    if (!savedEmail) return;
    setValue("email", savedEmail);
    const { title } = getValues();
    if (title) setFocus("content");
  }, [getValues, setFocus, setValue]);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const clearQuery = () => {
    router.replace(getPath("contact")(""), undefined, { shallow: true });
    router.query.product = "";
  };
  const onSubmit = async (data: ContactMessage) => {
    if (!executeRecaptcha) return;
    setStatus("loading");
    try {
      const gReCaptchaToken = await executeRecaptcha("enquiryFormSubmit");
      await sendMessage({ ...data, id: askFor?.id }, gReCaptchaToken);
      setStatus("success");
      localStorageManager.save(data.email);
      reset();
      setValue("email", data.email);
    } catch (err) {
      toast.error("Wystąpił problem z wysłanie mwiadomości");
      setStatus("failed");
    }
  };

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
          <>
            {askFor?.photos?.[0] && (
              <div className="flex justify-end">
                <div className="relative w-24 h-24 mb-2 flex">
                  <Image
                    loader={hygraphLoader}
                    src={askFor?.photos[0].url}
                    alt={`pytanie o ${askFor.name}`}
                    loading="lazy"
                    fill
                    className="object-contain"
                  />
                  <CloseButton
                    className="absolute top-0 right-0 "
                    hoverWhite
                    iconProps={{ className: "w-3 h-3" }}
                    onClick={clearQuery}
                  />
                </div>
              </div>
            )}
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
                className="grow"
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
          </>
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
