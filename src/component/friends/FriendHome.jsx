import React from "react";
import Search from "antd/es/input/Search";
import {Button, Card, Divider, Form, List} from "antd";
import Text from "antd/es/typography/Text";
import {getUserList, subscribeUser} from "../../requests/query";
import {baseUrl} from "../../constant/baseUrl";
import {connect} from "react-redux";
import './style.css'


class FriendHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [] ,
            searchedUsers: [] ,
            loadMore: false ,
            currentUserListIndex: 1 ,
            pageItemNum: 8 ,
            subscribeLoading: false ,
            buttonArrayLength: 0
        }
    }

    userList() {
        const currentUserListIndex = this.state.currentUserListIndex;
        const pageItemNum = this.state.pageItemNum;
        const currentUser = this.props.user;
        // console.log(this.props)
        let data = {
            listIndex: currentUserListIndex ,
            user: currentUser ,
            num: pageItemNum
        }

        let get = getUserList(baseUrl + "/getUserList", data);
        get.then(r => {
            console.log(r);
            let arr = [...this.state.users];
            r.data.map(user => arr.push(user));


            this.setState(() => {
                return {
                    users: arr ,
                }
            })
        })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidMount() {
        this.userList();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        // this.userList();
    }

    enterLoading = () => {
        const currentUser = this.props.user;
        const pageItemNum = this.state.pageItemNum;

        this.setState(() => {
            return {
                loadMore: true,
                currentUserListIndex: this.state.currentUserListIndex + 1
            }
        }, () => {
            let data = {
                listIndex: this.state.currentUserListIndex,
                user: currentUser ,
                num: pageItemNum
            }
            let get = getUserList(baseUrl + "/getUserList", data);
            get.then(r => {
                console.log(r);
                this.setState({loadMore: false});
                if (r.data.length === 0) {
                    alert("没有更多了");
                }
                let arr = [...this.state.users];
                r.data.map(user => arr.push(user));


                this.setState(() => {
                    return {
                        users: arr ,
                    }
                })
            })
                .catch(e => {
                    console.log(e);
                })
        });
        setTimeout(() => {
            this.setState({loadMore: false});
        }, 6000);
    };

    handleSubscribe(item) {
        console.log(item);


        this.setState(() => {
            return {
                subscribeLoading: true ,
            }
        }, () => {
            let data = {
                "subscribeName": this.props.user.username ,
                "subscribeTo": item.username
            }
            console.log(data);
            let res = subscribeUser(baseUrl + "/subscribeUser", data);
            res.then(r => {
                console.log(r);
                this.setState({subscribeLoading: false});
                alert("订阅成功");
            })
                .catch(e => {
                    console.log(e);
                })
        })

        setTimeout(() => {
            this.setState({subscribeLoading: false});
        }, 3000);
    }

    render() {
        const {users, loadMore, searchedUsers, subscribeLoading} = this.state;

        console.log(this.state);
        return (
            <>
                <div style={{
                    width: '100%',
                    display: "flex",
                    flexDirection: "column" ,
                    height: "100%" ,
                    justifyContent: "flex-start" ,
                    overflow: "auto"
                }}
                >
                    <div style={{height: "50%"}}>
                        <Search placeholder="搜索用户"
                                enterButton
                                onSearch={(e) => {
                                    console.log(e);
                                }}
                                style={{
                                    marginTop: "40px"
                                }}/>
                        <List
                            className="list"
                            dataSource={searchedUsers}
                            renderItem={item => (
                                <List.Item>
                                    <Text>{"hello" + " " + item.username}</Text>
                                </List.Item>
                            )}
                            grid={{ column: 4 }}
                        />
                    </div>
                    <Divider />
                    <div className="site-card-wrapper"
                         style={{height: "50%", width: "99%"}}
                    >
                        <List
                            className="list"
                            dataSource={users}
                            renderItem={item => (
                                <List.Item actions={
                                    [
                                        <div style={{
                                            position: "absolute" ,
                                            bottom: "80px" ,
                                            left: "250px" ,
                                        }}>
                                            <Button
                                                loading={subscribeLoading}
                                                onClick={() => {
                                                    this.handleSubscribe(item);
                                                }}
                                            >
                                                订阅
                                            </Button>
                                        </div>
                                    ]}
                                           // style={{display: "flex"}}
                                >
                                    <Card title={
                                        <div style={{display: "flex"}}>
                                            <div>
                                                {item.username}
                                            </div>
                                        </div>
                                    } bordered={false}>
                                        {item.sign === null ? '这个人没有填简介啊~~~ ' : item.sign}
                                    </Card>
                                </List.Item>
                            )}
                            grid={{ gutter: 16, column: 4 }}
                        />
                        <Button type="primary" loading={loadMore} onClick={() => this.enterLoading()}>
                            加载更多
                        </Button>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.userProfile ,
        friends: state.friendsProfile
    }
}

export default connect(mapStateToProps)(FriendHome)