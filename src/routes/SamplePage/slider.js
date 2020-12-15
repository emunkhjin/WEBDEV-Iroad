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
import Moni from "./MonitorComponent";

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
        <Col>
          <Carousel autoplay effect="fade">
            <Moni duureg="Баянзүрх дүүрэг" iconColor="yellow" />
            <Moni duureg="Сүхбаатар дүүрэг" iconColor="blue" />
            <Moni duureg="Чингэлтэй дүүрэг" iconColor="red" />
            <Moni duureg="Баянгол дүүрэг" iconColor="green" />
            <Moni duureg="Хан-Уул дүүрэг" iconColor="yellow" />
            <Moni duureg="Багахангай дүүрэг" iconColor="blue" />
            <Moni duureg="Налайх дүүрэг" iconColor="red" />
            <Moni duureg="Багануур дүүрэг" iconColor="green" />
          </Carousel>
        </Col>
      </div>
    );
  }
}
