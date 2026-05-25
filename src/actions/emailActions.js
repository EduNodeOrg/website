import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  EMAIL_UNSUBSCRIBE_LOADING,
  EMAIL_UNSUBSCRIBE_SUCCESS,
  EMAIL_UNSUBSCRIBE_FAIL,
  EMAIL_PREFERENCES_LOADING,
  EMAIL_PREFERENCES_SUCCESS,
  EMAIL_PREFERENCES_FAIL,
  EMAIL_STATUS_LOADING,
  EMAIL_STATUS_SUCCESS,
  EMAIL_STATUS_FAIL,
} from './types';

// Check unsubscribe status
export const checkUnsubscribeStatus = (email) => (dispatch) => {
  dispatch({ type: EMAIL_STATUS_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };

  axios
    .get(`https://edunode.herokuapp.com/api/email/unsubscribe/status/${encodeURIComponent(email)}`, config)
    .then((res) => {
      dispatch({
        type: EMAIL_STATUS_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response?.data, err.response?.status, 'EMAIL_STATUS_FAIL'),
      );
      dispatch({
        type: EMAIL_STATUS_FAIL,
      });
    });
};

// Unsubscribe user
export const unsubscribeUser = (email, campaignId, reason, customReason) => (dispatch) => {
  dispatch({ type: EMAIL_UNSUBSCRIBE_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };

  const body = JSON.stringify({ email, campaign: campaignId, reason, customReason });

  axios
    .post('https://edunode.herokuapp.com/api/email/unsubscribe', body, config)
    .then((res) => {
      dispatch({
        type: EMAIL_UNSUBSCRIBE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response?.data, err.response?.status, 'EMAIL_UNSUBSCRIBE_FAIL'),
      );
      dispatch({
        type: EMAIL_UNSUBSCRIBE_FAIL,
      });
    });
};

// Get email preferences
export const getEmailPreferences = (email) => (dispatch) => {
  dispatch({ type: EMAIL_PREFERENCES_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };

  axios
    .get(`https://edunode.herokuapp.com/api/email/unsubscribe/preferences?email=${encodeURIComponent(email)}`, config)
    .then((res) => {
      dispatch({
        type: EMAIL_PREFERENCES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response?.data, err.response?.status, 'EMAIL_PREFERENCES_FAIL'),
      );
      dispatch({
        type: EMAIL_PREFERENCES_FAIL,
      });
    });
};

// Update email preferences
export const updateEmailPreferences = (email, preferences) => (dispatch) => {
  dispatch({ type: EMAIL_PREFERENCES_LOADING });

  const config = {
    headers: {
      "Content-Type": "application/json",
    }
  };

  const body = JSON.stringify({ email, preferences });

  axios
    .post('https://edunode.herokuapp.com/api/email/unsubscribe/preferences', body, config)
    .then((res) => {
      dispatch({
        type: EMAIL_PREFERENCES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response?.data, err.response?.status, 'EMAIL_PREFERENCES_FAIL'),
      );
      dispatch({
        type: EMAIL_PREFERENCES_FAIL,
      });
    });
};
