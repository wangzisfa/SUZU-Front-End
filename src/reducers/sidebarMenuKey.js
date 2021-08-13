const sidebarMenuKey = (state = {
    key: "home" ,
    keyPath: ["home"]
}, action) => {
    switch (action.type) {
        default: return state;
        case "SET_SIDEBAR_MENU_KEY": return action.key;
    }
}

export default sidebarMenuKey