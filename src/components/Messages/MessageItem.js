import React, { Component } from "react";
import { MDBBtn, MDBListGroupItem } from "mdbreact";
class MessageItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.message.text,
      isEmpty: false,
    };
  }

  onToggleEditMode = () => {
    this.setState((state) => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
      isEmpty: false,
    }));
  };

  onChangeEditText = (event) => {
    this.setState({ editText: event.target.value });
    if (event.target.value.trim().length) {
      this.setState({ isEmpty: false });
    } else {
      this.setState({ isEmpty: true });
    }
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);

    this.setState({ editMode: false, isEmpty: false });
  };

  timeConverter(timestamp) {
    var a = new Date(timestamp);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = "0" + a.getHours();
    var min = "0" + a.getMinutes();
    var sec = "0" + a.getSeconds();
    var time =
      date +
      " " +
      month +
      " " +
      year +
      " " +
      hour.substr(-2) +
      ":" +
      min.substr(-2) +
      ":" +
      sec.substr(-2);
    return time;
  }

  render() {
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;
    const time = this.timeConverter(message.createdAt);
    return (
      <MDBListGroupItem className="message">
        {editMode ? (
          <textarea
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
            className="form-control mb-2 compose-input"
            rows="1"
            placeholder="Type your message here..."
          />
        ) : (
          <div>
            <div className="d-flex w-100 justify-content-between">
              <strong>{message.username}</strong>
              <small>{time}</small>
            </div>
            <p className="mb-1 msgText">
              {message.text} {message.editedAt && <span>(Edited)</span>}
            </p>
          </div>
        )}

        {authUser.uid === message.userId && (
          <span>
            {editMode ? (
              <span>
                <MDBBtn
                  disabled={this.state.isEmpty}
                  size="sm"
                  onClick={this.onSaveEditText}
                >
                  Save
                </MDBBtn>
                <MDBBtn size="sm" onClick={this.onToggleEditMode}>
                  Reset
                </MDBBtn>
              </span>
            ) : (
              <MDBBtn size="sm" onClick={this.onToggleEditMode}>
                Edit
              </MDBBtn>
            )}

            {!editMode && (
              <MDBBtn size="sm" onClick={() => onRemoveMessage(message.uid)}>
                Delete
              </MDBBtn>
            )}
          </span>
        )}
      </MDBListGroupItem>
    );
  }
}

export default MessageItem;
