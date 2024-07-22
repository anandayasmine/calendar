import _ from "lodash";
import moment from "moment";
import { Config } from "../constant";

function formatDateDefault(
  value: any,
  formatTo = "DD/MM/YYYY",
  formatFrom: any,
  addTime: string
) {
  try {
    if (value) {

      const moment = require("moment");

      let result;

      if (formatFrom) {
        // Strict format

        result = moment(value, formatFrom, true).format(formatTo);
      } else {
        result = moment(value).format(formatTo);
      }

      if (result == "Invalid date") {
        return null;
      } else {
        if (addTime) {
          result = result + " " + addTime;
        }
      }

      return result;
    } else {
      return value;
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: Helpers.js ~ line 61 ~ formatDateDefault ~ err",
      err
    );
    return value;
  }
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
  // await Helpers.sleep(1e3); // how to use
}
function formatDate_yyyymmdd(date: string | number | Date) {
  if (date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  } else {
    return "";
  }
}
function formatDate_ddmmyyyy(date: string | number | Date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
}

function randomNumber(max: number) {
  return Math.floor(Math.random() * max + 1);
}

function checkTime(i: number) {
  let result = i.toString();
  if (i < 10) {
    result = "0" + i;
  }
  return result;
}
function formatTimeNow_hhmmss(divider = ":") {
  try {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    const refactorMinutes = checkTime(m);
    const refactorSeconds = checkTime(s);
    return h + divider + refactorMinutes + divider + refactorSeconds;
  } catch (err) {
    console.log(
      "🚀 ~ file: Helpers.js ~ line 214 ~ formatTimeNow_hhmmss ~ err",
      err
    );
  }
}

