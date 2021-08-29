import React from "react";
import {Button, Menu, Switch} from "antd";
import {Link} from "react-router-dom";
import Layout, {Content, Footer, Header} from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import {
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
    SettingOutlined, CloseCircleOutlined,
} from '@ant-design/icons';
import Avatar from "antd/es/avatar/avatar";
import userAvatar from '../../static/icons/user-avatar.jpg'
import Title from "antd/es/typography/Title";
import './style.css'
import Search from "antd/es/input/Search";
import {getWithToken} from "../../requests/query";
import {baseUrl} from "../../constant/baseUrl";
import {connect} from "react-redux";
import * as userProfileActions from "../../actions/userProfile";
import * as friendsProfileActions from "../../actions/friendsProfile"
import * as sidebarMenuKeyActions from "../../actions/sidebarMenuKey"
import {bindActionCreators} from "@reduxjs/toolkit";
import ToggleContent from "./ToggleContent";


const { SubMenu } = Menu;


class UserHomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: false ,
            showUsername: true ,
            theme: "dark" ,
            usernameColor: "white"
        }

        // let userProfile = getWithToken(baseUrl + "/profile", localStorage.getItem("authorization"));
        // userProfile.then(res => {
        //     this.props.userProfileActions.setUserProfile(res.data);
        // })
        //     .catch(e => {
        //         console.log(e)
        //     })
        // let userFriends = getWithToken(baseUrl + '/friends', localStorage.getItem("authorization"));
        // userFriends.then(res => {
        //     console.log(res);
        //     this.props.friendsProfileActions.setFriendsProfile(res.data);
        // })
        //     .catch(e => {
        //         console.log(e);
        //     })
    }



    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState(() => {
            return {
                collapsed: collapsed ,
                showUsername: !this.state.showUsername
            }
        });
    };

    // showUsername = () => {
    //     return (
    //         <Title style={{fontSize: "24px", marginLeft: "5px", color: "white"}} >wangzisfa</Title>
    //     )
    // }

    handleChangeTheme(e) {
        e ? this.setState(() => {
            return {
                theme: "light" ,
                usernameColor: "black"
            }
        }) : this.setState(() => {
            return {
                theme: "dark" ,
                usernameColor: "white"
            }
        });
    }

    handleClickMenu(e) {
        this.props.sidebarMenuKeyActions.setKey(e);
        console.log(e)
    }

    menuItemFriends(keyPath) {
        const items = [];
        // let sidebarMenuKey = this.props.sidebarMenuKey;
        let key = 2;
        // console.log(sidebarMenuKey)
        // console.log(key)

        console.log(this.props)
        const friends = this.props.friends;

        friends.map((friend) => {
            key++;


            items.push(
                <Menu.Item key={key} onClick={(e) => {
                    console.log(e)
                }}>

                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                        {friend.user.username}
                        <div style={{marginLeft: "auto"}}>
                            <Button
                                onClick={() => {
                                    console.log("click")
                                }}
                                shape="circle"
                                icon={<CloseCircleOutlined />}
                                size="small"
                                type="primary"
                            />
                        </div>
                    </div>
                </Menu.Item>
            );
            // console.log(friend)
        })

        // let out = {
        //     key: key ,
        //     keyPath: keyPath
        // }

        // console.log(out)
        // this.props.sidebarMenuKeyActions.setKey(out);

        return items
    }

    menuItemGroups(groups) {

    }

    doRequest() {
        let userProfile = getWithToken(baseUrl + "/profile", localStorage.getItem("authorization"));
        userProfile.then(res => {
            this.props.userProfileActions.setUserProfile(res.data);
        })
            .catch(e => {
                console.log(e)
            })
        let userFriends = getWithToken(baseUrl + '/friends', localStorage.getItem("authorization"));
        userFriends.then(res => {
            console.log(res);
            this.props.friendsProfileActions.setFriendsProfile(res.data);
        })
            .catch(e => {
                console.log(e);
            })
    }

    componentDidMount() {
        this.doRequest();
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {

    }

    render() {
        const { collapsed, showUsername, theme, selectedKey, sidebarMenuKey } = this.state;
        const username = this.props.user.username;

        // const friends = this.props.friends;
        const groups = this.props.groups;

        // console.log(this.props)




        return (
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible
                           collapsed={collapsed}
                           onCollapse={this.onCollapse}
                           theme={theme}
                    >
                        <div className="user-icon" >
                            <Avatar size={60} src={userAvatar}/>
                        </div>
                        {
                            showUsername ?
                                <Title style={{
                                    fontSize: "24px",
                                    marginLeft: "5px",
                                    color: this.state.usernameColor,
                                    display: "flex",
                                    justifyContent: "center"
                                }} >
                                    {username}
                                </Title> :
                                null
                        }
                        <Menu theme={theme}
                              defaultSelectedKeys={['home']}
                              mode="inline"
                              // multiple="false"
                              onClick={this.handleClickMenu.bind(this)}
                        >
                            <Menu.Item key="home" icon={<PieChartOutlined />}>
                                我的
                            </Menu.Item>
                            <SubMenu key="friends"
                                     icon={<UserOutlined />}
                                     title="会话"
                                     // multiple="false"
                                     >
                                <Menu.Item key="1" >
                                    添加好友
                                </Menu.Item>
                                <Menu.Item key="2" >
                                    直接聊
                                </Menu.Item>
                                {this.menuItemFriends("friends")}
                            </SubMenu>
                            <SubMenu key="groups" icon={<TeamOutlined />} title="群组">
                                {/*{this.menuItemGroups(groups, "groups")}*/}
                            </SubMenu>
                            <Menu.Item key="setting" icon={<SettingOutlined />}>
                                设置
                            </Menu.Item>
                        </Menu>
                        <div style={{color: "white",
                            margin: "550px 0 0 0" ,
                            display: "flex" ,
                            justifyContent: "center" ,
                        }}>
                            {
                                showUsername ?
                                    <>
                                        <div style={{color: this.state.usernameColor, margin: "0 20px 0 0"}}>
                                            主题
                                        </div>
                                        <Switch onChange={this.handleChangeTheme.bind(this)}
                                                unCheckedChildren="邪恶"
                                                checkedChildren="守序"/>
                                    </> :
                                    <>
                                        <Switch onChange={this.handleChangeTheme.bind(this)}/>
                                    </>
                            }


                        </div>
                    </Sider>
                    <Layout className="site-layout">
                        <Header className="site-layout-background"
                                style={{ padding: 0, display: 'flex'}}>
                            <div className="search"
                                 style={{
                                     display: "flex" ,
                                     alignItems: "center" ,
                                     justifyContent: "flex-end" ,
                                     width: "50%" ,
                                     height: "100%"
                                 }}>
                                <Search placeholder="全局搜索"
                                        enterButton
                                        onSearch={() => {

                                        }}
                                        style={{
                                            marginLeft: "20px"
                                        }}/>
                            </div>
                            <div className="buttons"
                                 style={{
                                     display: "flex" ,
                                     alignItems: "center" ,
                                     justifyContent: "flex-end" ,
                                     width: "50%" ,
                                     height: "100%" ,
                                }}>
                                <Button onClick={() => {
                                    localStorage.removeItem("authorization");
                                    localStorage.removeItem("role");
                                    localStorage.removeItem("conversationToken");
                                }}
                                        type="primary"
                                        style={{
                                            marginRight: "20px"
                                        }}>
                                    <Link to="/">登出</Link>
                                </Button>
                            </div>

                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                            {/*    <Breadcrumb.Item>User</Breadcrumb.Item>*/}
                            {/*    <Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                            {/*</Breadcrumb>*/}
                            {/*<div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>*/}
                            {/*    Bill is a cat.*/}
                            {/*</div>*/}


                            {/*{*/}
                            {/*    <ListItem number={selectedKey} />*/}
                            {/*}*/}
                            <ToggleContent />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>wangzisfa ©2021 Created by wangzisfa Based on AntDesign</Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.userProfile ,
        friends: state.friendsProfile ,
        sidebarMenuKey: state.sidebarMenuKey
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userProfileActions: bindActionCreators(userProfileActions, dispatch) ,
        friendsProfileActions: bindActionCreators(friendsProfileActions, dispatch) ,
        sidebarMenuKeyActions: bindActionCreators(sidebarMenuKeyActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomePage)
