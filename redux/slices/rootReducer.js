import { combineReducers } from 'redux';

import myProfileSlice from './my-profile';
import usersSlice from './users';
import clientReferralSlice from './client-referrals';

const rootReducer = combineReducers({
    myProfile: myProfileSlice,
    users: usersSlice,
    refferal: clientReferralSlice,
});

export default rootReducer;