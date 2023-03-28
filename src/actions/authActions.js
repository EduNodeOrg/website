import axios from "axios";
import { returnErrors } from "./errorActions"
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  VERIFICATION_SUCCESS,
  VERIFICATION_FAIL,
  IS_VERIFYING,
  HAS_USERNAME,
  ALBEDO_VERIFICATION_SUCCESS,
  FIRST_COURSE_DONE,
  UPDATED_ACCOUNT
} from './types';



// check token and load user

export const loadUser = () => (dispatch, getState) => {

    //user loading
    dispatch({ type: USER_LOADING });

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    axios
      .get(
        'http://localhost:5001/api/auth/user',
        tokenConfig(getState),
        config,
      )
      .then((res) => {
        dispatch({
          type: USER_LOADED,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status),
        );
        dispatch({
          type: AUTH_ERROR,
        });
      });
};

// register user
export const register = ({ email, password, confirmationCode }) => async dispatch => {

    dispatch({ type: USER_LOADING });


    // request body

    const body = JSON.stringify({ email, password, confirmationCode });

fetch('http://localhost:5001/api/emailauth/', {
method: 'POST', 
headers: {
'Access-Control-Allow-Origin': '*',
'Content-Type': 'application/json'
},
body
})
.then(response => response.json())
.then((res) => {
console.log(res)
if (res.user.isVerified === true) {
  dispatch({
    type: VERIFICATION_SUCCESS,
    payload: res.data,
  });
}
  if (res.user.email) {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
});
}
})
      .catch(
        (err) => {
        console.log("register failed", err)

        dispatch({
          type: REGISTER_FAIL,
         
        })
      });
}


// login User

export const login = ({ email, password }) => dispatch => {
console.log(email)
    dispatch({ type: USER_LOADING });

    // request body

    const body = JSON.stringify({ email, password });
 

    fetch('http://localhost:5001/api/emaillogin/', {
      method: 'POST', 
      headers: {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
},
body
})
  .then(response => response.json())
  .then(data => {
 if (data.user !== undefined) {
  dispatch({
    type: LOGIN_SUCCESS,
    payload: data,
  });
} 
 if (data.user.isVerified === true) {
  dispatch({
    type: VERIFICATION_SUCCESS,
    payload: data,
  });
}

})
      .catch((err) => {
        console.log(err);

        dispatch({
          type: LOGIN_FAIL,
          payload: err
        });
      });

}

// send E-mail with confirmation code



export const confirm = ({email, confirmationCode}) => (dispatch) => {



    const body = JSON.stringify({email, confirmationCode});

    fetch('http://localhost:5001/api/confirm', {
      method: 'POST', 
      headers: {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
},
body
})
  .then(response => response.json())
  .then(data => {
    console.log(data)

})
}
    

// resend code

export const resend = (email) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    const body = JSON.stringify({ email });

    axios.post('http://localhost:5001/api/resend', body, config);

}


// logout User

export const logout = () => {

   
    return {
        type: LOGOUT_SUCCESS
    }
}


// setup config/header and token

export const tokenConfig = getState => {

    // Get token from local storage

    const token = getState().auth.token;
    // headers

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    };

    // if token, add to header
    if (token) {
        config.headers["x-auth-token"] = token
    }

    return config
}



// verify code

export const verifyCode = ({ email, inputcode, id, next }) => async dispatch => {

    dispatch({ type: IS_VERIFYING });

    const body = JSON.stringify({ email, inputcode, id });
  
    // axios
    // .put('http://localhost:5001/api/users/username', body, config)
     await fetch('http://localhost:5001/api/verifycode', {
      method: 'POST', 
      headers: {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json'
},
body
})
  .then(response => response.json())
  .then(data => {
    if(data){
           if(data.user.isVerified === true){
        dispatch({
          type: VERIFICATION_SUCCESS,
          payload: data,
        })
      } else {
        dispatch({
              type: VERIFICATION_FAIL,
              payload: data,
            })
      } 
      console.log(data)
    }
})  
    .catch((err) => console.log(err));


}

// update name