function extractEffectiveDate(date: string | number | Date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

function delayFunction(params: any = {}) {
  return new Promise(async (resolve, reject) => {
    await loopFunctionOnDelay({
      ...params,
      resolve,
      reject
    })
  })
}


async function loopFunctionOnDelay(params: any) {


  const { func, length, delay = 500, resolve, reject, _this } = params

  // === Will Return Resolve / Reject ===

  try {

    if (typeof func == 'function' && length) {

      if (length == 1) {

        await func(0, _this)
        return resolve(1)

      }
      else {
        var i = 0; //  set your counter to 1



        return loopFunctionOnDelayChildren(params, i);

      }
    }
    return null

  }
  catch (err) {

    return null

  }

}

async function loopFunctionOnDelayChildren(params?: any, i?: any) {

  const { func, length, delay = 500, resolve, reject, _this } = params
  //  create a loop function
  setTimeout(async function () {
    //  call a 3s setTimeout when the loop is called

    i++; //  increment the counter

    if (i < length) {
      await func(i - 1, _this)
      //  if the counter < 10, call the loop function
      loopFunctionOnDelayChildren(params, i); //  ..  again which will trigger another
    } //  ..  setTimeout()
    else {

      await func(i - 1, _this)
      return resolve(i - 1);

    }


  }, delay);
}

function getRangeDate(
  start: string | number | Date,
  end: string | number | Date
) {
  if (typeof start == "string") {
    start = new Date(start);
  }
  if (typeof end == "string") {
    end = new Date(end);
  }
  for (
    var arr = [], dt = new Date(start);
    dt <= end;
    dt.setDate(dt.getDate() + 1)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
}

function addMarkOnString(sentence: string, keyword: string | RegExp) {
  try {
    if (sentence) {
      var regExp = new RegExp(keyword, "gi");
      let result = sentence.replace(regExp, "<mark>$&</mark>");

      return result;
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: Helpers.js ~ line 154 ~ addMarkOnString ~ err",
      err
    );
  }
}

function removeMarkOnString(sentence: string) {
  try {
    if (sentence) {
      var regExp = new RegExp("<mark>|</mark>", "gi");
      let result = sentence.replace(regExp, "");

      return result;
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: Helpers.js ~ line 154 ~ removeMarkOnString ~ err",
      err
    );
  }
}

function markStringByKeyword(
  sentence: { toString: () => any },
  keyword: { toString: () => any }
) {
  try {
    let string = sentence.toString();
    let key = keyword.toString();
    return string.toLowerCase().includes(key.toLowerCase()) && key !== ""
      ? addMarkOnString(string, key)
      : removeMarkOnString(string);
  } catch (err) {
    console.log(
      "🚀 ~ file: Helpers.js ~ line 334 ~ markStringByKeyword ~ err",
      err
    );
    return sentence;
  }
}

function filterDataByKeyword(data: any[], keyword: string, property = "name") {
  try {
    return data.filter((item: { [x: string]: string }) =>
      keyword
        ? item[property].toLowerCase().includes(keyword.toLowerCase())
        : true
    );
  } catch (err) {
    console.log(
      "🚀 ~ file: Helpers.js ~ line 348 ~ filterDataByKeyword ~ err",
      err
    );
    return data;
  }
}

function combineArrayOfObject(arr1: any[], arr2: string | any[]) {
  if (arr1.length == arr2.length) {
    let joinArray = arr1.map((item: object, index: number) =>
      Object.assign({
        ...item,
        ...arr2[index],
      })
    );
    return joinArray;
  } else {
    return null;
  }
}

function getUniqueFromArrayOfObjectbyId(data: any[]) {
  let output: any[] = [];
  if (data && data.length > 0) {
    data.forEach(function (item: { id: any }) {
      var i = output.findIndex((x) => x.id == item.id);
      if (i <= -1) {
        output.push(item);
      }
    });
  }
  return output;
}

function removeArrayOfObjectbyId(data: any[], id: any) {
  let foundIndex = data.findIndex((item: { id: any }) => item.id == id);
  data.splice(foundIndex, 1);
  return data;
}

function isURL(url: RequestInfo | URL) {
  let output = false;
  fetch(url)
    .then((res) => {
      if (res.status == 404) {
        output = true;
      }
    })
    .catch((err) => { });
  return output;
}

function isValidHttpUrl(string: string | URL) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function intersectArray(
  paramArr1: Array<any>,
  paramArr2: Array<any>,
  type = "in"
) {
  try {
    const arr1 = paramArr1 || [];
    const arr2 = paramArr2 || [];

    if (type == "in") {
      return arr1.filter((value: any) => arr2.includes(value));
    } else if (type == "out") {
      return arr1.filter((value: any) => !arr2.includes(value));
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: Helpers.js ~ line 2215 ~ intersectArray ~ err",
      err
    );
    return [];
  }
}

function isArrayEqual(arr1: any, arr2: any) {
  try {
    return _.isEqual(_.sortBy(arr1), _.sortBy(arr2));
  } catch (err) {
    console.log(
      "🚀 ~ file: Helpers.js ~ line 2215 ~ inteisArrayEqualrsectArray ~ err",
      err
    );
  }
}

function pushURLWithoutReload(params: {
  Router: any;
  URL: any;
  useReplace: any;
}) {
  try {
    const Router = params?.Router;
    const URL = params?.URL;
    const useReplace = params?.useReplace;

    const config = {
      // pathname: Router.router.pathname,
      pathname: URL,
    };

    if (useReplace) {
      Router.replace(config, undefined, { shallow: true });
    } else {
      Router.push(config, undefined, { shallow: true });
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: Helpers.js ~ line 529 ~ changeSlugWithoutReload ~ err",
      err
    );
  }
}

function changeSlugWithoutReload(
  Router: {
    router: { pathname: any; query: any };
    replace: (
      arg0: { pathname: any; query: any },
      arg1: undefined,
      arg2: { shallow: boolean }
    ) => void;
    push: (
      arg0: { pathname: any; query: any },
      arg1: undefined,
      arg2: { shallow: boolean }
    ) => void;
  },
  id: any,
  query = "slug",
  useReplace = true
) {
  try {
    const config = {
      pathname: Router.router.pathname,
      query: {
        ...Router.router.query,
        [query]: id,
      },
    };

    if (useReplace) {
      Router.replace(config, undefined, { shallow: true });
    } else {
      Router.push(config, undefined, { shallow: true });
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: Helpers.js ~ line 529 ~ changeSlugWithoutReload ~ err",
      err
    );
  }
}

function changeQueriesWithoutReload(
  Router: {
    router: { pathname: any };
    replace: (
      arg0: { pathname: any; query: any },
      arg1: undefined,
      arg2: { shallow: boolean }
    ) => void;
    push: (
      arg0: { pathname: any; query: any },
      arg1: undefined,
      arg2: { shallow: boolean }
    ) => void;
  },
  queries: any,
  useReplace: any
) {
  try {
    const config = {
      pathname: Router.router.pathname,
      query: queries,
    };

    if (useReplace) {
      Router.replace(config, undefined, { shallow: true });
    } else {
      Router.push(config, undefined, { shallow: true });
    }
  } catch (err) {
    console.log(
      "🚀 ~ file: Helpers.js ~ line 566 ~ changeQueriesWithoutReload ~ err",
      err
    );
  }
}

function isPropertyEmpty(
  arrOfObject: any[],
  propertyName = "name",
  propertyType = "string"
) {
  let isValid = true;

  arrOfObject.map((item: { [x: string]: string }) => {
    if (item[propertyName] === "") {
      isValid = false;
    }
  });

  return !isValid;
}

function isPropertyFilledOne(
  arrOfObject: any[],
  propertyName = "name",
  propertyType = "string"
) {
  let isValid = false;

  arrOfObject.map((item: { [x: string]: string }) => {
    if (item[propertyName] !== "") {
      isValid = true;
    }
  });

  return isValid;
}

function downloadBlob(blob: BlobPart, fileName: string, directData: any) {
  // Create blob link to download
  const url = window?.URL?.createObjectURL(directData || new Blob([blob]));
  const link = document?.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.parentNode?.removeChild(link);
}

function generateFormatTime(date: moment.MomentInput) {
  try {
    var formatteddatestr = moment(date).format("hh:mm:ss");
    return formatteddatestr;
  } catch (err) {
    console.log(err);
  }
}

function getImagesFromHtml(string: string) {
  const imgRex = /<img.*?src="(.*?)"[^>]+>/g;
  const images = [];
  let img;
  while ((img = imgRex.exec(string))) {
    console.log("INI IMG ==>", img);
    images.push(img[1]);
  }
  return images;
}

function defaultReturn(format: string) {
  switch (format) {
    case "hh:mm:ss":
      {
        return "00:00:00";
      }
      break;

    case "mm:ss":
      {
        return "00:00";
      }
      break;
  }
}
function pad(num: string | number) {
  return ("0" + num).slice(-2);
}
function time_convert(value: any, format = "hh:mm:ss") {
  try {
    if (value) {
      let second = parseInt(value);

      var minutes = Math.floor(second / 60);
      second = second % 60;

      var hours = Math.floor(minutes / 60);
      minutes = minutes % 60;

      switch (format) {
        case "hh:mm:ss":
          {
            let result = `${pad(hours)}:${pad(minutes)}:${pad(second)}`;

            return result;
          }
          break;

        case "mm:ss":
          {
            let result;
            if (value >= 3600) {
              // => turn to hh:mm:ss

              result = `${pad(hours)}:${pad(minutes)}:${pad(second)}`;
            } else {
              result = `${pad(minutes)}:${pad(second)}`;
            }

            console.log(
              "🚀 ~ file: Helpers.js ~ line 2539 ~ time_convert ~ result",
              result
            );

            return result;
          }
          break;
      }
    } else {
      defaultReturn(format);
    }
  } catch (err) {
    defaultReturn(format);
  }
}

function validateEmail(email: string) {
  try {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  } catch (err) {
  }
}

function convertNumberToLetter(number: number) {
  const letter = (number + 10).toString(36).toUpperCase();
  return letter;
}

function structuredClone(data: any) {
  if (data) {
    return JSON.parse(JSON.stringify(data));
  } else {
    return data;
  }
}

function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function b64toBlob(dataURI: string, type = "image/jpeg") {
  try {
    var byteString = atob(dataURI.split(",")[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);

    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: type });
  } catch (err) {
  }
}

async function loop(
  params: {
    tick: any;
    func: any;
    limit: any;
    threshold: any;
    hasOwnProperty?: any;
  },
  loopId: any,
  n = 0
) {
  console.log(
    "🚀 ~ file: Helpers.js ~ recursiveLoop line 901 ~ loop ~ loopId",
    loopId
  );

  function stop() {
    if (loopId) {
      console.log(
        "🚀 ~ file: Helpers.js  recursiveLoop ~ line 907 ~ stop ~ loopId",
        loopId
      );

      clearInterval(loopId);
      loopId = 0;
    }
  }

  const paramThreshold =
    (params?.hasOwnProperty("threshold") &&
      typeof params.threshold != "undefined") ||
      false
      ? params?.threshold?.localStorage &&
      JSON.parse(
        localStorage.getItem(params?.threshold?.localStorage) || "null"
      )
      : params?.threshold?.sessionStorage
        ? JSON.parse(
          sessionStorage.getItem(params?.threshold?.sessionStorage) || "null"
        )
        : true;

  console.log(
    "🚀 ~ file: Helper.js ~ recursiveLoop ~ line 29 ~ loop ~ paramThreshold",
    paramThreshold
  );

  const paramLimit =
    (params?.hasOwnProperty("limit") && typeof params.limit != "undefined") ||
      false
      ? params.limit
      : true;
  console.log(
    "🚀 ~ file: Helpers.js  recursiveLoop ~ line 919 ~ loop ~ paramLimit",
    paramLimit
  );

  if (paramThreshold) {
    if (paramLimit) {
      if (!loopId) {
        loopId = await setTimeout(async () => {
          if (params.func && typeof params.func == "function") {
            await params.func();
          }

          await loop(params, loopId, n + 1);
        }, params.tick);
      }
    } else {
      stop();
    }
  } else {
    stop();
  }

  return stop;
}
async function recursiveLoop(params: {
  tick: number;
  func: any;
  limit: any;
  threshold: any;
}) {
  try {
    const tick = params?.tick || 2000;
    const func = params?.func;
    const limit = params?.limit;
    const threshold = params?.threshold;

    let loopId = 0;

    const stop = await loop(
      {
        tick: tick,
        func: func,
        limit: limit,
        threshold: threshold,
      },
      loopId
    );

    return stop;
  } catch (err) {
    console.log(
      "🚀 ~ file: Helper.js ~ recursiveLoop ~ line 60 ~ recursiveLoop ~ err",
      err
    );
  }
}

function percentage(partialValue: number, totalValue: number) {
  return (100 * partialValue) / totalValue;
}

function hasClassName(classNames: string, name: any) {
  try {
    return classNames?.split(" ").includes(name);
  } catch (err) {
    return null;
  }
}

function compareObject(obj1: any, obj2: any) {
  try {
    return JSON.stringify(obj1 || {}) == JSON.stringify(obj2 || {});
  } catch (err) {
    return null;
  }
}

function addArray(obj1 = [], obj2 = []) {
  try {
    return _.uniq([...(obj1 || []), ...(obj2 || [])]);
  } catch (err) {
    return [];
  }
}

function difference(obj1: { [x: string]: any }, obj2: { [x: string]: any }) {
  try {
    return Object.keys(obj1).filter((k) => obj1[k] !== obj2[k]);
  } catch (err) {
    return [];
  }
}

function openSnackbar(name: any = "generalError", message?: any, variant = "error") {
  try {
    const { getHead, locale } = require("@/app/data/head");

    const notistack = require("notistack");

    const head = message
      ? { message, type: variant }
      : getHead({ name: "headAlert" })[name];

    notistack?.enqueueSnackbar(locale({ label: head?.message }), {
      variant: head?.type,
    });
  } catch (err) {
  }
}

function filterObjectByKey(object = {}, key: string | string[]) {
  try {
    return _.pickBy(object, (value, k) => {
      if (typeof key == "string") {
        return k != key;
      } else if (Array.isArray(key)) {
        return !key.includes(k);
      }
    });
  } catch (err) {
    return object;
  }
}

function isStringEqual(string1: string, string2: string) {
  return string1.toUpperCase() === string2.toUpperCase();
}

function objectToFormData(object: any) {
  try {
    const formData = new FormData();
    Object.keys(object).forEach((key) =>
      // formData[key] = object[key]
      formData.append(key, object[key])
    );
    return formData;
  } catch (err) {
    console.log(
      "🚀 ~ file: Helpers.js ~ line 1474 ~ objectToFormData ~ err",
      err
    );
    return object;
  }
}

function getCurrentLanguage() {
  try {
    const Router = require("next/router")?.default;
    const lang = Router?.locale || localStorage?.lang || Config.defaultLanguage;
    return lang
  } catch (err) {
    return Config.defaultLanguage
  }
}
function getColor(type: string = 'primary') {
  try {

    if (window) {
      switch (type) {

        case 'primary': {

          return window?.getComputedStyle && document && window?.getComputedStyle(document?.querySelector(':root')!).getPropertyValue('--color-primary')

        } break
        case 'secondary': {

          return window?.getComputedStyle && document && window?.getComputedStyle(document?.querySelector(':root')!).getPropertyValue('--color-secondary')

        } break
      }

    }
    return ''

  }
  catch (err) {
    return ''
  }

}

function currencyFormatter(value: any) {

  const lang: any = require('next/router')?.default?.locale || Config.defaultLanguage
  const refactorLang = {
    'en': 'en-US',
  }[lang as keyof object]


  const result = new Intl.NumberFormat(refactorLang, {
    style: 'currency',
    currency: '$',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return result.format(value || 0)

}
function getDescendantProp(obj: any = {}, desc: any) {
  try {

    var arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()]));
    return obj;

  }
  catch (err) {

    return obj
  }

}

