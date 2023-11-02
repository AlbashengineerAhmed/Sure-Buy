const authReducer = (state, action) => {
    switch (action.type) {
    case 'REGISTER_START':
        return {
        ...state,
        registration: {
            loading: true,
            error: null,
        },
        };
    case 'REGISTER_SUCCESS':
        return {
        ...state,
        registration: {
            loading: false,
            error: null, // Clear any previous registration errors
        },
        };
    case 'REGISTER_FAILURE':
        return {
        ...state,
        registration: {
            loading: false,
            error: action.payload,
        },
        };
    case 'LOGIN_START':
        return {
        ...state,
        login: {
            loading: true,
            error: null,
        },
        };
    case 'LOGIN_SUCCESS':
        return {
        ...state,
        login: {
            loading: false,
            error: null, // Clear any previous login errors
        },
        };
    case 'LOGIN_FAILURE':
        return {
        ...state,
        login: {
            loading: false,
            error: action.payload,
        },
        };
    default:
        return state;
    }
};

export default authReducer;
