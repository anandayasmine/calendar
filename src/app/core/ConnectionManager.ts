import axios, { AxiosRequestConfig } from "axios";
import { Config } from "@/app/constant";
import { Auth } from "@/app/data/local";
import { Helpers } from "../utils";
import { TResponse } from "./enum";

type TParams = {
  url: string;
  method?: string;
  query?: any;
  body?: object;
  header?: object;
  useToken?: boolean;
};

// === Fetch API Endpoint ===
export const stream = ({
  url,
  method,
  query,
  body,
  header,
}: TParams) => {
  const refactorHeaders = {
    "Access-Control-Allow-Origin": "*",
    ...(
      query?.token ?
        { 'Authorization': 'Bearer ' + query?.token }
        :
        {}
    ),
    ...(header || {})
  };

  const refactorQuery = query?.token ? Helpers.filterObjectByKey(query, 'token') : query

  const config: AxiosRequestConfig = {
    method: method,
    url: Config.apiURL + url,
    params: refactorQuery,
    responseType: 'json',
    headers: refactorHeaders,
    ...(body ? { data: body } : {}),
  };

  return axios
    .request(config)
    .then((response) => {

      const payload = response.data;
      const status = response.status || 200;

      return { payload, status };
    })
    .catch((error) => {

      const _err = 1;
      const message = error?.response?.data?.message || "Error";
      const status = error?.response?.code || 500;

      return { error: _err, message, status };
    });
}

// === Stream Routing using Next JS Proxy => SSR ===
export const streamRouting = ({
  url,
  method,
  query,
  body,
  header,
  useToken = false,
}: TParams) => {
  const refactorHeaders = header;

  const config: AxiosRequestConfig = {
    method: method,
    url: url,
    params: {
      ...(query || {}),
      ...(
        useToken ?
          { token: Auth.getToken() }
          :
          {}
      ),
    },
    headers: refactorHeaders,
    ...(body ? { data: body } : {}),
  };

  return axios
    .request(config)
    .then((response) => {

      return response?.data

    })
    .catch((errorMessage) => {

      const status = 501
      const success = false
      const payload = null
      const message = errorMessage

      const refactorResponse: TResponse = {
        status,
        success,
        payload,
        message,
      }

      return refactorResponse

    })
}
