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
import { fetchData } from './action';

class Home extends PureComponent {
  componentDidMount() {
    this.props.fetchDataFunc();
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
            at home with his new foster family
          </Paragraph>
        </div>
      </div>
      <div className="myclass">
        <Box direction="row" justify="start" align="start" wrap={false} pad="none" margin="none">
          <Card
            thumbnail="http://grommet.io/img/carousel-1.png"
            heading="Sample Heading"
            contentPad="small"
            margin="small"
            link={<Button icon={<Edit />} label="Fetch Data" onClick={fetchDataFunc} critical={false} accent plain />}
          />
          <Card
            thumbnail="http://grommet.io/img/carousel-1.png"
            heading="Sample Heading"
            contentPad="small"
            margin="small"
            link={<Button icon={<Edit />} label="Fetch Data" onClick={fetchDataFunc} critical={false} accent plain />}
          />
          <Card
            thumbnail="http://grommet.io/img/carousel-1.png"
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
            thumbnail="http://grommet.io/img/carousel-1.png"
            heading="Sample Heading"
            margin="small"
            contentPad="small"
            link={<Button icon={<Edit />} label="Fetch Data" onClick={fetchDataFunc} critical={false} accent plain />}
          />
          <Card
            thumbnail="http://grommet.io/img/carousel-1.png"
            heading="Sample Heading"
            margin="small"
            contentPad="small"
            link={<Button icon={<Edit />} label="Fetch Data" onClick={fetchDataFunc} critical={false} accent plain />}
          />
          <Card
            thumbnail="http://grommet.io/img/carousel-1.png"
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
};

Home.defaultProps = {
  home: { message: '' },
};

export default connect(
  ({ home }) => ({ home }),
  dispatch => ({
    fetchDataFunc: () => dispatch(fetchData()),
  }),
)(Home);
