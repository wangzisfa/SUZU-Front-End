const auth = (state = '', action) => {

    // console.log(action);
    switch (action.type) {
        default: return state;
        case "SET_AUTH": return action.auth;
    }
}
export default auth