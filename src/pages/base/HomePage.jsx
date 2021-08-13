import React from "react";
import {Content, Header} from "antd/es/layout/layout";
import MyHeader from "../../component/header/Header";
import './style.css'
import {Drawer} from "antd";
import ReactRotatingText from "react-rotating-text/lib/ReactRotatingText";
import LoginForm from "../../component/loginform/LoginForm";
import RegisterForm from "../../component/loginform/RegisterForm";
import {connect} from "react-redux";
import axios from "axios";

class HomePage extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.MyHeader = React.createRef();

        this.state = {
            color: "#fff" ,
            sideBarNameLogin: 'sidebar-login' ,
            sideBarNameRegister: 'sidebar-register' ,
            loginSideBarVisible: false ,
            registerSideBarVisible: false
        }
    }

    //当用户已经登陆则直接跳转到用户主界面
    componentDidMount() {
        let auth = localStorage.getItem("authorization");
        if (auth !== null) {
            axios.get("http://localhost:8080/validateUser", {
                headers: {
                    "authorization": auth
                }
            })
                .then(r => {
                    if (r.status === 401) {
                        alert("token 过期了")
                    } else if (r.status === 200) {
                        if (localStorage.getItem("role") === "admin") {
                            this.props.history.push("/admin")
                        } else {
                            this.props.history.push("/home");
                        }
                    }
                })
                .catch(e => {
                    console.log(e)
                })
        }
    }

    getTheme = (data) => {
        data === 'dark' ? this.setState({color: "#001529"}) : this.setState({color: "#fff"});
        console.log(this.state.color)
    }

    getSideBarNameLogin = (data) => {
        this.setState({sideBarNameLogin: data})
        this.setState({loginSideBarVisible: !this.state.loginSideBarVisible});
    }

    getSideBarNameRegister = (data) => {
        this.setState({sideBarNameRegister: data});
        this.setState({registerSideBarVisible: !this.state.registerSideBarVisible});
    }


    render() {
        const style = {
            backgroundColor: this.state.color
            // zIndex: 1
        }
        // console.log(this.props)

        return (
            <div className="homepage">
                <Header style={style}>
                    <MyHeader
                        changeTheme={this.getTheme}
                        changeSideBarNameLogin={this.getSideBarNameLogin}
                        changeSideBarNameRegister={this.getSideBarNameRegister}
                    />
                </Header>
                <Content className="content">
                    {/*<div className={this.state.sideBarNameLogin}>*/}
                    {/*    /!*your form*!/*/}
                    {/*    <div>*/}
                    {/*        this thing sucks*/}
                    {/*    </div>*/}
                    {/*    <Button onClick={() => {*/}
                    {/*        this.setState({sideBarNameLogin: 'sidebar-login'})*/}
                    {/*    }}>*/}
                    {/*        close*/}
                    {/*    </Button>*/}


                    {/*    <LoginForm />*/}
                    {/*</div>*/}
                    <Drawer title="login"
                            placement="right"
                            closable={false}
                            onClose={() => {
                                this.setState({loginSideBarVisible: !this.state.loginSideBarVisible})
                            }}
                            visible={this.state.loginSideBarVisible}
                            width="50%">
                        <LoginForm />
                    </Drawer>
                    <Drawer title="register"
                            placement="right"
                            closable={false}
                            onClose={() => {
                                this.setState({registerSideBarVisible: !this.state.registerSideBarVisible})
                            }}
                            visible={this.state.registerSideBarVisible}
                            width="50%">
                        <RegisterForm />
                    </Drawer>
                    {/*<div className={this.state.sideBarNameRegister}>*/}
                    {/*    <div>*/}
                    {/*        register*/}
                    {/*    </div>*/}
                    {/*    <Button onClick={() => {*/}
                    {/*        this.setState({sideBarNameRegister: 'sidebar-register'})*/}
                    {/*    }}>*/}
                    {/*        close*/}
                    {/*    </Button>*/}


                    {/*    <RegisterForm />*/}
                    {/*</div>*/}
                    <div className="content-full">
                        <div className="content-full-left">
                            <div className="home-content-title">
                                <ReactRotatingText
                                    items={["即时通讯 ? ", "Suzumiya Haruhi"]}
                                    pause='2000'
                                    typingInterval="100"/>
                            </div>

                        </div>
                        <div className="content-full-right">
                            right
                        </div>
                    </div>
                </Content>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authorization: state
    }
}

export default connect(mapStateToProps)(HomePage)