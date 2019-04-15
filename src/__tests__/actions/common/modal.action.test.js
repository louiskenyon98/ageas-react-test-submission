import React from 'react';
// import {showFailModal, showSuccessModal, showFailModal, showDeleteNoteConfirmationModal, showConfirmationModal, closeModal} from '../../../app/actions/common/modal.action';
import {
    showSuccessModal,
    showFailModal,
    showDeleteNoteConfirmationModal,
    showConfirmationModal
} from '../../../app/actions/common/modal.action';
import {getNotes, deleteNote} from '../../../app/actions/note/notes.action';
import {
    CLOSE_MODAL, SHOW_CONFIRMATION_MODAL,
    SHOW_STATUS_MODAL
} from '../../../app/actions/types';

jest.mock('../../../app/actions/note/notes.action', () => ({
    getNotes: jest.fn(() => 'getNotes called'),
    deleteNote: jest.fn(() => 'deleteNote called'),
}));

let dispatch = jest.fn((objOrFunc) => {
    return typeof objOrFunc === 'function' ? objOrFunc(dispatch) : objOrFunc
});

const details = {
    title: 'Details Title',
    body: 'Details Body'
};

beforeEach(() => {
    jest.clearAllMocks();
});

describe('modal actions', () => {
    describe('showSuccessModal', () => {
        it('should dispatch SHOW_STATUS_MODAL with status of success', () => {
            const expectedAction = {
                type: SHOW_STATUS_MODAL,
                payload: {
                    status: 'success',
                    ...details
                }
            };
            dispatch(showSuccessModal(details));
            expect(dispatch).toHaveBeenCalledWith(expectedAction);
        });
    });
    describe('showFailModal', () => {
        it('should dispatch SHOW_STATUS MODAL with status of fail', () => {
            const expectedAction = {
                type: SHOW_STATUS_MODAL,
                payload: {
                    status: 'fail',
                    ...details
                }
            };
            dispatch(showFailModal(details));
            expect(dispatch).toHaveBeenCalledWith(expectedAction);
        });
    });
    describe('showDeleteNoteConfirmationModal', () => {
        it('change this', () => {
            const expected = {
                type: SHOW_CONFIRMATION_MODAL,
                payload: {
                    body: 'Do you want to delete this note',
                    accept: {
                        label: 'YES',
                        callback: jest.fn(dispatch())
                    },
                    decline: {
                        label: 'NO',
                        callback: jest.fn()
                    }
                }
            };
            dispatch(showDeleteNoteConfirmationModal(91));
            // expect(dispatch).toHaveBeenCalledTimes(2);
            expect(dispatch).toHaveBeenNthCalledWith(2, expected);
        });
    })
});