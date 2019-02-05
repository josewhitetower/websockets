import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setUser } from './store/actions/userActions';

import {
  //connecst,
  message,
  typing,
  subscribe,
  join,
  leave,
  disconnect
} from './api/api';

class App extends Component {
  state = {
    message: '',
    chats: [],
    feedback: '',
    users: []
  };
  // Things to do before unloading/closing the tab
  doSomethingBeforeUnload = () => {
    leave(this.props.user.handle);
  };

  // Setup the `beforeunload` event listener
  setupBeforeUnloadListener = () => {
    window.addEventListener('beforeunload', ev => {
      ev.preventDefault();
      return this.doSomethingBeforeUnload();
    });
  };

  componentDidMount() {
    // Activate the event listener
    this.setupBeforeUnloadListener();
    const { handle } = this.props.match.params;
    this.setState({ handle });

    //connecst();
    join(handle);
    this.props.setUser(handle);
    subscribe(this.onSubscribe);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    leave(this.props.user.handle);
    disconnect();
  }

  scrollToBottom = () => {
    const { chatWindow } = this.refs;
    const scrollHeight = chatWindow.scrollHeight;
    const height = chatWindow.clientHeight;
    const maxScrollTop = scrollHeight - height;
    chatWindow.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  };

  onSubscribe = data => {
    if (data.action === 'chat') {
      const chats = [...this.state.chats];
      chats.push(data);
      this.setState({ chats });
    } else if (data.new || data.old) {
      this.setState({ users: data.users });
    } else if (data) {
      this.setState({ feedback: data });
    } else {
      this.setState({ feedback: '' });
    }
  };

  handleOnChange = e => {
    typing(this.props.user.handle);
    this.setState({ message: e.target.value });
  };

  handleSumbit = e => {
    e.preventDefault();
    if (this.state.message) {
      message(this.state.message, this.props.user.handle);
      this.setState({ message: '' });
    } else {
      alert('empty');
    }
  };

  render() {
    const chats = this.state.chats.map(chat => {
      const className =
        chat.handle !== this.props.user.handle
          ? 'bg-blue-lighter flex flex-col mb-2 p-1 rounded-bl-none rounded-lg w-3/4 shadow'
          : 'bg-grey-lighter flex flex-col float-right mb-2 p-1 rounded-br-none rounded-lg w-3/4 shadow';
      return (
        <div key={Math.random()} className={className}>
          <strong>{chat.handle}</strong>
          <p className="leading-normal mt-1 text-black text-sm">
            {chat.message}
          </p>
          <span className="self-end text-xs text-grey-dark">{chat.date}</span>
        </div>
      );
    });

    return (
      <div
        id="mario-chat"
        className="max-w-md mx-auto shadow font-sans flex flex-col justify-end mt-5"
      >
        <div
          id="feedback"
          className="h-12 bg-blue text-white flex items-center p-1"
        >
          <span className="roman h-10 w-10 rounded-full bg-red inline-flex items-center justify-center uppercase">
            <span>{this.props.user.handle && this.props.user.handle[0]}</span>
          </span>
          <p className="italic ml-4">
            {this.state.feedback.handle
              ? `${this.state.feedback.handle} is writing...`
              : `${this.state.users.length} users online`}
          </p>
        </div>
        <div
          id="chat-window"
          className="p-1 overflow-auto flex-1 bg-green-lightest min-h-screen-7"
          ref="chatWindow"
        >
          <div id="output">{chats}</div>
        </div>
        <form
          action=""
          id="form"
          onSubmit={this.handleSumbit}
          className="bg-green-lightest"
        >
          <div className="flex items-center px-2 pb-2">
            <textarea
              type="text"
              id="message"
              placeholder="Message"
              className="w-5/6 py-2 px-5 border rounded-full mt-2 focus:outline-none mr-2"
              onChange={this.handleOnChange}
              value={this.state.message}
            />
            <button
              id="send"
              className="w-1/6 bg-blue-dark flex-no-shrink font-bold h-10 rounded-sm text-center text-white focus:outline-none"
            >
              ➭
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: handle => dispatch(setUser(handle))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
