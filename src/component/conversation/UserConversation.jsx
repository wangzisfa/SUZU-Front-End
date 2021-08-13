import React from "react";
import {Button, Card, Divider, Input, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import {ArrowRightOutlined, SmileOutlined} from "@ant-design/icons";
import {connect} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as userMessageActions from "../../actions/userMessage"
import * as formVisibleActions from "../../actions/formVisible"
import * as tokenReceivedActions from "../../actions/isTokenReceived"
import * as tokenSearchActions from "../../actions/tokenSearch"
import Avatar from "antd/es/avatar/avatar";
import Paragraph from "antd/es/typography/Paragraph";
import Text from "antd/es/typography/Text";
import {getConversationToken} from "../../requests/query";
import {baseUrl} from "../../constant/baseUrl";
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import SockJsClient from 'react-stomp'
import Title from "antd/es/typography/Title";


const offset = -3;
export const sock = new SockJS('http://localhost:8080/ws');
export let stompClient = Stomp.over(function () {
    return sock;
})



class UserConversation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formVisible: true ,
            tokenReceived: false ,
            messageReceived: false ,
            stranger: {
                token: "" ,
                user: {
                    username: "陌生人"
                }
            } ,
            messageBox: [] ,
            endConversationButtonClicked: false ,
            conversationChanged: false ,
            conversationTokenGenerateButtonLoading: false
        }

        console.log("constructor        ")
    }



    handleOk = e => {
        // console.log(e);
        formVisibleActions.setFormVisible(false);
    };

    handleCancel = e => {
        // console.log(e);
        this.props.formVisibleActions.setFormVisible(false);
        // this.setState({formVisible: false})
    };

    ConversationMessageBox() {
        let key = parseInt(this.props.sidebarMenuKey.key);
        let friend = this.props.friends[offset + key];
        const user = this.props.user;
        const conversationFormVisible = this.props.conversationFormVisible;
        const messageReceived = this.state.messageReceived;
        // const username = this.props.message.userSend.username;

        const message = this.props.message;
        // this.setState({currentSidebarMenuKey: this.props.sidebarMenuKey});

        if (this.state.conversationChanged) {
            this.setState(() => {
                return {
                    conversationChanged: false ,
                    messageBox: []
                }
            })
        }

        // if (conversationFormVisible) {
        //     friend = {
        //         user: {
        //             username: "陌生人"
        //         }
        //     }
        //
        // } else {
        //     friend = this.props.friends[offset + key];
        // }

        if (messageReceived) {
            let username;
            if (conversationFormVisible) {
                username = this.props.message.messageSender;
            } else {
                username = this.props.message.userSend.username;
            }
            let messageBox = this.state.messageBox;
            let newArray = [...messageBox];
            console.log(this.props);
            newArray.push(
                <div style={{display: "flex"}}>
                    <div style={{ width: "30px", margin: "20px 0 80px 20px"}}>
                        <Avatar size={30} style={{}}>USER</Avatar>
                    </div>
                    <Card title={username} style={{margin: "20px"}}>
                        <Paragraph>
                            {message.message}
                        </Paragraph>
                    </Card>
                </div>
            )
            this.setState(() => {
                return {
                    messageReceived: false ,
                    messageBox: newArray
                }
            });
        }


        return (
            <div style={{display: "flex", flexDirection: "column"}}>

                <div className="user-message" style={{margin: "10px", border: "2px solid gray", height: "600px", overflow: "auto"}}>
                    {/*<div className="username">*/}
                    {/*    <p>wangzisfa</p>*/}
                    {/*</div>*/}
                    <div className="user-message-content">
                        {/*<Popover*/}
                        {/*    content={<text>hello my friend</text>}*/}
                        {/*    title="wangzisfa"*/}
                        {/*    trigger="click"*/}
                        {/*    visible*/}
                        {/*    placement="rightTop"*/}
                        {/*>*/}
                        {/*    <div className="user-message-icon" style={{ width: "30px", margin: "20px 0 80px 20px"}}>*/}
                        {/*        <Avatar size={30} style={{}}>USER</Avatar>*/}
                        {/*    </div>*/}
                        {/*</Popover>*/}

                        <div style={{display: "flex"}}>
                            <div style={{ width: "30px", margin: "20px 0 80px 20px"}}>
                                <Avatar size={30} style={{}}>USER</Avatar>
                            </div>
                            <Card title={user.username} style={{margin: "20px"}}>
                                <Paragraph>
                                    {user.username + " 已加入聊天"}
                                </Paragraph>
                            </Card>
                        </div>
                        {/*<button onClick={() => {*/}
                        {/*    console.log(this.props);*/}
                        {/*    // console.log(username);*/}
                        {/*}}>*/}

                        {/*</button>*/}
                        {
                            this.state.messageBox
                        }
                    </div>
                </div>
            </div>
        )
    }

    handleSearchToken(e) {
        console.log(e);
        this.props.tokenSearchActions.setTokenSearch(e);
        localStorage.setItem("conversationToken", e);
        this.handleCancel();
    }

    tokenService() {
        const conversationFormVisible = this.props.conversationFormVisible;
        const tokenReceived = this.props.tokenReceived;
        const endConversationButtonClicked = this.state.endConversationButtonClicked;
        console.log("conversationFormVisible: ", conversationFormVisible);
        console.log("tokenReceived: ", tokenReceived);

        if (conversationFormVisible && !tokenReceived) {
            if (endConversationButtonClicked) {
                let res = getConversationToken(baseUrl + "/conversationToken", {username: this.props.user.username})
                res.then(r => {
                    this.props.tokenReceivedActions.setTokenReceived(true);
                    if (localStorage.getItem("conversationToken") !== r.data) {
                        localStorage.setItem("conversationToken", r.data);
                    }

                    this.setState({endConversationButtonClicked: false});
                    console.log(r);
                })
                    .catch(e => {
                        console.log(e);
                    })
            }

        }
    }

    handleGenerateToken() {
        const conversationFormVisible = this.props.conversationFormVisible;
        const tokenReceived = this.props.tokenReceived;
        const endConversationButtonClicked = this.state.endConversationButtonClicked;
        console.log("conversationFormVisible: ", conversationFormVisible);
        console.log("tokenReceived: ", tokenReceived);

        if (conversationFormVisible && !tokenReceived) {
            // if (endConversationButtonClicked) {
            let res = getConversationToken(baseUrl + "/conversationToken", {username: this.props.user.username})
            res.then(r => {
                this.props.tokenReceivedActions.setTokenReceived(true);
                if (localStorage.getItem("conversationToken") !== r.data) {
                    localStorage.setItem("conversationToken", r.data);
                }

                this.setState({endConversationButtonClicked: false});
                console.log(r);
            })
                .catch(e => {
                    console.log(e);
                })
            // }
            this.setState({conversationTokenGenerateButtonLoading: true});
            setTimeout(() => {
                this.setState({conversationTokenGenerateButtonLoading: false})
            }, 1500);
        }
    }

    componentDidMount() {
        console.log("rendering didmount     ")

        // this.tokenService();

        // this.stompConnectAndSubscribe();
        // stompConnectAndSubscribe('/topic/channel/' + friend.token, this.handleReceiveMessage);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        console.log("rendering didupdate      ")
        // this.tokenService();
        // this.stompConnectAndSubscribe();


        if (prevProps.sidebarMenuKey !== this.props.sidebarMenuKey) {
            this.setState({conversationChanged: true});
        }
        // stompClient.connect({}, function (e) {
        //     console.log(e);
        //     stompClient.subscribe('/topic/channel/' + "asdfasdfgashjdgfjkasdf", subscribeCallback)
        // });
        //
        // const subscribeCallback = (e) => {
        //     console.log(e);
        // }
    }

    handleSendMessage() {
        let key = parseInt(this.props.sidebarMenuKey.key);
        let friend = this.props.friends[offset + key];
        const user = this.props.user;
        const conversationFormVisible = this.props.conversationFormVisible;
        const conversationToken = localStorage.getItem("conversationToken");

        // console.log(this.props.message);
        let message = this.props.message.message;
        let jsonMessage = {
            "message": message ,
            "userReceive": friend ,
            "userSend": user
        }
        // console.log(JSON.stringify(jsonMessage));
        // stompSendMessage("/app/channel/" + "asdfasdfgashjdgfjkasdf", message);

        let strangerJsonMessage = {
            message: message ,
            stranger: true ,
            messageSender: user.username
        }
        if (conversationFormVisible) {
            this.clientRef.sendMessage('/app/channel/' + conversationToken, JSON.stringify(strangerJsonMessage));
        } else {
            this.clientRef.sendMessage('/app/channel/' + friend.token, JSON.stringify(jsonMessage));
        }



    }

    handleReceiveMessage(e) {
        this.props.messageActions.setUserMessage(e);
        this.setState({messageReceived: true}, () => {
            console.log(e);
        });
    }

    render() {
        // const offset = -2;
        console.log("render           ")
        let key = parseInt(this.props.sidebarMenuKey.key);
        const friend = this.props.friends[offset + key];
        const user = this.props.user;
        const formVisible = this.props.formVisible;
        //这个是 ToggleContent 中传过来的 点击陌生人聊天即为 true
        const conversationFormVisible = this.props.conversationFormVisible;
        const {stranger} = this.state;
        const conversationToken = localStorage.getItem("conversationToken");

        // console.log(this.state)
        // console.log(friend);
        console.log(this.props)
        return (
            <div style={{display: 'flex', flexDirection: "column", border: "2px solid gray", margin: "10px"}}>
                {/*<SockJsClient url="http://localhost:8080/ws"*/}
                {/*              topics={['/topic/channel/' + friend.token]}*/}
                {/*              onMessage={this.handleReceiveMessage.bind(this)}*/}
                {/*              ref={(client) => {this.clientRef = client}}*/}
                {/*/>*/}
                {conversationFormVisible ?
                    <div>
                        <SockJsClient url="http://localhost:8080/ws"
                                      topics={['/topic/channel/' + conversationToken]}
                                      onMessage={this.handleReceiveMessage.bind(this)}
                                      ref={(client) => {this.clientRef = client}}
                        />
                        <Modal
                            title="直接聊"
                            visible={formVisible}
                            onCancel={this.handleCancel}
                            footer={null}
                        >
                            <Card title={
                                <div style={{display: "flex"}}>
                                    <div>邀请加入</div>
                                    <Button style={{alignSelf: "center", margin: "0 20px 0 20px"}}
                                            onClick={this.handleGenerateToken.bind(this)}
                                            loading={this.state.conversationTokenGenerateButtonLoading}
                                    >生成链接
                                    </Button>
                                </div>
                            }>
                                <Input value={conversationToken} addonAfter={<ArrowRightOutlined onClick={this.handleCancel.bind(this)}/>}/>
                                <Text style={{color: "rgba(0,0,0,0.4)"}}>直接复制当前token即可</Text>
                            </Card>
                            <Divider />
                            <Card title="加入一个">
                                <Input.Search style={{}} defaultValue="" onSearch={this.handleSearchToken.bind(this)}/>
                            </Card>
                        </Modal>
                    </div> :
                    <SockJsClient url="http://localhost:8080/ws"
                                  topics={['/topic/channel/' + friend.token]}
                                  onMessage={this.handleReceiveMessage.bind(this)}
                                  ref={(client) => {this.clientRef = client}}
                    />
                }

                <div className="user-conversation-header" style={{border: "2px solid gray", margin: "10px", display: "flex"}}>
                    <div style={{margin: "20px"}}>
                        <p>{conversationFormVisible ? stranger.user.username : friend.user.username}</p>
                    </div>
                    <Button onClick={() => {
                        // stompSendMessage("/user/messageTo", "hello there")
                        if (conversationFormVisible) {
                            this.props.formVisibleActions.setFormVisible(true);
                            this.props.tokenReceivedActions.setTokenReceived(false);
                            this.setState({endConversationButtonClicked: true});
                        }
                    }} style={{margin: "20px 20px 20px auto"}}>
                        结束会话
                    </Button>
                </div>
                <div className="user-conversation-content">
                    {this.ConversationMessageBox()}
                </div>
                <div className="user-conversation-input"
                     style={{display: 'flex', margin: "10px", justifyContent: "flex-end"}}>
                    <div className="input-selector" style={{margin: "10px", flex: "1"}}>
                        <div className="input-upload" style={{margin: "10px"}}>
                            <div className="input-upload-buttons">
                                <Button icon={<SmileOutlined />} shape="circle" type="primary">
                                </Button>
                            </div>
                        </div>
                        <div className="input-content" style={{margin: "10px"}}>
                            <TextArea placeholder="请输入"
                                      autoSize={{ minRows: 2, maxRows: 8 }}
                                      // style={{width: "1540px"}}
                                      onChange={({target: {value}}) => {
                                          console.log(value)
                                          this.props.messageActions.setUserMessageContent(value);
                                      }}
                                      // onPressEnter={(e) => {
                                      //     console.log(e)
                                      // }}
                            />
                        </div>
                    </div>

                    <div className="submit-button" style={{width: "100px", alignSelf: "center"}}>
                        <Button onClick={this.handleSendMessage.bind(this)}>
                            发送
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        user: state.userProfile ,
        friends: state.friendsProfile ,
        sidebarMenuKey: state.sidebarMenuKey ,
        message: state.userMessage ,
        tokenReceived: state.tokenReceived ,
        formVisible: state.formVisible ,
        tokenSearch: state.tokenSearch ,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        messageActions: bindActionCreators(userMessageActions, dispatch) ,
        formVisibleActions: bindActionCreators(formVisibleActions, dispatch) ,
        tokenReceivedActions: bindActionCreators(tokenReceivedActions, dispatch) ,
        tokenSearchActions: bindActionCreators(tokenSearchActions, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(UserConversation)
