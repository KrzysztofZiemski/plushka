import axios from "axios";

axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.DATO_CMS_API_KEY}`;