export const saveUsername = ({ email, username }) => dispatch => {

    dispatch({ type: USER_LOADING });
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    const body = JSON.stringify({ email, username });

    axios
      .put('http://localhost:5001/api/users/username', body, config)
      .then((res) => {
        dispatch({
          type: HAS_USERNAME,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));

}

// update account

export const updateAccount = ({ email,
  name,
  age,
  bio,
  location }) => dispatch => {

  dispatch({ type: USER_LOADING });
  const config = {
      headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
      }
  }

  const body = JSON.stringify({ 
    email,
    name,
    age,
    bio,
    location 
  });

  axios
    .put('http://localhost:5001/api/users/useraccount', body, config)
    .then((res) => {
      dispatch({
        type: UPDATED_ACCOUNT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));

}

// login / verify Google user 

export const verifyGoogleUser = ({ email, lastName, fistName, googleId, googleProfilePic, userName, pkey }) => dispatch => {

    dispatch({ type: USER_LOADING });

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

   

    const body = JSON.stringify({
      email,
      lastName,
      fistName,
      googleId,
      googleProfilePic,
      userName,
      pkey
    });

    axios
      .post('http://localhost:5001/api/users/google', body, config)

      .then((res) => {
        console.log(res.data.user.courseOneDone);
        if (res.data.user.courseOneDone) {
          dispatch({
            type: FIRST_COURSE_DONE,
            payload: res.data,
          });
        } else {
          dispatch({
            type: HAS_USERNAME,
            payload: res.data,
          });
        }
        
      })
      .catch((err) => console.log(err));

}

// verfify Twitter user

export const verifyTwitterUser = ({ email, lastName, fistName, googleId, googleProfilePic, userName, pkey }) => dispatch => {
console.log("hi")

  dispatch({ type: USER_LOADING });

  const config = {
      headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
      }
  }

 

  const body = JSON.stringify({
    email,
    lastName,
    fistName,
    googleId,
    googleProfilePic,
    userName,
    pkey
  });

  axios
    .post('http://localhost:5001/api/users/twitter', body, config)

    .then((res) => {
      console.log(res.data.user.courseOneDone);
      if (res.data.user.courseOneDone) {
        dispatch({
          type: FIRST_COURSE_DONE,
          payload: res.data,
        });
      } else {
        dispatch({
          type: HAS_USERNAME,
          payload: res.data,
        });
      }
      
    })
    .catch((err) => console.log(err));

}

// albedo user auth

const config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
};

export const albedoAuth = ({ 
  intent,
  pubkey,
  signature,
  signed_message
}) => async dispatch => {
  dispatch({ type: USER_LOADING });

  // Request body
  const body = JSON.stringify({     
    intent,
    pubkey,
    signature,
    signed_message
  });

  try {
    const res = await axios.post(
      'https://desolate-woodland-50855.herokuapp.com/api/albedo', 
      body, 
      config
    );
    dispatch({
      type: ALBEDO_VERIFICATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// update name

export const saveUsernameAlbedo = ({ pubkey, userName }) => dispatch => {

    dispatch({ type: USER_LOADING });

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    const body = JSON.stringify({ pubkey, userName });

    axios
      .put('http://localhost:5001/api/albedo/username', body, config)
      .then((res) => {
        dispatch({
          type: HAS_USERNAME,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));

}

// put course 

export const setCourseOne = ({ email, courseOneDone }) => (dispatch) => {

  dispatch({ type: USER_LOADING });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  const body = JSON.stringify({ email, courseOneDone });

  axios
    .put('http://localhost:5001/api/users/courses', body, config)
    .then((res) => {
      dispatch({
        type: FIRST_COURSE_DONE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// put course google users

export const setCourseOneGoogle = ({ email, courseOneDone }) => (
  dispatch,
) => {
  dispatch({ type: USER_LOADING });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  const body = JSON.stringify({ email, courseOneDone });

  axios
    .put('http://localhost:5001/api/users/google', body, config)
    .then((res) => {
      dispatch({
        type: FIRST_COURSE_DONE,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// put pkey google users

export const pkeyGoogleUser = ({ email, pkey }) => (
  dispatch,
) => {
  dispatch({ type: USER_LOADING });
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  const body = JSON.stringify({ email, pkey });

  axios
    .put('http://localhost:5001/api/users/googlepk', body, config)
    .then((res) => {
      console.log(res)
      dispatch({
        type: UPDATED_ACCOUNT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};


// web3auth user auth

export const webThreeAuth = ({ 
  id,
  className, 
}) => dispatch => {

 dispatch({ type: USER_LOADING });

// dispatch({ type: VERIFICATION_SUCCESS });


   const config = {
         headers: {
           "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*"
         }
      }

 const body = JSON.stringify({     
  id,
  className,
});

      axios
        .post('http://localhost:5001/api/web3auth', body, config)
        .then((res) => {
          dispatch({
            type: VERIFICATION_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
}


// freighter user auth

export const freighterAuth = ( pkey) => dispatch => {

 dispatch({ type: USER_LOADING });

// dispatch({ type: VERIFICATION_SUCCESS });


   const config = {
         headers: {
           "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*"
         }
      }

 const body = JSON.stringify({     
  pkey,
});

      axios
        .post('http://localhost:5001/api/freighter', body, config)
        .then((res) => {
          dispatch({
            type: VERIFICATION_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
}

// freighter NFT issuing

export const freighterSign = (pkey) => dispatch => {

  dispatch({ type: USER_LOADING });
 
 // dispatch({ type: VERIFICATION_SUCCESS });
 
 
    const config = {
          headers: {
            "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
          }
       }
 
  const body = JSON.stringify({     
   pkey,
 });
 
       axios
         .post('http://localhost:5001/api/freighternft', body, config)
         .then((res) => {
           dispatch({
             type: VERIFICATION_SUCCESS,
             payload: res.data,
           });
         })
         .catch((err) => console.log(err));
 }

// freighter user auth

export const metamaskAuth = (accounts) => dispatch => {

  dispatch({ type: USER_LOADING });
 
    const config = {
          headers: {
            "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
          }
       }
 
  const body = JSON.stringify({     
   accounts,
 });
 
       axios
         .post('http://localhost:5001/api/metamasklogin', body, config)
         .then((res) => {
           if (res.isVerified = true) {
            dispatch({
              type: VERIFICATION_SUCCESS,
              payload: res.data,
            });
           } else {
            dispatch({
              type: VERIFICATION_FAIL,
              payload: res.data,
            });
           }
          
         })
         .catch((err) => console.log(err));
 }

// mozart user auth

export const mozartAuth = (email, pkey, amount, currency) => dispatch => {

 dispatch({ type: USER_LOADING });

// dispatch({ type: VERIFICATION_SUCCESS });


   const config = {
         headers: {
           "Content-Type": "application/json",
             "Access-Control-Allow-Origin": "*"
         }
      }

 const body = JSON.stringify({     
  pkey,
});

      axios
        .post('http://localhost:5001/api/mozart', body, config)
        .then((res) => {
          dispatch({
            type: VERIFICATION_SUCCESS,
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
}