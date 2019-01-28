import React, { Component } from "react";

export default class UserNamePicker extends Component {
  myInput = React.createRef();

  gotToChat = event => {
    event.preventDefault();
    const username = this.myInput.current.value;
    this.props.history.push(`/chat/${username}`);
  };

  render() {
    return (
      <div className="container mx-auto text-center mt-20 px-3 md:px-0 lg:px-0">
        <form onSubmit={this.gotToChat} className="">
          <h2>Please Enter a username</h2>
          <input
            className="block border focus:outline-none mt-4 mx-auto px-5 py-3 rounded-full focus:w-2/3"
            type="text"
            required
            placeholder="Your username"
            ref={this.myInput}
          />
          <button
            className="w-full h-12 text-white w-full bg-blue-dark hover:bg-blue-darker font-bold rounded-sm mt-4"
            type="submit"
          >
            Visit chat ➞{" "}
          </button>
        </form>
      </div>
    );
  }
}
