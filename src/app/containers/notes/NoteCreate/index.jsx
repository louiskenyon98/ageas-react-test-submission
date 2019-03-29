import React from 'react';
import {connect} from 'react-redux';
import {postNote} from '../../../actions/note/notes.action';
import {showHelloWorldModal} from '../../../actions/common/modal.action';
import NoteFormContainer from '../NoteForm';
import styles from '../../../../themes/style.scss';


class NoteCreateContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(formValues) {
        this.props.postNote(formValues);
        this.props.showHelloWorldModal("Successful")
    };

    render() {
        return (
            <div className={`col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 ${styles["note-creator"]}`}>
                <h2>Create New Note</h2>
                <NoteFormContainer
                    onSubmit={this.onSubmit}
                />
            </div>

        )
    }
}

export default connect(
    null,
    {postNote, showHelloWorldModal}
)(NoteCreateContainer);