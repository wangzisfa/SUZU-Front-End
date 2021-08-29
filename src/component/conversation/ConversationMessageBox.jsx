// import React from "react";
// import Avatar from "antd/es/avatar/avatar";
// import {Card, Popover} from "antd";
// import Paragraph from "antd/es/typography/Paragraph";
// import {connect} from "react-redux";
// import {withRouter} from "react-router-dom";
//
//
// const offset = -3;
//
//
// class ConversationMessageBox extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//
//
//
//     render() {
//         console.log(this.props)
//
//         let key = parseInt(this.props.sidebarMenuKey.key);
//         let friend;
//         const conversationFormVisible = this.props.conversationFormVisible;
//
//         if (conversationFormVisible) {
//             friend = {
//                 username: "陌生人"
//             }
//         } else {
//             friend = this.props.friends[offset + key];
//         }
//         return (
//             <div style={{display: "flex", flexDirection: "column"}}>
//
//                 <div className="user-message" style={{margin: "10px", border: "2px solid gray", height: "600px", overflow: "auto"}}>
//                     {/*<div className="username">*/}
//                     {/*    <p>wangzisfa</p>*/}
//                     {/*</div>*/}
//                     <div className="user-message-content">
//                         {/*<Popover*/}
//                         {/*    content={<text>hello my friend</text>}*/}
//                         {/*    title="wangzisfa"*/}
//                         {/*    trigger="click"*/}
//                         {/*    visible*/}
//                         {/*    placement="rightTop"*/}
//                         {/*>*/}
//                         {/*    <div className="user-message-icon" style={{ width: "30px", margin: "20px 0 80px 20px"}}>*/}
//                         {/*        <Avatar size={30} style={{}}>USER</Avatar>*/}
//                         {/*    </div>*/}
//                         {/*</Popover>*/}
//
//                         <div className="single-message" style={{display: "flex"}}>
//                             <div className="user-message-icon" style={{ width: "30px", margin: "20px 0 80px 20px"}}>
//                                 <Avatar size={30} style={{}}>USER</Avatar>
//                             </div>
//                             <Card title={friend.username} style={{margin: "20px"}}>
//                                 <Paragraph>
//                                     Ant Design, a design language for background applications, is refined by Ant UED Team. Ant
//                                     Design, a design language for background applications, is refined by Ant UED Team. Ant
//                                     Design, a design language for background applications, is refined by Ant UED Team. Ant
//                                     Design, a design language for background applications, is refined by Ant UED Team. Ant
//                                     Design, a design language for background applications, is refined by Ant UED Team. Ant
//                                     Design, a design language for background applications, is refined by Ant UED Team.
//                                 </Paragraph>
//                             </Card>
//                         </div>
//
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
//
// const mapStateToProps = (state) => {
//     // console.log(state)
//     return {
//         user: state.userProfile ,
//         friends: state.friendsProfile ,
//         sidebarMenuKey: state.sidebarMenuKey ,
//         formVisible: state.directlyConversationFormVisible
//     }
// }
// export default connect(mapStateToProps)(ConversationMessageBox)