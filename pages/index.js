import React, { Component } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Container,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default class index extends Component {
  render() {
    return (
      <Container>
        <h2>Notary</h2>

        <Grid columns={2} stackable>
          <Grid.Column>
            <h3>Upload a file</h3>
            <Form>
              <Form.Input
                type="file"
                iconPosition="left"
                label="File"
                placeholder="File"
              />
              <Form.Input iconPosition="left" label="Comment" type="password" />

              <Button content="Submit a new Entry" primary />
            </Form>
          </Grid.Column>

          <Grid.Column>
            <h3>Check a file</h3>
            <Form>
              <Form.Input
                type="file"
                iconPosition="left"
                label="File"
                placeholder="File"
              />

              <Button content="Check now!" positive />
            </Form>
          </Grid.Column>
        </Grid>
        <Divider horizontal>Or</Divider>
        <h2 style={{ textAlign: "center" }}>Log Status</h2>
      </Container>
    );
  }
}
