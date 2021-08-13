import React from "react";
import Avatar from "antd/es/avatar/avatar";
import {Button, Card, Col, Row, Collapse, List, Statistic, Table} from "antd";
import {
    CaretRightOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as userProfileActions from "../../actions/userProfile";
import {connect} from "react-redux";
import {userIconBaseURL} from '../../constant/baseUrl'


const { Column } = Table;
const { Panel } = Collapse;

class UserHomeContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentConversation: [{
                title: "wangzisfa"
            }, {
                title: "bottas"
            }, {
                title: "hamilton"
            }, {
                title: "guardian"
            }, {
                title: "suzumiya"
            }]
        }
    }

    card() {
        const user = this.props.user;
        const gridStyle = {
            width: '25%',
            textAlign: 'center',
        };
        return (
            <div className="card"
                 style={{display: 'flex',
                     width: '100%',
                     flexDirection: "column",
                     boxShadow: "0px 1px 3px 0px rgba(0, 0, 255, .2)",
                     borderRadius: "10px",
                     marginTop: "10px"}}>
                <div className="user-cover" style={{backgroundColor: "grey", height: "150px"}}>
                    改变背景颜色
                </div>
                <div className="user-wrapper"
                     style={{
                         display: "flex",
                         // height: "150px",
                         backgroundColor: "white",
                         // justifyContent: "flex-start" ,
                         // overflow: "auto"
                     }}>
                    <Avatar size={100} style={{top: "-50px", margin: "20px"}} src={userIconBaseURL + user.userIconURL}>USER</Avatar>
                    <div className="user-content"
                         style={{marginLeft: "20px"}}>
                        <div style={{fontSize: "24px"}}>
                            {user.username}
                        </div>
                        <div style={{fontSize: "16px"}}>
                            {user.sign}
                        </div>
                        <Collapse
                            bordered={false}
                            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            className="user-profile-collapse"
                            style={{marginBottom: "20px"}}
                        >
                            <Panel header="查看详细资料" key="1" className="user-profile-collapse-panel">
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Statistic title="性别" value="男" />
                                    </Col>
                                </Row>

                            </Panel>
                        </Collapse>

                    </div>
                    {/*marginLeft: "1275px", marginTop: "100px"*/}
                    <div style={{margin: "0 20px 20px auto", alignSelf: "flex-end"}}>
                        <Button>
                            编辑个人资料
                        </Button>
                    </div>


                </div>
            </div>
        )
    }

    profileMain() {
        const data = this.props.friends;

        return (
            <div className="profile-main"
                 style={{display: 'flex',
                     width: '100%',
                     flexDirection: "row",
                     boxShadow: "0px 1px 3px 0px rgba(0, 0, 255, .2)",
                     borderRadius: "2px",
                     marginTop: "10px",
                     justifyContent: "center", }}>
                <div className="current-conversation"
                     style={{
                         border: "2px solid rgba(255, 255, 255, 0.6)",
                         width: "49%" ,
                         margin: "10px 4px 10px 0",
                         display: "flex" ,
                         flexDirection: "column" ,
                         alignContent: "center" ,
                     }}>
                    <div style={{fontSize: "18px",
                        alignSelf: "center",
                        borderBottom: "2px solid rgba(0, 0, 0, 0.3)"}}>
                        <p>近期会话</p>
                    </div>
                    <div style={{
                        margin: "10px 20px 10px 20px",
                    }}>
                        <List
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={item => (
                                <List.Item style={{border: "1px solid rgba(0, 0, 0, 0.3)", margin: "3px"}}>
                                    <List.Item.Meta
                                        avatar={<Avatar style={{margin: "10px"}}>USER</Avatar>}
                                        title={<a href="/wwww">{item.user.username}</a>}
                                        description={item.user.sign}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
                <div className="profile-right"
                     style={{
                         width: '49%' ,
                         margin: "10px 0 10px 4px" ,
                         border: "2px solid rgba(255, 255, 255, 0.6)"
                     }}>
                    <div className="count-conversation">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Card hoverable>
                                    <Statistic
                                        title="好友"
                                        value={data.length}
                                        valueStyle={{ color: '#1890ff' }}
                                        prefix={<UserOutlined />}
                                    />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card hoverable>
                                    <Statistic
                                        title="群组"
                                        value={9}
                                        valueStyle={{ color: '#cf1322' }}
                                        prefix={<TeamOutlined />}
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>
                    <div className="group-conversation"
                         style={{
                             margin: "10px 20px 10px 20px"
                         }}>
                        <div style={{fontSize: "18px" ,
                            alignSelf: "center",
                            borderBottom: "2px solid rgba(0, 0, 0, 0.3)"}}>
                            加入的群组
                        </div>
                        <div>
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item style={{border: "1px solid rgba(0, 0, 0, 0.3)", margin: "3px"}}>

                                        <List.Item.Meta
                                            avatar={<Avatar >GROUP</Avatar>}
                                            title={<a href="/wwww">{item.title}</a>}
                                            description="check out"
                                        />
                                        {/*<List.Item.Meta*/}
                                        {/*    avatar={<Avatar >GROUP</Avatar>}*/}
                                        {/*    title={<a href="/wwww">{item.title}</a>}*/}
                                        {/*    description="check out"*/}
                                        {/*/>*/}
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </div>


            </div>
        )
    }

    render() {

        return (
            <>
                <div className="profile-header"
                     style={{width: '100%',
                         display: "flex",
                         flexDirection: "column" ,
                         justifyContent: "center"}}>
                    {this.card()}
                    {this.profileMain()}
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        user: state.userProfile ,
        friends: state.friendsProfile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userProfileActions: bindActionCreators(userProfileActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHomeContent)