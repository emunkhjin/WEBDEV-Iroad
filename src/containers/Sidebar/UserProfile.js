import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import { auth } from "firebase";
import * as firebase from "firebase";
import "firebase/firestore";

class UserProfile extends Component {
  render() {
    var user = firebase.auth().currentUser;
    // console.log("User metadata: ", user.metadata.lastSignInTime);
    // var lastSign = user.metadata.lastSignInTime;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;
    }
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>Миний бүртгэл</li>

        <li onClick={() => this.props.userSignOut()}>Гарах</li>
      </ul>
    );

    return (
      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
        <Popover
          placement="bottomRight"
          content={userMenuOptions}
          trigger="click"
        >
          {/* <Avatar
            src={photoUrl}
            className="gx-size-40 gx-pointer gx-mr-3"
            alt=""
          />
          <span className="gx-avatar-name">
            {name}
            <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
          </span> */}
          <span className="gx-avatar-name">
            Хэрэглэгч
            <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
          </span>
          {/* <span>Хамгийн сүүлд {lastSign} орсон байна.</span> */}
        </Popover>
      </div>
    );
  }
}

export default connect(
  null,
  { userSignOut }
)(UserProfile);
