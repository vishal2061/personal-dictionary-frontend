import React from 'react';
import { Icon, Input, Form } from 'semantic-ui-react';
import { findWord, retrieveTutorials } from '../../actions/dictionary-action';
import { connect } from "react-redux";

class SearchWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedWord: ""
        }
    }

    handleSearchChange = (e, data) => {
        console.log(e, data)
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log("Searched word", this.state.searchedWord)
        setTimeout(() => {
            if (this.state.searchedWord.length === 0) {
                this.props.retrieveTutorials()
            }
        }, 1000)

    }

    handleClick = () => {
        this.props.findWord(this.state.searchedWord);
    }

    handleSubmit = (e) => {
        console.log(e, this.state.searchedWord)
        e.preventDefault();
        this.props.findWord(this.state.searchedWord);
    }

    render() {
        return (


            <Form style={{ paddingLeft: "70%" }} onSubmit={this.handleSubmit} >
                {/* <Search
                style={{ paddingLeft: "80%" }}
                onSearchChange={this.handleSearchChange}
            /> */}
                <Form.Field >
                    <Input
                        name="searchedWord"
                        value={this.state.searchedWord}
                        onChange={this.handleSearchChange}
                        icon={<Icon name='search' link inverted circular onClick={this.handleClick} />}
                        placeholder='Search...'
                    />
                </Form.Field>
            </Form>

        )
    }
}

const mapStateToProps = (state) => {
    console.log("sunnyMap")
    return {
        words: state.words,
    };
};

export default connect(mapStateToProps, { findWord, retrieveTutorials })(SearchWord);