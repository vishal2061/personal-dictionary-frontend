import React, { Component } from 'react';
import { Button, Card, Modal, Header } from 'semantic-ui-react';
import { retrieveTutorials, findWordById } from '../actions/dictionary-action';
import { connect } from "react-redux";

class WordList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordListData: [],
            open: false,
            wordDetail: "",
            definitionsForWordDetail: []
        }
    }

    componentDidMount() {
        this.props.retrieveTutorials();
    }

    componentDidUpdate(prevProps) {
        if (this.props.words !== prevProps.words) {
            this.setState({
                wordListData: this.props.words,
            })
        }

        let data;
        if (this.props.wordDetails !== prevProps.wordDetails) {
            this.setState({
                wordDetail: this.props.wordDetails,
            })

            setTimeout(() => {
                data = this.state.wordDetail.length !== 0 ? (
                    this.state.wordDetail.results.map((word) => {
                        word.lexicalEntries.map(lex => {
                            lex.entries.map(ent => {
                                ent.senses.map(sence => {
                                    sence.definitions.map(def => {
                                        return (
                                            def
                                        )
                                    })
                                })
                            })
                        })
                    })

                ) : "";
            }, 2000, this.setState({
                definitionsForWordDetail: data
            }, console.log("defination data", this.state.definitionsForWordDetail)))
        }
    }

    handleClick = (id) => {
        this.props.findWordById(id);
        this.setState({
            open: true
        })
        // this.detail()
    }

    setOpen = (value) => {
        this.setState({
            open: value
        })
    }

    handleClose = () => {
        this.props.retrieveTutorials();
        this.setState({
            open: false
        })
    }

    detail = () => {
        let data1 = [];

        const data = this.state.wordDetail.length !== 0 ? (
            this.state.wordDetail.results.map((word) => {
                word.lexicalEntries.map(lex => {
                    lex.entries.map(ent => {
                        ent.senses.map(sence => {
                            sence.definitions.map(def => {
                                return (
                                    <p>{def}</p>
                                )
                            })
                        })
                    })
                })
            })

        ) : "";

        return data;
    }

    render() {
        const { words } = this.props;



        return (
            <div>
                {this.state.wordListData.length > 0 && this.state.wordListData.map((word) => {
                    return (
                        <Card.Group style={{ paddingLeft: "17%", paddingRight: "17%", paddingBottom: "0px", paddingTop: "10px" }} key={word.id} >
                            <Card fluid onClick={() => this.handleClick(word.id)} style={{ textAlign: "left" }}>
                                <Card.Content style={{ float: "left" }}>

                                    <Card.Header >{word.word}</Card.Header>

                                    <Card.Description>
                                        {word.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]}
                                    </Card.Description>
                                </Card.Content>

                            </Card>

                        </Card.Group>

                    )
                })
                }
                {this.state.wordDetail.length !== 0 &&
                    <Modal
                        onClose={() => this.setOpen(false)}
                        onOpen={() => this.setOpen(true)}
                        open={this.state.open}
                        size="small"

                    >
                        <Modal.Header>{this.state.wordDetail.word}</Modal.Header>
                        <Modal.Content >
                            <Modal.Description>
                                <Header as="h5">Definitions</Header>
                                <p>

                                    {this.state.wordDetail.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0]}</p>
                            </Modal.Description>
                        </Modal.Content>
                        <Modal.Actions>

                            <Button
                                content="OK"
                                labelPosition='right'
                                icon='checkmark'
                                onClick={this.handleClose}
                                positive
                            />
                        </Modal.Actions>
                    </Modal>
                }

            </div >
        )
    }
}

const mapStateToProps = (state) => {
    console.log("state", state.wordDetails.words)

    return {
        words: state.words.words,
        wordDetails: state.wordDetails.words
    };
}

export default connect(mapStateToProps, { retrieveTutorials, findWordById })(WordList);
