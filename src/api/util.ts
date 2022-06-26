

// API Endpoint
export const url_prefix = process.env.REACT_APP_API_URL;

// Method: Checks response status
export const checkStatus = async (res: any) => {
  if (res.ok) {
    return res;
  } 
  else if(res.status === 401) {
    return res.json().then((msg: any) => {
      throw new Error(msg);
    });
    }
  else {
    return res.json().then((msg: any) => {
      throw new Error(msg);
    });
  }
};

// Method: Delete user in local storage
const clearUser = async () => {
  window.localStorage.removeItem("token");
};
