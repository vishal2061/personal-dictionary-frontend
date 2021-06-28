import React from 'react';
import { Button, Form, Input, Modal, Search } from 'semantic-ui-react';
import { connect } from "react-redux";
import { getWordsss, retrieveTutorials, createWord } from '../../actions/dictionary-action';
import axios from 'axios';

class AddWord extends React.Component {
    constructor(props) {
        super(props);
        const { dispatch } = props;
        this.state = {
            open: false,
            word: "",
        }
    }

    handleChange = (e) => {
        this.setState({
            word: e.target.value
        })
    }

    handleOpen = () => {
        console.log("vishal");
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("before getWordsss method")
        const app_id = process.env.REACT_APP_OXFORD_APP_ID;
        const app_key = process.env.REACT_APP_OXFORD_APP_KEY;
        const wordId = this.state.word;
        const fields = "definitions";
        const strictMatch = "true";

        const options = {

            host: process.env.REACT_APP_OXFORD_HOST,
            port: '443',
            path: '/api/v2/entries/en-gb/' + wordId + '?fields=' + fields + '&strictMatch=' + strictMatch,
            method: "GET",
            headers: {
                'app_id': app_id,
                'app_key': app_key
            }
        };

        const url = `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${this.state.word}?fields=definitions&strictMatch=true`

        const header = {

            "Accept": "application/json",
            "app_id": "c2e7b1fe",
            "app_key": "b41be5b3b08f91ebe3d849570f15c52a"
        }
        // axios.get(options).then(data => {
        //     console.log(data)
        // }).catch(err => {
        //     console.log(err)
        // })

        axios.get(url, {
            headers: {
                "Accept": "application/json",
                "app_id": "c2e7b1fe",
                "app_key": "b41be5b3b08f91ebe3d849570f15c52a"
            }
        }).then(data => {
            this.props.createWord(data);
        }).catch(err => {
            console.log(err)
        })





        // this.props.retrieveTutorials()


        this.handleClose();
    }

    render() {
        const addButtonStyle = {
            position: "fixed",

            bottom: "16%",
            right: "10%"
        }

        return (
            <div>
                <Modal
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    open={this.state.open}
                    size="mini"
                    trigger={<Button circular size="large" color="instagram" style={addButtonStyle}>Add Word</Button>}
                >
                    <Modal.Header>Add Word</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Enter Word</label>
                                <Input name="word" value={this.state.word} onChange={this.handleChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button
                            content="Add"
                            labelPosition='right'
                            icon='checkmark'
                            type="onSubmit"
                            onClick={this.handleSubmit}
                            positive
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default connect(null, { getWordsss, retrieveTutorials, createWord })(AddWord);