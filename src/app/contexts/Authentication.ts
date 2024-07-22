import React from "react";
import { connect } from "react-redux";
import { assignAuthentication } from "@/app/contexts/redux/actions";

export const Authentication = (props: {
  children?: any;
  assignAuthentication?: any;
}) => {

  const { children, assignAuthentication } = props;

  return children;

};

const mapStateToProps = (state: { authentication: any }) => {
  return {
    ...(state.authentication || {}),
  };
};

const mapDispatchToProps = { assignAuthentication };

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
