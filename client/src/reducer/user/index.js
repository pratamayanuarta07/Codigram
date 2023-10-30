import { GET_ITEM, ADD_ITEM, DELETE_ITEM, LOGIN, REFRESH, ADD_POST, GET_POSTING, UPDATE_POSTING, GET_POSTING1, UPDATE_POSTING1, GET_SELF, GET_ONE, PICK_ONE } from "../../action/user";
const initialState = {
    getListItemResult : false,
    getListItemLoading : false,
    getListItemError : false,

    getSelfItemResult : false,
    getSelfItemLoading : false,
    getSelfItemError : false,

    addListItemResult : false,
    addListItemLoading : false,
    addListItemError : false,

    deleteListItemResult : false,
    deleteListItemLoading : false,
    deleteListItemError : false,

    loginListItemResult : false,
    loginListItemLoading : false,
    loginListItemError : false,

    refreshListItemResult : false,
    refreshListItemLoading : false,
    refreshListItemError : false,

    addPostItemResult : false,
    addPostItemLoading : false,
    addPostItemError : false,
    
    getPostItemResult : false,
    getPostItemLoading : false,
    getPostItemError : false,

    updatePostItemResult : false,
    updatePostItemLoading : false,
    updatePostItemError : false,

    get1PostItemResult : false,
    get1PostItemLoading : false,
    get1PostItemError : false,

    getOnePostItemResult : false,
    getOnePostItemLoading : false,
    getOnePostItemError : false,

    update1PostItemResult : false,
    update1PostItemLoading : false,
    update1PostItemError : false,

    PickOnePostItemResult : false,
    PickOnePostItemLoading : false,
    PickOnePostItemError : false,
};
const list = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEM:
            return {
                ...state,
                getListItemResult: action.payload.data,
                getListItemLoading: action.payload.loading,
                getListItemError: action.payload.errorMessage
            }
        case GET_SELF:
            return {
                ...state,
                getSelfItemResult: action.payload.data,
                getSelfItemLoading: action.payload.loading,
                getSelfItemError: action.payload.errorMessage
            }
        case ADD_ITEM:
            return {
                ...state,
                addListItemResult: action.payload.data,
                addListItemLoading: action.payload.loading,
                addListItemError: action.payload.errorMessage
            }
        case DELETE_ITEM:
            return {
                ...state,
                deleteListItemResult: action.payload.data,
                deleteListItemLoading: action.payload.loading,
                deleteListItemError: action.payload.errorMessage
            }
        case LOGIN:
            return {
                ...state,
                loginListItemResult: action.payload.data,
                loginListItemLoading: action.payload.loading,
                loginListItemError: action.payload.errorMessage
            }
        case REFRESH:
            return {
                ...state,
                refreshListItemResult: action.payload.data,
                refreshListItemLoading: action.payload.loading,
                refreshListItemError: action.payload.errorMessage
            }
        case ADD_POST:
            return {
                ...state,
                addPostItemResult: action.payload.data,
                addPostItemLoading: action.payload.loading,
                addPostItemError: action.payload.errorMessage
            }
        case GET_POSTING:
            return {
                ...state,
                getPostItemResult: action.payload.data,
                getPostItemLoading: action.payload.loading,
                getPostItemError: action.payload.errorMessage
            }
        case UPDATE_POSTING:
            return {
                ...state,
                updatePostItemResult: action.payload.data,
                updatePostItemLoading: action.payload.loading,
                updatePostItemError: action.payload.errorMessage
            }
        case GET_POSTING1:
            return {
                ...state,
                get1PostItemResult: action.payload.data,
                get1PostItemLoading: action.payload.loading,
                get1PostItemError: action.payload.errorMessage
            }
        case UPDATE_POSTING1:
            return {
                ...state,
                update1PostItemResult: action.payload.data,
                update1PostItemLoading: action.payload.loading,
                update1PostItemError: action.payload.errorMessage
            }  
        case GET_ONE:
            return {
                ...state,
                getOnePostItemResult: action.payload.data,
                getOnePostItemLoading: action.payload.loading,
                getOnePostItemError: action.payload.errorMessage
            }
        case PICK_ONE:
            return {
                ...state,
                PickOnePostItemResult: action.payload.data,
                PickOnePostItemLoading: action.payload.loading,
                PickOnePostItemError: action.payload.errorMessage
            }    
        default:
            return state;
    }
}
export default list;