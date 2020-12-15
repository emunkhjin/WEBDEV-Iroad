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
  Divider
} from "antd";
import { TEXT } from "react-dnd-html5-backend/lib/NativeTypes";
import Monitoring1 from "./Monitoring1";
import Monitoring2 from "./Monitoring2";
import Monitoring3 from "./Monitoring3";
import Monitoring4 from "./Monitoring4";
// import TodayNews from "./TodayNews";
// import SliderJSS from "./slider";
// import Slider from "react-slick";
import Moni from "./MonitorComponent";
import { SearchBox } from "./SearchBox";

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
    console.log(Evdrel);
    return (
      <div className="gx-main-content-wrapper">
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

        <Row wrap>
          <Divider orientation="left">
            <h2 className="gx-mb-2">Дүүрэг</h2>
          </Divider>

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
                <div key={board.key} className="gx-user-list gx-card-list">
                  <Skeleton avatar loading={this.state.loading} active>
                    <div className="gx-featured-thumb">
                      <img
                        className="gx-rounded-lg gx-width-175"
                        src={board.photo}
                        alt="..."
                      />
                    </div>

                    <div className="gx-media-body gx-featured-content">
                      <div className="gx-featured-content-left">
                        <Tag className="gx-rounded-xs" color="#06BB8A">
                          {board.cat}
                        </Tag>
                        <div className="gx-featured-content-left">
                          {board.complete ? (
                            <Tag className="gx-rounded-xs" color="green">
                              <Badge
                                size="default"
                                status="success"
                                text="Шийдэгдсэн"
                              />
                            </Tag>
                          ) : (
                            <Tag className="gx-rounded-xs" color="cyan">
                              <Badge
                                size="default"
                                status="processing"
                                text="Шийдэгдээгүй"
                              />
                            </Tag>
                          )}
                        </div>

                        <h3 className="gx-mb-2">{board.text}</h3>
                        <div className="ant-row-flex">
                          <p className="gx-mr-3 gx-mb-1">
                            <span className="gx-text-grey">Longtitude:</span>{" "}
                            {board.longtitude}
                          </p>
                          <p className="gx-mr-3 gx-mb-1">
                            <span className="gx-text-grey">Latitude:</span>{" "}
                            {board.latitude}
                          </p>
                        </div>
                        <div className="ant-row-flex">
                          <p className="gx-text-grey gx-mb-1">
                            <i
                              className={`icon icon-user gx-fs-xs gx-mr-2 gx-d-inline-flex gx-vertical-align-middle`}
                            />
                            {board.email} 
                          </p>
                          <p className="gx-text-grey gx-ml-4 gx-mb-1">
                            <i
                              className={`icon icon-datepicker gx-fs-xs gx-mr-2 gx-d-inline-flex gx-vertical-align-middle`}
                            />
                            {new Date(
                              board.date.seconds * 1000
                            ).toLocaleDateString("en-US")}
                          </p>
                        </div>
                      </div>
                      <div className="gx-featured-content-right">
                        <div>
                          <a
                            href={`https://www.google.com/maps/place/${
                              board.latitude
                            },${board.longtitude}`}
                            className="gx-text-grey gx-fs-sm"
                          >
                            Байршлийг GoogleMaps дээр харах
                          </a>
                        </div>
                        <a
                          href={`/show/${board.key}`}
                          className="gx-text-primary gx-text-truncate gx-mt-auto gx-mb-0 gx-pointer"
                        >
                          Дэлгэрэнгүй
                          <i
                            className={`icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle`}
                          />
                        </a>
                      </div>
                    </div>
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
