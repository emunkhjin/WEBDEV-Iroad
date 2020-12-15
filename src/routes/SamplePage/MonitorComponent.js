import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import { Col, Row, Skeleton, List, Avatar, Collapse, Divider } from "antd";

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

export default class Moni extends Component {
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
      .where("cat", "==", props.duureg);
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
        date
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
        date
      });
    });
    this.setState({
      Evdrel
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    this.showSkeleton();
  }

  render() {
    const { Panel } = Collapse;
    return (
      <Skeleton avatar loading={this.state.loading} active>
        <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
          <Collapse bordered={true}>
            <IconWithTextCard
              icon="location"
              iconColor={this.props.iconColor}
              title={this.state.Evdrel.length}
              subTitle={this.props.duureg}
            />
            {/* <EcommerceStatus
                title={this.state.Evdrel.length}
                colorTitle="primary"
                subTitle={this.props.duureg}
                colorSubTitle="grey"
              /> */}

            <Panel header="Мэдээлэл" key="1">
              {this.state.Evdrel.map(board => (
                <span key={board.key}>
                  <Skeleton avatar loading={this.state.loading} active>
                    <List.Item.Meta
                      avatar={<Avatar src={board.photo} />}
                      title={<a href={`/show/${board.key}`}>{board.text}</a>}
                    />
                    <Divider />
                  </Skeleton>
                </span>
              ))}
            </Panel>
          </Collapse>
           
        </Col>
      </Skeleton>
    );
  }
}
//shine ghde balai
