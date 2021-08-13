import UserHomeContent from "../../component/user/UserHomeContent";
import Setting from "../../component/setting/Setting";
import React from "react";
import {connect} from "react-redux";
import FriendHome from "../../component/friends/FriendHome";
import UserConversation from "../../component/conversation/UserConversation";
import {withRouter} from "react-router-dom";


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
    }
}
export default connect(mapStateToProps)(withRouter(ToggleContent))

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