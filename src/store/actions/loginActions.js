export const TOOGLE_USERID = "TOOGLE_USERID";
export const TOOGLE_CARTTOTAL = "TOOGLE_CARTTOTAL";
export const SELECTED_ADDRESS = "SELECTED_ADDRESS";
export const toogleUser = (
  id,
  username,
  email,
  jwt,
  firstname,
  lastname,
  logged
) => {
  console.log(
    "LoginActions",
    username,
    email,
    jwt,
    firstname,
    lastname,
    logged
  );
  return {
    type: TOOGLE_USERID,
    id: id,
    username: username,
    email: email,
    jwt: jwt,
    firstname: firstname,
    lastname: lastname,
    logged: logged,
  };
};
export const toggleCartTotal = (qty, total) => {
  return { type: TOOGLE_CARTTOTAL, quantity: qty, total: total };
};
export const selectedAddress = (address) => {
  return { type: SELECTED_ADDRESS, address: address };
};
