import actionTypes from "ActionTypes";

const getTestObj = (data = [], loading = true, error = null) => {
    return {
        data,
        loading,
        error,
    };
};

const updateTestObj = (state, action) => {
    if (state === undefined) {
        return getTestObj();
    }

    switch (action.type) {
        case actionTypes.fetchRequestTestData:
            return getTestObj();
        default:
            return state.bookList;
    }
};

export default updateTestObj;