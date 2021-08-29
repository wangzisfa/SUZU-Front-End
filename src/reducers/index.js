import {combineReducers} from "@reduxjs/toolkit";
import auth from './auth'
import role from "./role";
import userProfile from './userProfile'
import friendsProfile from "./userFriends";
import sidebarMenuKey from './sidebarMenuKey'
import userMessage from './userMessage'
import tokenReceived from "./tokenReceived";
import formVisible from "./formVisible";
import tokenSearch from "./tokenSearch";

export default combineReducers({
    auth ,
    role ,
    userProfile ,
    friendsProfile ,
    sidebarMenuKey ,
    userMessage ,
    tokenReceived ,
    formVisible ,
    tokenSearch
})