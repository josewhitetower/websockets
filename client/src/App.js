import React, { Component } from "react";
import { connect, message, typing, subscribe } from "./api/api";

class App extends Component {
  state = {
    message: "",
    handle: "",
    chats: [],
    feedback: ""
  };

  componentDidMount() {
    const { handle } = this.props.match.params;
    this.setState({ handle });

    connect();

    subscribe(this.onSubscribe);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const { chatWindow } = this.refs;
    const scrollHeight = chatWindow.scrollHeight;
    const height = chatWindow.clientHeight;
    const maxScrollTop = scrollHeight - height;
    chatWindow.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  onSubscribe = data => {
    if (data.message) {
      const chats = [...this.state.chats];
      chats.push(data);
      this.setState({ chats });
    } else if (data) {
      this.setState({ feedback: data });
    } else {
      this.setState({ feedback: "" });
    }
  };

  handleOnChange = e => {
    typing(this.state.handle);
    this.setState({ message: e.target.value });
  };

  handleSumbit = e => {
    e.preventDefault();
    if (this.state.message) {
      message(this.state.message, this.state.handle);
      this.setState({ message: "" });
    } else {
      alert("empty");
    }
  };

  render() {
    const chats = this.state.chats.map(chat => {
      const className =
        chat.handle !== this.state.handle
          ? "bg-blue-lighter flex flex-col mb-2 p-2 rounded-bl-none rounded-lg w-3/4"
          : "bg-blue-light flex flex-col float-right mb-2 p-2 rounded-br-none rounded-lg w-3/4";
      return (
        <div key={Math.random()} className={className}>
          <strong>{chat.handle}</strong>
          <span className="mt-1">{chat.message}</span>
          <span className="self-end text-xs">{chat.date}</span>
        </div>
      );
    });

    return (
      <div
        id="mario-chat"
        className="max-w-md mx-auto shadow mt-20 font-sans px-3 md:px-0 lg:px-0"
      >
        <div id="feedback" className="h-10">
          {this.state.feedback ? `${this.state.feedback} is writing` : ""}
        </div>
        <form
          action=""
          id="form"
          onSubmit={this.handleSumbit}
          className="bg-grey-lighter"
        >
          <div
            id="chat-window"
            className="h-96 bg-grey-lighter p-2 overflow-auto"
            ref="chatWindow"
          >
            <div id="output">{chats}</div>
          </div>
          <input
            type="text"
            id="message"
            placeholder="Message"
            className="block w-full py-5 px-8 border rounded-full mt-2 focus:outline-none "
            onChange={this.handleOnChange}
            value={this.state.message}
          />
          <button
            id="send"
            className="text-center h-12 text-white w-full bg-blue-dark font-bold rounded-sm"
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default App;
