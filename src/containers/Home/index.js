import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'grommet/components/Card';
import Heading from 'grommet/components/Heading';
import Paragraph from 'grommet/components/Paragraph';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Helmet from 'react-helmet';
import Edit from 'grommet/components/icons/base/Edit';
import { fetchData, jwtDispatch } from './action';

const thumbnailImg = 'https://lorempixel.com/400/200/sports/';
class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.googleLogin = this.googleLogin.bind(this);
  }
  componentDidMount() {
    this.props.fetchDataFunc();
  }
  googleLogin() {
    this.props.jwtDispatchFunc();
  }
  render() {
    const { home, fetchDataFunc } = this.props;
    return (<div className="grommet">
      <Helmet title="Home" />
      <div className="container-color">
        <div className="myclass">
          <Heading tag="h1" margin="medium" strong>{home.message}</Heading><Heading tag="h2" margin="medium">Served in {home.data}</Heading>
          <Paragraph size="medium">
            Raised on hip-hop and foster care, defiant city kid Ricky
            gets a fresh start in the New Zealand countryside. He quickly finds himself
            at home with his new foster family {home.jwtdata}
          </Paragraph>
        </div>
      </div>
      <div className="myclass">
        <Box direction="row" justify="start" align="start" wrap={false} pad="none" margin="none">
          <Card
            thumbnail={thumbnailImg}
            heading="Sample Heading"
            contentPad="small"
            margin="small"
            link={<Button icon={<Edit />} label="Fetch Data" onClick={this.googleLogin} critical={false} accent plain />}
          />
          <Card
            thumbnail={thumbnailImg}
            heading="Sample Heading"
            contentPad="small"
            margin="small"
            link={<Button icon={<Edit />} label="Fetch Data" onClick={fetchDataFunc} critical={false} accent plain />}
          />
          <Card
            thumbnail={thumbnailImg}
            heading="Sample Heading"
            contentPad="small"
            margin="small"
            link={<Button icon={<Edit />} label="Fetch Data" onClick={fetchDataFunc} critical={false} accent plain />}
          />
        </Box>
      </div>
      <div className="myclass">
        <Box direction="row" justify="start" align="start" wrap={false} pad="none" margin="none">
          <Card
            thumbnail={thumbnailImg}
            heading="Sample Heading"
            margin="small"
            contentPad="small"
            link={<Button icon={<Edit />} label="Fetch Data" onClick={fetchDataFunc} critical={false} accent plain />}
          />
          <Card
            thumbnail={thumbnailImg}
            heading="Sample Heading"
            margin="small"
            contentPad="small"
            link={<Button icon={<Edit />} label="Fetch Data" onClick={fetchDataFunc} critical={false} accent plain />}
          />
          <Card
            thumbnail={thumbnailImg}
            heading="Sample Heading"
            margin="small"
            contentPad="small"
            link={<Button icon={<Edit />} label="Fetch Data" onClick={fetchDataFunc} critical={false} accent plain />}
          />
        </Box>
        {home.ctr ? <Heading>{home.ctr}</Heading> : null}
      </div>
    </div>);
  }
}

Home.propTypes = {
  home: PropTypes.shape({ message: PropTypes.string }),
  fetchDataFunc: PropTypes.func.isRequired,
  jwtDispatchFunc: PropTypes.func.isRequired,
};

Home.defaultProps = {
  home: { message: '' },
};

export default connect(
  ({ home }) => ({ home }),
  dispatch => ({
    jwtDispatchFunc: () => dispatch(jwtDispatch()),
    fetchDataFunc: () => dispatch(fetchData()),
  }),
)(Home);
