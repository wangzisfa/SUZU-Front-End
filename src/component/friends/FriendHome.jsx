import React from "react";
import Search from "antd/es/input/Search";
import {Button, Card, List} from "antd";
import Text from "antd/es/typography/Text";
import {getUserList} from "../../requests/query";
import {baseUrl} from "../../constant/baseUrl";
import {connect} from "react-redux";

class FriendHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [{
                username: "wangzisfa" ,
                gender: "male"
            } ,{
                username: "wangzisfa" ,
                gender: "male"
            } ,{
                username: "wangzisfa" ,
                gender: "male"
            } ,{
                username: "wangzisfa" ,
                gender: "male"
            }] ,
            loading: false ,
            currentUserListIndex: 1 ,
            pageItemNum: 8
        }
    }

    componentDidMount() {
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
        })
            .catch(e => {
                console.log(e);
            });
    }

    enterLoading = () => {
        const currentUser = this.props.user;
        const pageItemNum = this.state.pageItemNum;

        this.setState(() => {
            return {
                loading: true,
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
            })
                .catch(e => {
                    console.log(e);
                })
        });
        setTimeout(() => {
            this.setState({loading: false});
        }, 6000);
    };

    render() {
        const {users, loading} = this.state;

        return (
            <>
                <div style={{width: '100%',
                         display: "flex",
                         flexDirection: "column" ,
                         justifyContent: "center"}}>
                    <div>
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
                            dataSource={users}
                            renderItem={item => (
                                <List.Item>
                                    <Text>{"hello" + " " + item}</Text>
                                </List.Item>
                            )}
                            grid={{ gutter: 16, column: 4 }}
                        />
                    </div>
                    <div className="site-card-wrapper">
                        <List
                            className="list"
                            dataSource={users}
                            renderItem={item => (
                                <List.Item>
                                    <Card title="Card title" bordered={false}>
                                        Card content
                                    </Card>
                                </List.Item>
                            )}
                            grid={{ gutter: 16, column: 4 }}
                        />
                        <Button type="primary" loading={loading} onClick={() => this.enterLoading()}>
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