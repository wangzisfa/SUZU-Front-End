import axios from "axios";


// return : false 没过期
//          true 过期了
export function isTokenExpired(token) {
    if (token !== null) {
        axios.get("http://111.229.238.150:8080/validateUser", {
            headers: {
                "authorization": token
            }
        })
            .then(r => {
                if (r.status === 200) {
                    return false;
                } else {
                    console.log("通过url请求时携带token错误 \n" + r);
                    return true;
                }
            })
            .catch(e => {
                console.log(e);
            })
    } else {
        return  true;
    }
}

export function getWithToken(url, currentUserAuthToken) {
    // console.log(dataHandler)
    return axios.get(url, {
        headers: {
            auth: currentUserAuthToken
        }
    })
}

export function getUserList(url, data) {
    // console.log(dataHandler)
    return axios.get(url, {
        params: {
            "listIndex": data.listIndex ,
            "currentUsername": data.user.username ,
            "num": data.num
        }
    })
}

export function getConversationToken(url, data) {
    return axios.get(url, {
        params: {
            "username": data.username
        }
    })
}

export function subscribeUser(url, data) {
    return axios.get(url, {
        params: {
            "subscribeName": data.subscribeName ,
            "subscribeTo": data.subscribeTo
        }
    })
}

export function searchUser(url, data) {
    return axios.get(url, {
        params: {
            username: data
        }
    })
}