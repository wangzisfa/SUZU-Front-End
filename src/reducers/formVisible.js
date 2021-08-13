const formVisible = (state = true, action) => {

    console.log(action);
    switch (action.type) {
        default: return state;
        case "SET_FORM_VISIBLE": return action.visible;
    }
}
export default formVisible