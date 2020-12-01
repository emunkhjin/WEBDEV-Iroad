import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import { Col, Row, Skeleton, Carousel, Card } from "antd";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

// import IconWithTextCard from "components/Metrics/IconWithTextCard";
// import ChartCard from "components/Metrics/ChartCard";
// import GrowthCard from "components/Metrics/GrowthCard";
// import EcommerceStatus from "components/Metrics/EcommerceStatus";
// import TrafficRaiseCard from "components/Metrics/TrafficRaiseCard";
// // import TotalEncomeCard from "components/Metrics/TotalEncomeCard";
// import QueriesCard from "components/Metrics/QueriesCard";
// import Auxiliary from "util/Auxiliary";

export default class SliderJSS extends Component {
  constructor(props) {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
    }
    super(props);
    this.ref = firebase
      .firestore()
      .collection("Evdrel")
      .orderBy("date", "desc")
      .where("cat", "==", "Чингэлтэй дүүрэг")
      .limit(3);
    this.unsubscribe = null;
    this.state = {
      Evdrel: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const Evdrel = [];
    querySnapshot.forEach(doc => {
      const {
        bairshil,
        email,
        photo,
        text,
        latitude,
        longtitude,
        date,
        cat
      } = doc.data();

      Evdrel.push({
        key: doc.id,
        doc, // DocumentSnapshot
        bairshil,
        email,
        photo,
        text,
        latitude,
        longtitude,
        date,

        cat
      });
    });

    this.setState({
      Evdrel
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    // const script = document.createElement("script");
    // script.src = "/js/light.js";
    // script.async = true;
    // document.body.appendChild(script);
  }

  render() {
    return (
      <div className="ant-col ant-col-24">
        <Col span={12}>
          <Carousel autoplay effect="fade">
            {this.state.Evdrel.map(board => (
              <div className="ant-card ant-card-bordered ant-card-type-inner ">
                <div className="ant-card-head">
                  <div className="ant-card-head-wrapper">
                    <div className="ant-card-head-title">
                      {board.text},{board.cat},
                      {new Date(board.date.seconds * 1000).toLocaleDateString(
                        "en-US"
                      )}{" "}
                      -{" "}
                      {new Date(board.date.seconds * 1000).toLocaleTimeString(
                        "en-US"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}{" "}
          </Carousel>
        </Col>
      </div>
    );
  }
}
