import React from "react";
import UserHomeContent from "../../component/user/UserHomeContent";
import UserConversation from "../../component/conversation/UserConversation";

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        const key = this.props.number;
        console.log(this.props)
        let renderComponent;

        if (key.key === "home") {
            renderComponent = <UserHomeContent />
        } else if (key.key === "3") {
            renderComponent = <UserConversation />
        }


        return (
            <>
                {
                    renderComponent
                }
            </>
        );
    }
}