import React, { Component } from "react";
import PubSub from "pubsub-js";
import "./index.css";
import Item from "../Item";
export default class List extends Component {
  state = {
    first: true,
    loading: false,
    users: [{ name: "11" }, { name: "22" }, { name: "33" }],
  };
  componentDidMount() {
    this.token = PubSub.subscribe("users", (msg, data) => {
      console.log("List组件收到订阅消息", data);
      this.setState(data);
    });
  }
  componentWillUnmount() {
    PubSub.unsubscribe(this.token);
  }
  render() {
    const { users, first, loading } = this.state;
    return (
      <div>
        {first ? (
          <div>欢迎使用，请在输入框输入关键字后，点击查询</div>
        ) : loading ? (
          <h2>Loading</h2>
        ) : (
          <div className="list">
            {users.map(user => {
              return <Item key={user.id} user={user} />;
            })}
          </div>
        )}
      </div>
    );
  }
}
