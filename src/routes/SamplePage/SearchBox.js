import React from "react";
import { Input, Col, Row } from "antd";
const { Search } = Input;
export const SearchBox = props => (
  <Row gutter={[8, 8]}>
    <Col span={6}>
      <Search
        size="large"
        placeholder="Хайх зүйлээ бичнэ үү"
        onChange={props.onSearch}
        enterButton
      />
    </Col>
  </Row>
);
