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
} from '../actions/types';

const initialState = {
  preferences: {
    marketing: false,
    notifications: false,
    newsletters: false,
    updates: false,
    courseRecommendations: false,
    achievementNotifications: false
  },
  isUnsubscribed: false,
  unsubscribeReason: null,
  unsubscribeDate: null,
  loading: false,
  error: null
};

export default function emailReducer(state = initialState, action) {
  switch (action.type) {
    case EMAIL_STATUS_LOADING:
    case EMAIL_UNSUBSCRIBE_LOADING:
    case EMAIL_PREFERENCES_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
    case EMAIL_STATUS_SUCCESS:
      return {
        ...state,
        isUnsubscribed: action.payload.unsubscribed,
        unsubscribeData: action.payload.unsubscribeData,
        loading: false,
        error: null
      };
    case EMAIL_UNSUBSCRIBE_SUCCESS:
      return {
        ...state,
        isUnsubscribed: true,
        unsubscribeReason: action.payload.reason,
        unsubscribeDate: new Date(),
        loading: false,
        error: null
      };
    case EMAIL_PREFERENCES_SUCCESS:
      return {
        ...state,
        preferences: action.payload.preferences || state.preferences,
        loading: false,
        error: null
      };
    case EMAIL_STATUS_FAIL:
    case EMAIL_UNSUBSCRIBE_FAIL:
    case EMAIL_PREFERENCES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
