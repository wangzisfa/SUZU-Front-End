import React from "react";
import {Button, Form, Input, Switch} from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import axios from "axios";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as userRoleActions from "../../actions/userRole";
import {connect} from "react-redux";
import * as authActions from "../../actions/auth";
import {withRouter} from 'react-router-dom'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '' ,
            password: '' ,
            rememberMe: false ,
            userRole: 'user'
        }
    }

    handleChange(e, current) {
        if (current === 'rememberMe') {
            this.setState({rememberMe: e.target.checked});
        } else if (current === 'switch') {
            if (e) {
                this.setState({userRole: 'admin'}, () => {
                    this.props.userRoleActions.setRole("admin")
                });
            } else {
                this.setState({userRole: "user"}, () => {
                    this.props.userRoleActions.setRole("user")
                });
            }
        }
    }

    onFinish = (values: any) => {
        console.log(values)
        console.log(this.state.userRole);
        this.setState(() => {
            return {
                username: values.username ,
                password: values.password
            }
        }, () => {
            this.props.userRoleActions.setRole(this.state.userRole);

            axios.post('http://localhost:8080/login', {
                username: this.state.username ,
                password: this.state.password ,
                role: this.state.userRole
            }, {
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': '*' ,
                    // 'Access-Control-Request-Headers': 'authorization, x-csrf-token, x-request-type' ,
                }
            })
                .then(r => {
                    if (r.status === 200) {
                        console.log(r)
                        // alert("登陆成功")
                        console.log(this.props);

                        localStorage.setItem("authorization", r.data.authorization);
                        localStorage.setItem("role", r.data.message);
                        this.props.authActions.setAuth(r.data.authorization);


                        this.props.role === "user" ?
                            this.props.history.push("/home") :
                            this.props.history.push("/admin") ;
                        // if (this.props.role === "user") {
                        //     history.replace('/home');
                        // } else {
                        //     history.replace('admin');
                        // }
                    } else if (r.status === 403) {

                    }
                })
                .catch(e => {
                    console.log(e);
                    alert("看起来好像网络不太好哦~");
                })
        })
        console.log(this.state)
    }

    redirect(to) {
        this.props.history.replace(to);
    }

    myForm() {
        return (
            <Form className="loginForm" onFinish={this.onFinish}>
                <Form.Item rules={[{
                    required: true ,
                    message: "请输入用户名"
                }]}
                           onChange={e => this.handleChange(e, 'username')}
                           name="username">
                    <Input placeholder="用户名/ID" />
                </Form.Item>
                <Form.Item rules={[{
                    required: true ,
                    message: "请输入密码"
                }]} className="password"
                           onChange={e => this.handleChange(e, 'password')}
                           name="password">
                    <Input.Password placeholder="密码"/>
                </Form.Item>
                <Form.Item className="retrieve">
                    <a href="/retrievePassword">忘记密码?</a>
                </Form.Item>
                <Form.Item >
                    <div className="rememberRole">
                        <Checkbox onChange={e => this.handleChange(e, 'rememberMe')}>
                            记住我
                        </Checkbox>
                        <Switch checkedChildren="管理员" unCheckedChildren="普通用户" onChange={e => this.handleChange(e, 'switch')}/>
                    </div>
                </Form.Item>
                <Form.Item className="login-button">
                    <Button htmlType="submit">登录</Button>
                </Form.Item>
            </Form>
        )
    }

    render() {
        return (
            this.myForm()
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        role: state.role ,
        authorization: state.authorization
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        userRoleActions: bindActionCreators(userRoleActions, dispatch) ,
        authActions: bindActionCreators(authActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm))