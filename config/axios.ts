import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL;
//https://graphql.datocms.com/
// axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.DATO_CMS_API_KEY}`;
