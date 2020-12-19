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
import { Moni2 } from "./MonitorComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardBox from "components/CardBox/index";

import IconWithTextCard from "components/Metrics/IconWithTextCard";
import ChartCard from "components/Metrics/ChartCard";
import GrowthCard from "components/Metrics/GrowthCard";
import EcommerceStatus from "components/Metrics/EcommerceStatus";
import TrafficRaiseCard from "components/Metrics/TrafficRaiseCard";
// import TotalEncomeCard from "components/Metrics/TotalEncomeCard";
import QueriesCard from "components/Metrics/QueriesCard";
import Auxiliary from "util/Auxiliary";

export default class TodayNews extends Component {
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
      .orderBy("date", "desc")
      .where("cat", "==", "Чингэлтэй дүүрэг");
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
    const options = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,

      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <Slider {...options}>
        <Moni2
          duuregZurag="https://i.ibb.co/J7VyPqm/download.png"
          duureg="Баянзүрх дүүрэг"
          iconColor="yellow"
        />

        <Moni2
          duuregZurag="https://mgl.gogo.mn/newsn/thumbnail/1000/images/c/2015/09/169809-12092015-1442039010-796208597-suhbaatar.jpg"
          duureg="Сүхбаатар дүүрэг"
          iconColor="blue"
        />

        <Moni2
          duuregZurag="https://www.chingeltei.gov.mn/wp-content/uploads/c833e363e908f31d298a5b3c14cffd9c.jpg"
          duureg="Чингэлтэй дүүрэг"
          iconColor="red"
        />

        <Moni2
          duuregZurag="https://bgd.mn/img/logo.png"
          duureg="Баянгол дүүрэг"
          iconColor="green"
        />

        <Moni2
          duuregZurag="http://www.khanuul.mn/images/intro-logo.png"
          duureg="Хан-Уул дүүрэг"
          iconColor="yellow"
        />

        <Moni2
          duuregZurag="http://bagakhangai.ub.khural.mn/medias/9ad15045-7604-49c8-b5ee-ee6444cbde29.png"
          duureg="Багахангай дүүрэг"
          iconColor="blue"
        />

        <Moni2
          duuregZurag="http://www.nad.ub.gov.mn/uploads/ckfinder/images/60189340_668416636905607_5000816223018024960_n.jpg"
          duureg="Налайх дүүрэг"
          iconColor="red"
        />

        <Moni2
          duuregZurag="http://bnd.ub.gov.mn/wp-content/themes/weekly/images/default_thumb.gif"
          duureg="Багануур дүүрэг"
          iconColor="green"
        />
      </Slider>
    );
  }
}
