const userProfile = (state = {
    username: "" ,
    gender: "男" ,
    sign: "" ,
}, action) => {
    // console.log(action)
    switch (action.type) {
        default: return state;
        case "SET_USER_PROFILE": return action.user;
    }
}

export default userProfile;