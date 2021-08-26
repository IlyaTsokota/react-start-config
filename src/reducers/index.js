import getTestObject from './test-obj';

const reducer = (state, action) => {
    return {
        testObj: getTestObject(state.testObj, action),
    };
};

export default reducer;