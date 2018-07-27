import * as React from 'react';
import { Container, Grid, Menu } from 'semantic-ui-react';

import DefinitionsEditor from '../components/DefinitionsEditor';
import DefinitionsGraph from '../components/DefinitionsGraph';
import GraphToolbar from '../components/GraphToolbar';
import Header from '../components/Header';
import AppStateStore from '../store/AppStateStore';

const App = () => (
  <AppStateStore>
    <Header />
    <Container fluid={true}>
      <Grid style={{height: '100vh'}} centered={true} celled="internally">
        <Grid.Row style={{ height: '100%' }}>
          <Grid.Column width={12} style={{ padding: 0, marginTop: '4.5em', marginBottom: '2.5em'}} className="srd-container">
            <GraphToolbar />
            <DefinitionsGraph />
          </Grid.Column>
          <Grid.Column width={4} style={{ padding: 0, marginTop: '4.5em', marginBottom: '2.5em'}}>
            <DefinitionsEditor />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
    <Menu fixed="bottom" inverted={true}>
      <Menu.Item header={true} position="right">
        © 2019 Plex Systems, Inc. All Rights Reserved.
      </Menu.Item>          
    </Menu>
  </AppStateStore>
);

export default App;
