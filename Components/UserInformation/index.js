import React, { Component } from "react";

//Screen Names
import {
  PREVJOBS,
  UPCOMINGJOBS,
  PROFILE,
  USERINFO,
} from "../../Navigation/screenNames";

//Native Base
import {
  Container,
  TabHeading,
  Title,
  Tabs,
  Icon,
  Tab,
  Spinner,
  Text,
} from "native-base";

import { getWorkerAppliedJobs } from "../../redux/actions/jobs";

//StyleSheet
import styles from "./styles";

//Profile
import Profile from "./Profile";

//Connect
import { connect } from "react-redux";

//Previous Jobs
import PreviousJobs from "./PreviousJobs";

//Up Coming Jobs
import UpcomingJobs from "./UpcomingJobs";

class UserInformation extends Component {
  state = {
    activePage: 1,
    loading: true,
  };

  // you don't need the loading state.
  // this component is only used only when there is a user.
  // there's a condition that does this in UserStack's render.
  componentWillMount = () => {
    if (this.props.user) this.setState({ loading: false });
  };
  render() {
    if (this.state.loading) return <Spinner color="rgb(70,144,69)" />;

    this.props.getWorkerAppliedJobs();

    return (
      <Container>
        <Title style={styles.title}>{USERINFO}</Title>
        <Tabs tabBarUnderlineStyle={{ borderBottomWidth: 5 }}>
          <Tab
            heading={
              <TabHeading
                active
                style={{
                  backgroundColor: "#669999",
                  activeTextStyle: "black",
                  activeTabStyle: "red",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {PROFILE}
                </Text>
              </TabHeading>
            }
          >
            {/* this condition isn't necessary because there's already a condition in UserStack */}
            {this.props.user ? <Profile /> : null}
          </Tab>

          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "#669999",
                  activeTextStyle: "black",
                  activeTabStyle: "red",
                  underlineStyle: "white",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {PREVJOBS}
                </Text>
              </TabHeading>
            }
          >
            <PreviousJobs />
          </Tab>
          <Tab
            heading={
              <TabHeading
                style={{
                  backgroundColor: "#669999",
                  activeTextStyle: "black",
                  activeTabStyle: "red",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {UPCOMINGJOBS}
                </Text>
              </TabHeading>
            }
          >
            <UpcomingJobs />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userState.user,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getWorkerAppliedJobs: () => dispatch(getWorkerAppliedJobs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInformation);
