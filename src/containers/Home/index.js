import React from 'react';
// import { Link } from 'react-router-dom';
// import Helmet from 'react-helmet';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import NextIcon from 'grommet/components/icons/base/Next';
import Heading from 'grommet/components/Heading';
import Headline from 'grommet/components/Headline';
import Paragraph from 'grommet/components/Paragraph';

const usersid = '123'; const usersname = 'View';

const Home = () => (<div className="grommet myclass">
  <div style={{ maxWidth: 1092, padding: '2em', margin: '0 auto' }}>
    <Heading tag="h1" margin="medium" strong>React Universal</Heading>
    <Headline size="small" margin="small">Brought To You In Subway Style</Headline>
    <Paragraph size="medium">
      Raised on hip-hop and foster care, defiant city kid Ricky
    gets a fresh start in the New Zealand countryside. He quickly finds himself
    at home with his new foster family: the loving Aunt Bella, the cantankerous
    Uncle Hec, and dog Tupac. When a tragedy strikes that threatens to ship
    </Paragraph>
    <Card
      thumbnail="http://grommet.io/img/carousel-1.png"
      label="Sample Label"
      heading="Sample Heading"
      contentPad="small"
      link={<Anchor path={`/UserInfo/${usersid}`} primary animateIcon label={usersname} reverse icon={<NextIcon />} />}
    />
  </div>
</div>);

export default Home;
