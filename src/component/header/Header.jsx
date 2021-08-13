import {Button, Menu, Switch} from 'antd';
import 'antd/dist/antd.css'
import './style.css'
import React from "react";

export default class MyHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "light" ,
            color: "black" ,
            buttonColor: "white" ,
            buttonFontColor: "black" ,
            registerButtonBorderColor: "rgb(217, 217, 217)" ,
            loginButtonBorderColor: "rgb(217, 217, 217)" ,
            hover: false
        }
    }

    changeTheme = (value) => {
        console.log(value)
        // this.props.changeTheme(this.state.theme);
        this.setState({theme: value ? "dark" : "light"}, () => {
            this.props.changeTheme(this.state.theme);
            this.setState({backgroundColor: value ? "white" : "black"});
            //button color
            let theme = this.state.theme;
            if (theme === "dark") {
                this.setState(() => {
                    return {
                        buttonColor: "#1890ff" ,
                        buttonFontColor: "white" ,
                        registerButtonBorderColor: "transparent" ,
                        loginButtonBorderColor: "transparent"
                    }
                })
            } else if (theme === "light") {
                this.setState(() => {
                    return {
                        buttonColor: "white" ,
                        buttonFontColor: "black" ,
                        registerButtonBorderColor: "rgb(217, 217, 217)" ,
                        loginButtonBorderColor: "rgb(217, 217, 217)"
                    }
                })
            }
        });

        console.log(this.state.theme)
    }



    menu = () => {
        return (
            <Menu mode="horizontal" theme={this.state.theme} className="menu">
                <Menu.Item className="item">
                    主页
                </Menu.Item>
                <Menu.Item className="item">
                    关于我
                </Menu.Item>
                <Menu.Item className="item">
                    技术栈
                </Menu.Item>
            </Menu>
        )
    }

    title = () => {
        const style = {
            color: this.state.backgroundColor
        }
        return (
            <div className="title" style={style} >
                SUZU
            </div>
        )
    }

    toggleHover = (e) => {
        let content = e.target.title;
        this.setState({hover: !this.state.hover}, () => {
            // console.log("current hover state: " + this.state.hover)
            let hover = this.state.hover;
            let theme = this.state.theme;
            if (hover && theme === "light") {
                // console.log("toggle border")
                if (content === "login") {
                    this.setState({loginButtonBorderColor: "#1890ff"})
                } else {
                    this.setState({registerButtonBorderColor: "#1890ff"})
                }
            } else if (!hover && theme === "light") {
                if (content === "login") {
                    this.setState({loginButtonBorderColor: "rgb(217, 217, 217)"})
                } else {
                    this.setState({registerButtonBorderColor: "rgb(217, 217, 217)"})
                }
            }
        })
    }

    changeSideBarNameLogin = () => {
        console.log(this.props)
        this.props.changeSideBarNameLogin("sidebar-login-show")
    }

    buttons = () => {
        const loginStyle = {
            backgroundColor: this.state.buttonColor ,
            color: this.state.buttonFontColor ,
            borderColor: this.state.loginButtonBorderColor
        }

        const registerStyle = {
            backgroundColor: this.state.buttonColor ,
            color: this.state.buttonFontColor ,
            borderColor: this.state.registerButtonBorderColor
        }
        return(
            <div className="buttons">
                <Switch className="theme-switch"
                        checkedChildren="邪恶"
                        unCheckedChildren="守序"
                        onChange={this.changeTheme.bind(this)} />
                <Button className="login-btn btn"
                        title="login"
                        style={loginStyle}
                        onMouseEnter={e => {this.toggleHover(e)}}
                        onMouseLeave={this.toggleHover}
                        onClick={this.changeSideBarNameLogin.bind(this)}>
                    登录
                </Button>
                <Button className="register-btn btn"
                        title="register"
                        style={registerStyle}
                        onMouseEnter={e => {this.toggleHover(e)}}
                        onMouseLeave={this.toggleHover}
                        onClick={() => {
                            this.props.changeSideBarNameRegister("sidebar-register-show")
                        }}>
                    注册
                </Button>
            </div>
        )
    }

    render() {
        return (
            <div className="header">
                {this.title()}
                {this.menu()}
                {this.buttons()}
            </div>
        )
    }
}