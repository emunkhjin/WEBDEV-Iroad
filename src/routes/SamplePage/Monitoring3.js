import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import { Col, Row, Skeleton } from "antd";
import {
  Area,
  AreaChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip
} from "recharts";

import IconWithTextCard from "components/Metrics/IconWithTextCard";
import ChartCard from "components/Metrics/ChartCard";
import GrowthCard from "components/Metrics/GrowthCard";
import EcommerceStatus from "components/Metrics/EcommerceStatus";
import TrafficRaiseCard from "components/Metrics/TrafficRaiseCard";
// import TotalEncomeCard from "components/Metrics/TotalEncomeCard";
import QueriesCard from "components/Metrics/QueriesCard";
import Auxiliary from "util/Auxiliary";

export default class Monitoring1 extends Component {
  state = {
    loading: false
  };

  showSkeleton = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);
  };
  constructor(props) {
    super(props);
    this.ref = firebase
      .firestore()
      .collection("Evdrel")
      .where("complete", "==", true);
    this.unsubscribe = null;
    this.state = {
      Users: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const Users = [];
    querySnapshot.forEach(doc => {
      const {
        bairshil,
        email,
        photo,
        text,
        latitude,
        longtitude,
        date
      } = doc.data();
      Users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        bairshil,
        email,
        photo,
        text,
        latitude,
        longtitude,
        date
      });
    });
    this.setState({
      Users
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.showSkeleton();
  }

  render() {
    return (
      <Col span={12} className="gx-col-full">
        {" "}
        <Skeleton avatar loading={this.state.loading} active>
          <IconWithTextCard
            icon="list-select-o"
            iconColor="green"
            title={this.state.Users.length}
            subTitle="Нийт шийдэгдсэн мэдээлэл"
          />
        </Skeleton>
      </Col>
    );
  }
}
