const userMessage = (state = {
    message: "" ,
    userReceive: {
        token: "" ,
        user: {
            gender: "" ,
            password: null ,
            sign: "" ,
            userIconURL: null ,
            username: ""
        } ,
        userID: ''
    } ,
    userSend: {
        gender: "" ,
        password: null ,
        sign: "" ,
        userIconURL: "" ,
        username: ""
    }
}, action) => {
    console.log(state)

    switch (action.type) {
        default: return state;
        case "SET_USER_MESSAGE": state = action.message; return state ;
        case "SET_USER_MESSAGE_CONTENT": state.message = action.message; return state;
    }
}

export default userMessage;