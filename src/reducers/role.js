const role = (state = '', action) => {
    switch (action.type) {
        default: return state;
        case "SET_ROLE": return action.role;
    }
}

export default role;