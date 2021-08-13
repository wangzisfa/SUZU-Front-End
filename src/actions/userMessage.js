export function setUserMessage(message) {
    return {
        type: "SET_USER_MESSAGE",
        message
    }
}

export function setUserMessageContent(message) {
    console.log(message);
    return {
        type: "SET_USER_MESSAGE_CONTENT",
        message
    }
}


// {
//     message: message ,
//         userReceive: {
//     token: "" ,
//         user: {
//         gender: "" ,
//             password: null ,
//             sign: "" ,
//             userIconURL: null ,
//             username: ""
//     } ,
//     userID: ''
// } ,
//     userSend: {
//         gender: "" ,
//             password: null ,
//             sign: "" ,
//             userIconURL: "" ,
//             username: ""
//     }
// }