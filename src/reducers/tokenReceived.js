const tokenReceived = (state = true, action) => {
    console.log(action)
    switch (action.type) {
        default: return state;
        case "SET_RECEIVE": return action.tokenReceived;
    }
}

export default tokenReceived;