import React, { Component } from "react";
import "./index.css";
export default class Item extends Component {
  open = () => {
    const {
      user: { html_url },
    } = this.props;
    window.open(html_url, "_blank");
  };
  render() {
    const { user } = this.props;
    return (
      <div className="item" onClick={this.open}>
        <img src={user.avatar_url} alt="图片" />
        <div>{user.login}</div>
      </div>
    );
  }
}
