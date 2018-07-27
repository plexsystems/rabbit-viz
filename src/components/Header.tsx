import * as React from 'react';
import { Container, Icon, Image, Menu } from 'semantic-ui-react';
import logo from '../logo.svg';

class Header extends React.Component {
  public render() {
    return (
      <Menu fixed="top" inverted={true}>
        <Container fluid={true}>
          <Menu.Item header={true} as="h4">
            <Image size="mini" src={logo} style={{ marginRight: '1.5em' }} />
            Rabbit Viz
          </Menu.Item>
          <Menu.Item position="right" href="https://github.com/plexsystems/rabbit-viz" target="_blank">
            <Icon name="github" size="big" />
            Fork us on GitHub!
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

export default Header;