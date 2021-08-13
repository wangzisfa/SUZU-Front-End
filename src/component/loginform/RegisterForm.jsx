import React from "react";
import {Button, Form, Input} from "antd";
import axios from "axios";

export default class RegisterForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '' ,
            password: '' ,
            authorization: ''
        }
    }


    onFinish(event) {
        console.log("register finish event: " + event);
        this.setState(() => {
            return {
                username: event.username ,
                password: event.password
            }
        }, () => {
            axios.post("http://localhost:8080/register", {
                username: this.state.username ,
                password: this.state.password
            })
                .then(r => {
                    console.log("post result: " + r);
                    // this.setState({authorization: r.data.authorization}, () => {
                    //     localStorage.setItem("authorization", this.state.authorization);
                    //     this.props.authActions.setAuth(this.state.authorization);
                    // })
                })
                .catch(e => {
                    console.log(e);
                })
        })
    }

    render() {
        console.log(this.props)
        return (
            <Form onFinish={this.onFinish.bind(this)} >
                <Form.Item rules={[{
                    required: true,
                    message: "请输入用户名"
                }]}
                           label="用户名/昵称"
                           name="username">
                    <Input />
                </Form.Item>
                <Form.Item rules={[{
                    required: true,
                    message: "请输入密码"
                }]}
                           label="密码"
                           name="password">
                    <Input />
                </Form.Item>
                <Form.Item rules={[{
                    required: true,
                    message: "请输入密码"
                }]}
                           label="确认密码"
                           name="confirmPassword">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}