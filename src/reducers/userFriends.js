const friendsProfile = (state = [{
    token: "" ,
    user: [{
        username: "" ,
        gender: "" ,
        sign: ""
    }] ,
    userID: ""
}], action) => {
    // console.log(action)
    switch (action.type) {
        default: return state;
        case "SET_FRIEND_PROFILE": return action.friends;
    }
}

export default friendsProfile;