import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { MDBBtn } from "mdbreact";
import { withFirebase } from "../Firebase";
import MessageList from "./MessageList";
import "./index.css";

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      isEmpty: true,
      loading: false,
    };
  }

  componentDidMount() {
    if (!this.props.messages.length) {
      this.setState({ loading: true });
    }
    this.onListenForMessages();
  }

  componentDidUpdate(props) {
    if (props.limit !== this.props.limit || props.room !== this.props.room) {
      this.onListenForMessages();
    }
  }

  onListenForMessages = () => {
    this.props.firebase
      .messages(this.props.room)
      .orderByChild("createdAt")
      .limitToLast(this.props.limit)
      .on("value", (snapshot) => {
        this.props.onSetMessages(snapshot.val());

        this.setState({ loading: false });
      });
  };

  componentWillUnmount() {
    this.props.firebase.messages(this.props.room).off();
  }

  onChangeText = (event) => {
    this.setState({ text: event.target.value });
    if (event.target.value.trim().length) {
      this.setState({ isEmpty: false });
    }
    else {
      this.setState({ isEmpty: true });
    }
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages(this.props.room).push({
      text: this.state.text,
      userId: authUser.uid,
      username: authUser.username,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: "" , isEmpty: true});

    event.preventDefault();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(this.props.room, message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveMessage = (uid) => {
    this.props.firebase.message(this.props.room, uid).remove();
  };

  onNextPage = () => {
    this.props.onSetMessagesLimit(this.props.limit + 5);
  };

  // onEnterPress = (e) => {
  //   if (e.keyCode === 13 && e.shiftKey === false) {
  //     e.preventDefault();
  //     this.onCreateMessage(e, this.props.authUser)
  //   }
  // };

  render() {
    const { messages } = this.props;
    const { text, loading } = this.state;
    return (
      <div className="">
        <div className="scrollable">
          {loading && <div>Loading ...</div>}
          {messages && (
            <MessageList
              authUser={this.props.authUser}
              messages={messages}
              onEditMessage={this.onEditMessage}
              onRemoveMessage={this.onRemoveMessage}
            />
          )}
        </div>
        {!messages && <div>There are no messages ...</div>}
        <div className="compose">
          <textarea
            type="text"
            value={text}
            onChange={this.onChangeText}
            // onKeyDown={this.onEnterPress}
            className="form-control pl-2 my-0 compose-input"
            rows="1"
            placeholder="Type your message here..."
          />
          <MDBBtn
            onClick={(event) =>
              this.onCreateMessage(event, this.props.authUser)
            }
            color="info"
            disabled={this.state.isEmpty}
            rounded
            size="sm"
            className="buttonSend"
          >
            Send
          </MDBBtn>
          {!loading && messages && (
            <MDBBtn className="float-right" size="sm" onClick={this.onNextPage}>
              More
            </MDBBtn>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
  messages: Object.keys(state.messageState.messages || {}).map((key) => ({
    ...state.messageState.messages[key],
    uid: key,
  })),
  limit: state.messageState.limit,
});

const mapDispatchToProps = (dispatch) => ({
  onSetMessages: (messages) => dispatch({ type: "MESSAGES_SET", messages }),
  onSetMessagesLimit: (limit) =>
    dispatch({ type: "MESSAGES_LIMIT_SET", limit }),
});

export default compose(
  withFirebase,
  connect(mapStateToProps, mapDispatchToProps)
)(Messages);