function getDayName(date: Date, locale: string = 'en') {
  return date.toLocaleDateString(locale, { weekday: 'long' })
}
function getWeekDays(locale: string = 'en') {
  var baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
  var weekDays = [];
  for (let i: number = 0; i < 7; i++) {
    weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }));
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
}

function getDaysInMonth(month: number = new Date().getMonth(), year: number = new Date().getFullYear()) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

function getWeek(date: Date = new Date()) {
  const onejan: any = new Date(date.getFullYear(), 0, 1);
  const today: any = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayOfYear = ((today - onejan + 86400000) / 86400000);
  return Math.ceil(dayOfYear / 7)
}

function ArrayValid(data: any) {
  return Array.isArray(data) && data?.length > 0
}

const Helpers = {
  ArrayValid,
  getWeek,
  getDayName,
  getWeekDays,
  getDescendantProp,
  currencyFormatter,
  getColor,
  getCurrentLanguage,
  objectToFormData,
  isStringEqual,
  filterObjectByKey,
  openSnackbar,
  difference,
  addArray,
  compareObject,
  hasClassName,
  percentage,
  validateEmail,
  randomNumber,
  isPropertyEmpty,
  combineArrayOfObject,
  changeSlugWithoutReload,
  formatDate_ddmmyyyy,
  formatDate_yyyymmdd,
  intersectArray,
  isArrayEqual,
  isValidHttpUrl,
  extractEffectiveDate,
  getUniqueFromArrayOfObjectbyId,
  removeArrayOfObjectbyId,
  isURL,
  formatTimeNow_hhmmss,
  getRangeDate,
  isPropertyFilledOne,
  sleep,
  addMarkOnString,
  removeMarkOnString,
  markStringByKeyword,
  delayFunction,
  downloadBlob,
  changeQueriesWithoutReload,
  generateFormatTime,
  getImagesFromHtml,
  time_convert,
  convertNumberToLetter,
  filterDataByKeyword,
  structuredClone,
  b64toBlob,
  recursiveLoop,
  pushURLWithoutReload,
  formatDateDefault,
  formatBytes,
  getDaysInMonth,
};

export default Helpers