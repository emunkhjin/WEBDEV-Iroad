import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as firebase from "firebase";
import "firebase/firestore";
import CardBox from "components/CardBox/index";
import {
  Tag,
  Card,
  Col,
  Row,
  Skeleton,
  Button,
  Carousel,
  Input,
  Badge,
  Divider,
  Avatar
} from "antd";
import { TEXT } from "react-dnd-html5-backend/lib/NativeTypes";
import Monitoring1 from "./Monitoring1";
import Monitoring2 from "./Monitoring2";
import Monitoring3 from "./Monitoring3";
import Monitoring4 from "./Monitoring4";
// import TodayNews from "./TodayNews";
// import SliderJSS from "./slider";
// import Slider from "react-slick";
import { Moni } from "./MonitorComponent";
import { SearchBox } from "./SearchBox";
import TodayNews from "./TodayNews";
import WelComeCard from "../../../src/components/dashboard/CRM/WelComeCard";
import SiteVisit from "../../../src/components/dashboard/CRM/SiteVisit";
import SiteAudience from "../../../src/components/dashboard/CRM/SiteAudience";
const Search = Input.Search;
class SamplePage extends Component {
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
      .orderBy("date", "desc");
    this.unsubscribe = null;
    this.state = {
      Evdrel: [],
      searchField: ""
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
        cat,
        complete
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
        complete,
        cat
      });
    });

    this.setState({
      Evdrel
    });
  };

  onSearchChanged = event => {
    this.setState({ searchField: event.target.value });
  };
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    // const script = document.createElement("script");
    // script.src = "/js/light.js";
    // script.async = true;
    // document.body.appendChild(script);
    this.showSkeleton();
  }

  render() {
    const { Evdrel, searchField } = this.state;
    const filteredEvdrel = Evdrel.filter(el =>
      el.text.toLowerCase().includes(searchField)
    );

    // var user = firebase.auth().currentUser.displayName;
    // var userPhoto = firebase.auth().currentUser.photoURL;
    //const userName = user;
    //console.log(userName);
    return (
      <div className="gx-main-content-wrapper">
        {/* <Divider orientation="left">
          <h2 className="gx-mb-2">
            Сайн байна уу {userName}
            <Avatar src={userPhoto} />
          </h2>
        </Divider> */}
        <Divider orientation="left">
          <h2 className="gx-mb-2">Monitoring</h2>
        </Divider>
        <Row gutter={[8, 8]}>
          <Monitoring1 />
          <Monitoring2 />
        </Row>
        <Row gutter={[8, 8]}>
          <Monitoring3 />
          <Monitoring4 />
        </Row>
        <Row>
          {/* <Col span={24}>
            <div className="gx-card">
              <div className="gx-card-body">
                <Row>
                  <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                    <WelComeCard />
                  </Col>

                  <Col
                    xl={6}
                    lg={12}
                    md={12}
                    sm={12}
                    xs={24}
                    className="gx-audi-col"
                  >
                    <SiteAudience />
                  </Col>

                  <Col
                    xl={12}
                    lg={24}
                    md={24}
                    sm={24}
                    xs={24}
                    className="gx-visit-col"
                  >
                    <SiteVisit />
                  </Col>
                </Row>
              </div>
            </div>
          </Col> */}
        </Row>
        <Divider orientation="left">
          <h2 className="gx-mb-2">Дүүрэг</h2>
        </Divider>
        <TodayNews />

        <Row>
          <Moni duureg="Баянзүрх дүүрэг" iconColor="yellow" />
          <Moni duureg="Сүхбаатар дүүрэг" iconColor="blue" />
          <Moni duureg="Чингэлтэй дүүрэг" iconColor="red" />
          <Moni duureg="Баянгол дүүрэг" iconColor="green" />
          <Moni duureg="Хан-Уул дүүрэг" iconColor="yellow" />
          <Moni duureg="Багахангай дүүрэг" iconColor="blue" />
          <Moni duureg="Налайх дүүрэг" iconColor="red" />
          <Moni duureg="Багануур дүүрэг" iconColor="green" />
        </Row>
        <Divider orientation="left">
          <h2 className="gx-mb-2">Шинээр нэмэгдсэн мэдээлэл</h2>
        </Divider>
        {/* <SliderJSS /> */}
        {/* <div>
          <Card className="gx-card" title="Search Box">
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
              size="large"
            />
          </Card>
        </div> */}

        <div className="gx-main-content gx-pb-sm-4">
          <div className="ant-row">
            <div className="ant-col ant-col-24">
              <SearchBox onSearch={this.onSearchChanged} />
              {filteredEvdrel.map(board => (
                <div key={board.key} className="dt-card">
                  <Skeleton avatar loading={this.state.loading} active>
                    {/* Card */}
                    <div className="card dt-card__product-horizontal">
                      <div className="dt-product-image">
                        <div className="dt-grid-thumb-equal">
                          <span className="dt-grid-thumb-cover">
                            <img
                              className="card-img-left"
                              src={board.photo}
                              alt={board.key}
                            />
                          </span>
                        </div>
                      </div>
                      {/* Card Body */}
                      <div className="card-body overflow-hidden mb-6 mb-sm-0 pr-sm-3">
                        <div className="text-truncate">
                          <h2 className="d-inline-block mb-3 pr-4 mr-3 border-right">
                            {board.text}
                          </h2>

                          <h5 className="d-inline-block mb-3 border-right">
                            {board.complete ? (
                              <Tag className="gx-rounded-xs" color="green">
                                <Badge
                                  size="default"
                                  status="success"
                                  text="Шийдэгдсэн"
                                />
                              </Tag>
                            ) : (
                              <Tag className="gx-rounded-xs" color="purple">
                                <Badge
                                  size="default"
                                  status="processing"
                                  text="Шийдэгдээгүй"
                                />
                              </Tag>
                            )}
                          </h5>
                          <p className="d-inline-block mb-3">
                             {" "}
                            <span class="badge badge-info mb-1 mr-1">
                              {board.cat}{" "}
                            </span>
                          </p>
                        </div>
                        <p className="text-truncate text-light-gray">
                          <p className="gx-mr-3 gx-mb-1">
                            <span className="gx-text-grey">Longtitude:</span>{" "}
                            {board.longtitude}
                          </p>
                          <p className="gx-mr-3 gx-mb-1">
                            <span className="gx-text-grey">Latitude:</span>{" "}
                            {board.latitude}
                          </p>
                        </p>
                        <div className="d-flex flex-sm-row flex-column">
                          <div className="mb-4 mb-sm-0">
                            <span className="mr-4 mr-md-6 text-nowrap">
                              <i
                                className={`icon icon-user gx-fs-xs gx-mr-2 gx-d-inline-flex gx-vertical-align-middle`}
                              />
                              {board.email} 
                            </span>
                            <span className="mr-4 mr-md-6 text-nowrap">
                              <i
                                className={`icon icon-datepicker gx-fs-xs gx-mr-2 gx-d-inline-flex gx-vertical-align-middle`}
                              />
                              {new Date(
                                board.date.seconds * 1000
                              ).toLocaleDateString("en-US")}
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* /card body */}
                      <div className="card-footer">
                        <div className="min-w-120">
                          <a
                            href={`/show/${board.key}`}
                            className="btn btn-primary btn-block"
                          >
                            Дэлгэрэнгүй
                          </a>
                          <a
                            href={`https://www.google.com/maps/place/${
                              board.latitude
                            },${board.longtitude}`}
                            className="btn btn-outline-light text-light-gray btn-block"
                          >
                            <span>Байршлийг GoogleMaps дээр харах</span>
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* /card */}
                  </Skeleton>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
// export default App;
export default SamplePage;
