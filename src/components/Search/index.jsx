import React, { Component } from "react";
import PubSub from "pubsub-js";
import "./index.css";
export default class Search extends Component {
  inputRef = null;

  getUsers = async () => {
    const { value } = this.inputRef;
    let str =  value.replace(/\s/g,"")
    if (!str) {
      return alert("输入不合法，请重试！");
    }
    try {
      PubSub.publish("users", { first: false, loading: true, users: [] });
      const response = await fetch("https://api.github.com/search/users?q=" + value);
      const { items = [] } = await response.json();
      console.log("Search组件发布消息了");
      PubSub.publish("users", { loading: false, users: items });
    } catch (error) {
      PubSub.publish("users", { loading: false });
      console.log("请求出错了 ", error);
    }
  };
  render() {
    return (
      <div className="search">
        <h2>Search GitHub Users</h2>
        <div>
          <input type="text" ref={ele => (this.inputRef = ele)} />
          <button onClick={this.getUsers} style={{ marginLeft: "4px" }}>
            search
          </button>
        </div>
      </div>
    );
  }
}
