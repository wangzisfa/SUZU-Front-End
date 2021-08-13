export function setFormVisible(visible) {
    console.log(visible)
    return {
        type: 'SET_FORM_VISIBLE',
        visible
    }
}