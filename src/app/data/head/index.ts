import { Config } from "@/app/constant";
import * as head from "./index.list";
import { Helpers } from "@/app/utils";

export function getHead(params: {
  name: string;
  addLabels?: boolean;
  langFirst?: boolean;
}): any {
  try {
    // =========================================
    // ======== Initialize First Params ========
    // =========================================

    const { name, addLabels, langFirst } = params;

    // =========================================
    // ============== Get Data Head ============
    // =========================================
    const refactorHead: object = head;
    let result: object = refactorHead && refactorHead[name as keyof object];

    if (langFirst) {
      const lang = Helpers.getCurrentLanguage();
      return result[lang as keyof object];
    }

    // =====================================================
    // ============== Add Global Label (Optional) ==========
    // =====================================================

    if (addLabels) {
      const labels: object =
        (refactorHead && refactorHead["labels" as keyof object]) || {};


      result = {
        ...(result || {}),
        label: {
          ...(labels || {}),
        },
      };
    }

    // ==================================
    // ========= Return Result ==========
    // ==================================

    return result;
  } catch (err) {
    console.log("🚀 ~ file: index.js ~ line 23 ~ getHead ~ err", err);
    return {};
  }
}

export function locale(params: {
  label?: any;
  key?: string;
  value?: object;
}): string {
  try {
    const {
      label,
      key,
      value, // object of inserted value
    } = params;

    const isLabelString = label && typeof label == "string";

    if (isLabelString) {
      return label;
    }

    let foundStringLabel: string = isLabelString ? label : "";

    const lang = Helpers.getCurrentLanguage();


    if (key) {
      const refactorHead: object = head;
      
      const labels: object =
        (refactorHead && refactorHead["headLabels" as keyof object]) || {};

      foundStringLabel = labels[key as keyof object][lang] || "";
    } else {
      foundStringLabel = (label && label[lang]) || "";
    }

    const variables: Array<string> = Array.from(
      foundStringLabel?.matchAll(/{(.*?)}/g),
      (x: Array<string>) => x[1]
    );

    if (variables?.length > 0 && value) {
      variables.forEach((item: string) => {
        foundStringLabel = foundStringLabel.replace(
          "{" + item + "}",
          Object.keys(value || {})?.length > 0
            ? value[item as keyof object]
            : ""
        );
      });
    }
    return foundStringLabel;
  } catch (err) {
    console.log(
      "🚀 ~ file: index.js locale ~ line 1237 ~ compareObject ~ err",
      err
    );
    return "";
  }
}

