export const TOOGLE_BLUE = "TOGGLE_Blue";
export const TOOGLE_RED = "TOOGLE_RED";

export const TOGGLE_RM_HANDEL = "TOGGLE_RM_HANDEL";
export const TOGGLE_WW_HANDEL = "TOGGLE_WW_HANDEL";
export const TOGGLE_KW_HANDEL = "TOGGLE_KW_HANDEL";

export const TOGGLE_GW_HANDEL = "TOGGLE_GW_HANDEL";
export const TOGGLE_WERKSTATT = "TOOGLE_WERKSTATT";
export const TOGGLE_VERMIETUNG = "TOGGLE_VERMIETUNG";
export const TOGGLE_SHOP = "TOGGLE_SHOP";
export const TOGGLE_ERGEBNIS = "TOGGLE_ERGEBNIS";
export const TOGGLE_INVESTITIONEN = "TOOGLE_INVESTITIONEN";
export const TOGGLE_AUSBLICK = "TOGGLE_AUSBLICK";

export const TOOGLE_GUAGE_ANGLE = "TOOGLE_GUAGE_ANGLE";

export const toogleGuageAngle = (guage_angle) => {
  return {
    type: TOOGLE_GUAGE_ANGLE,
    guage_angle: guage_angle,
  };
};

export const toogleAusblick = (score, labels, real) => {
  return {
    type: TOGGLE_AUSBLICK,
    score: score,
    labels: labels,
    real: real,
  };
};

export const toogleInvestitionen = (score, labels, real) => {
  return {
    type: TOGGLE_INVESTITIONEN,
    score: score,
    labels: labels,
    real: real,
  };
};

export const toogleErgebnis = (score, labels, real) => {
  return {
    type: TOGGLE_ERGEBNIS,
    score: score,
    labels: labels,
    real: real,
  };
};

export const toogleShop = (score, labels, real) => {
  return {
    type: TOGGLE_SHOP,
    score: score,
    labels: labels,
    real: real,
  };
};

export const toogleVermietung = (score, labels, real) => {
  return {
    type: TOGGLE_VERMIETUNG,
    score: score,
    labels: labels,
    real: real,
  };
};

export const toogleGwHandel = (score, labels, real) => {
  return {
    type: TOGGLE_GW_HANDEL,
    score: score,
    labels: labels,
    real: real,
  };
};

export const toogleWerkstatt = (score, labels, real) => {
  return {
    type: TOGGLE_WERKSTATT,
    score: score,
    labels: labels,
    real: real,
  };
};

export const toogleRmHandel = (score, labels, real) => {
  return {
    type: TOGGLE_RM_HANDEL,
    score: score,
    labels: labels,
    real: real,
  };
};
export const toogleWwHandel = (score, labels, real) => {
  return {
    type: TOGGLE_WW_HANDEL,
    score: score,
    labels: labels,
    real: real,
  };
};
export const toogleKwHandel = (score, labels, real) => {
  return {
    type: TOGGLE_KW_HANDEL,
    score: score,
    labels: labels,
    real: real,
  };
};
export const toogleBlue = (
  name,
  score,
  labels,
  developmentIncreasement,
  real
) => {
  return {
    type: TOOGLE_BLUE,
    name: name,
    score: score,
    labels: labels,
    developmentIncreasement: developmentIncreasement,
    real: real,
  };
};

export const toogleRed = (
  name,
  score,
  labels,
  developmentIncreasement,
  real
) => {
  return {
    type: TOOGLE_RED,
    name: name,
    score: score,
    labels: labels,
    developmentIncreasement: developmentIncreasement,
    real: real,
  };
};
