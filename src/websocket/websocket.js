import SockJS from 'sockjs-client'
import Stomp from 'stompjs'


export const sock = new SockJS('http://111.229.238.150:8080/ws');
export let stompClient = Stomp.over(sock);



export function stompConnectAndSubscribe(subscribeURL, subscribeCallback) {
    stompClient.connect({}, function (e) {
        console.log(e);
        stompClient.subscribe(subscribeURL, subscribeCallback);
    })
}

export function stompSendMessage(sendToURL, data) {
    stompClient.send(sendToURL, {}, data);
}
