import axios from "axios";

export function postForm(url, data) {
    return axios.post(url, data);
}