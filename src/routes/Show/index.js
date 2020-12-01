import React, { Component } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import { Link } from "react-router-dom";
import { Tag, Card, Col, Row, Skeleton, Divider, Button } from "antd";
import { shape } from "prop-types";

class Show extends Component {
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
    this.state = {
      board: {},
      key: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("Evdrel")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
    const script = document.createElement("script");
    script.src = "/js/light.js";
    script.async = true;
    document.body.appendChild(script);
    this.showSkeleton();
  }

  delete(id) {
    firebase
      .firestore()
      .collection("Evdrel")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    return (
      <div className="gx-layout-content   ant-layout-content">
        <div className="gx-main-content-wrapper">
          <div className="gx-main-content gx-pb-sm-4">
            <div className="ant-row">
              <div className="ant-col ant-col-24 ">
                <div className="">
                  <div className="ant-card-body">
                    <div className="gx-user-list gx-card-list">
                      <Skeleton
                        paragraph={{ rows: 10 }}
                        avatar
                        loading={this.state.loading}
                        active
                      >
                        <div className="gx-featured-thumb">
                          {/* <Skeleton active /> */}

                          <img
                            width={400}
                            height={400}
                            className="gx-rounded-lg shadow-lg"
                            src={this.state.board.photo}
                            alt="..."
                          />
                        </div>

                        <div className="gx-media-body gx-featured-content">
                          <div className="gx-featured-content-left">
                            <h3 className="gx-mb-2">{this.state.board.text}</h3>
                            <Tag className="gx-rounded-xs" color="#06BB8A">
                              {this.state.board.cat}
                            </Tag>
                            <Divider />
                            <div className="ant-row-flex">
                              <p className="gx-mr-3 gx-mb-1">
                                <span className="gx-text-grey">
                                  Longtitude:
                                </span>{" "}
                                {this.state.board.longtitude}
                              </p>
                              <p className="gx-mr-3 gx-mb-1">
                                <span className="gx-text-grey">Latitude:</span>{" "}
                                {this.state.board.latitude}
                              </p>
                            </div>
                            <Divider />
                            <div className="ant-row-flex">
                              <p className="gx-mr-3 gx-mb-1">
                                <iframe
                                  width={900}
                                  height={250}
                                  className="gx-rounded-lg shadow-lg"
                                  src={`https://maps.google.com/maps?q=${
                                    this.state.board.latitude
                                  },${
                                    this.state.board.longtitude
                                  }&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                                  frameborder="0"
                                  allowfullscreen
                                />
                              </p>
                            </div>
                            <Divider />
                            <div className="ant-row-flex">
                              <p className="gx-text-grey gx-mb-1">
                                <i
                                  className={`icon icon-user gx-fs-xs gx-mr-2 gx-d-inline-flex gx-vertical-align-middle`}
                                />
                                {this.state.board.email} 
                              </p>
                              <button
                                onClick={this.delete.bind(this, this.state.key)}
                                class="ant-btn ant-btn-danger ant-btn-lg gx-featured-content-right"
                              >
                                <span className={`icon icon-trash gx-mr-2`}>
                                   Устгах
                                </span>
                              </button>
                              <button
                                onClick={console.log("asd")}
                                class="ant-btn ant-btn-lg gx-featured-content "
                                style={{
                                  borderColor: "green",
                                  color: "green"
                                }}
                              >
                                <span className={`icon icon-ckeditor gx-mr-2`}>
                                   Засах
                                </span>
                              </button>

                              {/* <p className="gx-text-grey gx-ml-4 gx-mb-1">
                              <i
                                className={`icon icon-datepicker gx-fs-xs gx-mr-2 gx-d-inline-flex gx-vertical-align-middle`}
                              />
                              {new Date(
                                this.state.board.date.seconds * 1000
                              ).toLocaleDateString("en-US")}
                            </p> */}
                            </div>
                          </div>
                          {/* <div className="gx-featured-content-right">
                          <div>
                            <a
                              href={`https://www.google.com/maps/place/${
                                this.state.board.latitude
                              },${this.state.board.longtitude}`}
                              className="gx-text-grey gx-fs-sm"
                            >
                              Байршлийг GoogleMaps дээр харах
                            </a>
                          </div>
                          <a
                            href={`/show/${this.state.board.key}`}
                            className="gx-text-primary gx-text-truncate gx-mt-auto gx-mb-0 gx-pointer"
                          >
                            Дэлгэрэнгүй
                            <i
                              className={`icon icon-long-arrow-right gx-fs-xxl gx-ml-2 gx-d-inline-flex gx-vertical-align-middle`}
                            />
                          </a>
                        </div> */}
                        </div>
                      </Skeleton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
