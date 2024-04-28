const validator = (values: any) => {
  if (!values.length) {
    let err = false;
    for (const obj in values) {
      if (!values[obj]["type"]) {
        if (
          typeof values[obj]["value"] != "boolean" &&
          ((values[obj]["is_require"] && values[obj]["error"]) ||
            (values[obj]["is_require"] &&
              (values[obj]["value"] == null ||
                values[obj]["value"] === "" ||
                (typeof values[obj]["value"] == "string" &&
                  values[obj]["value"] &&
                  values[obj]["value"].trim() === ""))))
        ) {
          values[obj]["error"] = true;
          err = true;
        }
      } else {
        if (
          values[obj]["type"] !== "boolean" &&
          values[obj]["type"] !== "price" &&
          values[obj]["type"] !== "number" &&
          values[obj]["type"] !== "object" &&
          values[obj]["is_require"] &&
          values[obj]["value"] &&
          values[obj]["value"].trim() === ""
        ) {
          values[obj]["error"] = true;
          err = true;
          values[obj]["err_msg"] = "Require field";
        } else if (values[obj]["is_require"]) {
          if (values[obj]["type"] === "text") {
            if (
              !(
                values[obj]["value"] &&
                values[obj]["value"].trim().length >=
                  values[obj]["min_length"] &&
                ((values[obj]["max_length"] &&
                  values[obj]["value"] &&
                  values[obj]["value"].trim().length <=
                    values[obj]["max_length"]) ||
                  values[obj]["max_length"] == null)
              )
            ) {
              values[obj]["error"] = true;
              err = true;
              values[obj]["err_msg"] =
                "Should contain min of " +
                values[obj]["min_length"] +
                (values[obj]["max_length"]
                  ? " and max of " + values[obj]["max_length"]
                  : "") +
                " characters";
            }
          } else if (values[obj]["type"] === "boolean") {
            if (values[obj]["value"] == null) {
              values[obj]["error"] = true;
              err = true;
              values[obj]["err_msg"] = "Require field";
            }
          } else if (values[obj]["type"] === "dropdown") {
            if (values[obj]["value"] == null || values[obj]["value"] === "") {
              values[obj]["error"] = true;
              err = true;
              values[obj]["err_msg"] = "Require field";
            }
          } else if (values[obj]["type"] === "price") {
            if (
              (values[obj]["value"] + "").trim().length === 0 ||
              (values[obj]["value"] < 0 &&
                Math.sign(values[obj]["value"]) === -1)
            ) {
              values[obj]["error"] = true;
              err = true;
              values[obj]["err_msg"] = "Invalid Price";
            }
          } else if (values[obj]["type"] === "number") {
            if (
              (values[obj]["value"] < 0 &&
                Math.sign(values[obj]["value"]) === -1) ||
              !values[obj]["value"] ||
              values[obj]["value"] % 1 !== 0
            ) {
              values[obj]["error"] = true;
              err = true;
              values[obj]["err_msg"] = "Invalid Number";
            }
          } else if (values[obj]["type"] === "object") {
            if (
              typeof values[obj]["value"] != "object" ||
              values[obj]["value"] === undefined ||
              values[obj]["value"] == null
            ) {
              values[obj]["error"] = true;
              err = true;
              values[obj]["err_msg"] = "Invalid Input";
            }
          }
        }
      }
    }
    return { values, err };
  } else {
    values = values.map((value: any) => validator(value));
    return {
      values: values.map((f: any) => f.values),
      err: values.filter((f: any) => f.err).length > 0,
    };
  }
};

function generateRandomId(length = 16) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }
  return id;
}

function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  } else {
    return str.slice(0, maxLength) + "...";
  }
}

function getNextDays(count: number) {
  const today = new Date();
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + count); // Add two days
  const options: any = { day: "2-digit", month: "2-digit", year: "numeric" };
  return dayAfterTomorrow.toLocaleDateString("en-US", options);
}


export { validator, generateRandomId, truncateString, getNextDays };
