import axios from "axios";

export function postForm(url, data) {
    return axios.post(url, data);
}

export function updateUserProfile(url, data, auth) {
    return axios.post(url, data, {
        headers: {
            "auth": auth
        }
    });
}