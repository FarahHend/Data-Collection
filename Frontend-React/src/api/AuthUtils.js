// authUtils.js

// helpers.js

import jwtDecode from 'jwt-decode';

export const getUserIdFromToken = (token) => {
  console.log("Token in getUserIdFromToken:", token);
  const decodedToken = jwtDecode(token);
  console.log("Decoded Token:", decodedToken);
  const userId = decodedToken.sub;
  console.log("User ID extracted from token:", userId);
  return userId;
};

  

//export const getUserIdFromToken = (token) => {
    //const [, payload] = token.split('.'); // Split the token into parts and ignore the header and signature
    //const decodedPayload = atob(payload); // Decode the base64-encoded payload
    //const { sub: userId } = JSON.parse(decodedPayload); // Parse the JSON payload and extract the 'sub' claim as the user ID
    //return userId;
  //};
  