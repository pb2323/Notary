import React, { Component } from "react";
import {
  Button,
  Divider,
  Form,
  Grid,
  Container,
  Message,
} from "semantic-ui-react";
import convertor from "../sha256";
import "semantic-ui-css/semantic.min.css";
import notary from "../ethereum/notary";
import web3 from "../ethereum/web3";

export default class index extends Component {
  state = {
    comment: "",
    fileHash: "",
    error: "",
    fileName: "",
    loading: false,
    loadingCheck: false,
    fileHashEntry: "",
    fileNameEntry: "",
    success: false,
    info: [],
  };

  setFileHash = (result, fileName, check) => {
    check
      ? this.setState({ fileHash: result, fileName: fileName })
      : this.setState({ fileHashEntry: result, fileNameEntry: fileName });
  };

  submitNewEntry = async (e) => {
    if (!!!this.state.fileHash) {
      this.setState({ error: "Submitting a file is mandatory" });
    } else {
      try {
        this.setState({ loading: true });
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const { fileHash, fileName, comment } = this.state;
        await notary.methods.addEntry(fileHash, fileName, comment).send({
          from: accounts[0],
          gas: "1000000",
        });

        this.setState({ error: "" });
      } catch (err) {
        this.setState({ error: err.message, success: false });
      }
      this.setState({ loading: false });
    }
  };

  entrySet = async (e) => {
    if (!!!this.state.fileHashEntry) {
      this.setState({ error: "Submitting a file is mandatory" });
    } else {
      try {
        this.setState({ loadingCheck: true });
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const { fileHashEntry } = this.state;
        const info = await notary.methods.entrySet(fileHashEntry).call();
        console.log(info);

        this.setState({ error: "", success: true, info });
      } catch (err) {
        this.setState({ error: err.message, success: false });
      }
      this.setState({ loadingCheck: false });
    }
  };

  handleFileRead = async (e, check) => {
    try {
      let fakeThis = this;
      var fr = new FileReader();
      fr.readAsText(e.target.files[0]);
      fr.onload = function () {
        const result = convertor(fr.result);
        if (check)
          fakeThis.setFileHash("0x" + result, e.target.files[0].name, true);
        else fakeThis.setFileHash("0x" + result, e.target.files[0].name, false);
      };
    } catch (err) {
      this.setState({
        fileHash: "",
        success: false,
        error: "Some error occured",
        fileHashEntry: "",
      });
    }
  };

  render() {
    return (
      <Container>
        <h2>Notary</h2>

        <Grid columns={2} stackable>
          <Grid.Column>
            <h3>Upload a file</h3>
            <Form>
              <Form.Input
                onChange={(e) => this.handleFileRead(e, true)}
                type="file"
                iconPosition="left"
                label="File"
                placeholder="File"
              />
              <Form.Input
                value={this.state.comment}
                onChange={(e) => {
                  this.setState({ comment: e.target.value });
                }}
                iconPosition="left"
                label="Comment"
              />

              <Button
                loading={this.state.loading}
                onClick={this.submitNewEntry}
                content="Submit a new Entry"
                primary
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <h3>Check a file</h3>
            <Form>
              <Form.Input
                onChange={(e) => this.handleFileRead(e, false)}
                type="file"
                iconPosition="left"
                label="File"
                placeholder="File"
              />
              <Button
                onClick={this.entrySet}
                loading={this.state.loadingCheck}
                content="Check now!"
                positive
              />
            </Form>
          </Grid.Column>
        </Grid>

        <Divider horizontal>And</Divider>
        <h2 style={{ textAlign: "center" }}>Log Status</h2>
        <Message
          style={{ overflowWrap: "break-word" }}
          error
          content={this.state.error}
          header="Oops"
          hidden={!!!this.state.error}
        />
        <Message
          style={{ overflowWrap: "break-word" }}
          success
          header="File Found"
          hidden={!this.state.success}
          list={[
            `Original FileName: ${this.state.info["0"]}`,
            `Uploaded On: ${new Date(parseInt(this.state.info["1"]))}`,
            `Uploaded By: ${this.state.info["2"]}`,
            `Comment: ${this.state.info["3"]}`,
          ]}
        />
      </Container>
    );
  }
}
