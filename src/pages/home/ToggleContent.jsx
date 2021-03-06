import UserHomeContent from "../../component/user/UserHomeContent";
import Setting from "../../component/setting/Setting";
import React from "react";
import {connect} from "react-redux";
import FriendHome from "../../component/friends/FriendHome";
import UserConversation from "../../component/conversation/UserConversation";
import {withRouter} from "react-router-dom";
import {bindActionCreators} from "@reduxjs/toolkit";
import * as userMessageActions from "../../actions/userMessage";
import * as formVisibleActions from "../../actions/formVisible";
import * as tokenReceivedActions from "../../actions/isTokenReceived";
import * as tokenSearchActions from "../../actions/tokenSearch";


class ToggleContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.sidebarMenuKey)
        const keyEvent = this.props.sidebarMenuKey;

        let r;
        let key = keyEvent.key;
        if (keyEvent.keyPath.length > 1) {
            if (keyEvent.keyPath[1] === "friends") {
                if (key === "1") {
                    r = <FriendHome />
                } else if (key === "2") {
                    this.props.tokenReceivedActions.setTokenReceived(false);
                    r = <UserConversation conversationFormVisible={true}/>
                } else {
                    // this.props.history.push("/conversation");
                    r = <UserConversation />
                }
            }
        } else {
            if (key === "home") {
                r = <UserHomeContent />
            } else if (key === "setting") {
                r = <Setting />
            }
        }

        return (
            <>
                {r}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        sidebarMenuKey: state.sidebarMenuKey ,
        user: state.userProfile ,
        friends: state.friendsProfile ,
        tokenReceived: state.tokenReceived ,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        tokenReceivedActions: bindActionCreators(tokenReceivedActions, dispatch) ,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ToggleContent))

// export function toggleContent(e) {
//     console.log(e)
//
//     if (e.keyPath.length > 1) {
//         if (e.keyPath[1] === "friends") {
//
//         } else if (e.keyPath[1] === "groups") {
//
//         }
//     } else {
//         return renderRoot(e);
//     }
// }
//
// function renderRoot(e) {
//     let render;
//     if (e.key === "home") {
//         render = <UserHomeContent />
//     } else if (e.key === "setting") {
//         render = <Setting />
//     }
//
//     return render;
// }