const tokenSearch = (state = "", action) => {
    console.log(action)
    switch (action.type) {
        default: return state;
        case "SET_TOKEN_SEARCH": return action.tokenSearch;
    }
}

export default tokenSearch;