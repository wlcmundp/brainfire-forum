import {
  TOOGLE_RED,
  TOOGLE_BLUE,
  TOGGLE_RM_HANDEL,
  TOGGLE_WW_HANDEL,
  TOGGLE_KW_HANDEL,
  TOGGLE_GW_HANDEL,
  TOGGLE_WERKSTATT,
  TOGGLE_VERMIETUNG,
  TOGGLE_SHOP,
  TOGGLE_ERGEBNIS,
  TOGGLE_INVESTITIONEN,
  TOGGLE_AUSBLICK,
  TOOGLE_GUAGE_ANGLE,
} from "./../actions/graphActions";
const initialState = {
  blue: {
    name: "",
    score: [],
    labels: [],
    developmentIncreasement: "",
    real: [],
  },
  red: {
    name: "",
    score: [],
    labels: [],
    developmentIncreasement: "",
    real: [],
  },
  rm_handel: {
    score: [],
    labels: [],
    real: [],
  },
  ww_handel: {
    score: [],
    labels: [],
    real: [],
  },
  kw_handel: {
    score: [],
    labels: [],
    real: [],
  },
  gw_handel: {
    score: [],
    labels: [],
    real: [],
  },
  werkstatt: {
    score: [],
    labels: [],
    real: [],
  },
  vermietung: {
    score: [],
    labels: [],
    real: [],
  },
  shop: {
    score: [],
    labels: [],
    real: [],
  },
  ergebnis: {
    score: [],
    labels: [],
    real: [],
  },
  investitionen: {
    score: [],
    labels: [],
    real: [],
  },
  ausblick: {
    score: [],
    labels: [],
    real: [],
  },
  guage_angle: "",
};
const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOOGLE_GUAGE_ANGLE:
      return {
        ...state,
        guage_angle: action.guage_angle,
      };
    case TOGGLE_RM_HANDEL:
      return {
        ...state,
        rm_handel: {
          score: action.score,
          labels: action.labels,
          real: action.real,
        },
      };
    case TOGGLE_WW_HANDEL:
      return {
        ...state,
        ww_handel: {
          score: action.score,
          labels: action.labels,
          real: action.real,
        },
      };
    case TOGGLE_KW_HANDEL:
      return {
        ...state,
        kw_handel: {
          score: action.score,
          labels: action.labels,
          real: action.real,
        },
      };
    case TOGGLE_GW_HANDEL:
      return {
        ...state,
        gw_handel: {
          score: action.score,
          labels: action.labels,
          real: action.real,
        },
      };
    case TOGGLE_WERKSTATT:
      return {
        ...state,
        werkstatt: {
          score: action.score,
          labels: action.labels,
          real: action.real,
        },
      };
    case TOGGLE_VERMIETUNG:
      return {
        ...state,
        vermietung: {
          score: action.score,
          labels: action.labels,
          real: action.real,
        },
      };
    case TOGGLE_SHOP:
      return {
        ...state,
        shop: {
          score: action.score,
          labels: action.labels,
          real: action.real,
        },
      };
    case TOGGLE_ERGEBNIS:
      return {
        ...state,
        ergebnis: {
          score: action.score,
          labels: action.labels,
          real: action.real,
        },
      };
    case TOGGLE_INVESTITIONEN:
      return {
        ...state,
        investitionen: {
          score: action.score,
          labels: action.labels,
          real: action.real,
        },
      };
    case TOGGLE_AUSBLICK:
      return {
        ...state,
        ausblick: {
          score: action.score,
          labels: action.labels,
          real: action.real,
        },
      };
    case TOOGLE_BLUE:
      return {
        ...state,
        blue: {
          name: action.name,
          score: action.score,
          labels: action.labels,
          developmentIncreasement: action.developmentIncreasement,
          real: action.real,
        },
      };
    case TOOGLE_RED:
      return {
        ...state,
        red: {
          name: action.name,
          score: action.score,
          labels: action.labels,
          developmentIncreasement: action.developmentIncreasement,
          real: action.real,
        },
      };
    default:
      return state;
  }
};

export default graphReducer;
