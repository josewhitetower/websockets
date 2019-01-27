import React, { Component } from "react";
import { connect, message, typing, chat } from "./api/api";

class App extends Component {
  state = {
    message: "",
    handle: "Jose",
    chats: []
  };

  componentDidMount() {
    connect();

    chat(this.onChatCB);
  }

  onChatCB = data => {
    const chats = [...this.state.chats];
    chats.push(data);
    this.setState({ chats });
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
      return (
        <p key={Math.random()} className="p-2">
          {chat.date}: <strong>{chat.handle}:</strong> {chat.message}
        </p>
      );
    });

    return (
      <div
        id="mario-chat"
        className="max-w-md mx-auto shadow mt-20 font-sans px-3 md:px-0 lg:px-0"
      >
        <form action="" id="form" onSubmit={this.handleSumbit} className="">
          <div id="chat-window" className="h-96 bg-grey-lighter">
            <div id="output">{chats}</div>
            <div id="feedback" />
          </div>
          <input
            type="text"
            id="handle"
            placeholder="Name"
            className="block block w-full py-5 px-8 border-t"
            defaultValue={this.state.handle}
          />
          <input
            type="text"
            id="message"
            placeholder="Message"
            className="block w-full py-5 px-8 border-t"
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
