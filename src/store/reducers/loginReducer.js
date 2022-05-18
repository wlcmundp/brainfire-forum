import { TOOGLE_USERID } from "../actions/loginActions";
import { TOOGLE_CARTTOTAL } from "../actions/loginActions";
import { SELECTED_ADDRESS } from "../actions/loginActions";

const initialState = {
  id: null,
  username: null,
  email: null,
  jwt: null,
  firstname: "",
  lastname: "",
  logged: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOOGLE_USERID:
      console.log(
        "Reducer",
        action.id,
        action.username,
        action.email,
        action.jwt,
        action.firstname,
        action.lastname,
        action.logged
      );
      return {
        ...state,
        id: action.id,
        username: action.username,
        email: action.email,
        jwt: action.jwt,
        firstname: action.firstname,
        lastname: action.lastname,
        logged: action.logged,
      };
    case TOOGLE_CARTTOTAL:
      return { ...state, cartTotal: action.total, quantity: action.quantity++ };
    case SELECTED_ADDRESS:
      return { ...state, selectedAddress: action.address };
    default:
      return state;
  }
};

export default loginReducer;
