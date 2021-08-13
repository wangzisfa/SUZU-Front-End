export function setRole(role) {
    console.log(role)
    return {
        type: 'SET_ROLE' ,
        role
    }
}
