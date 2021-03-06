import React from 'react';
import {mount} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import NoteEditContainer from '../../../../app/containers/notes/NoteEdit/index';
import {getNotes, getNote, patchNote} from '../../../../app/actions/note/notes.action';

jest.mock('redux-form', () => ({
    Field: () => <div/>,
    reduxForm: () => Component => (props) => <Component {...props} handleSubmit={jest.fn((submit) => submit)}/>
}));

jest.mock('../../../../app/actions/note/notes.action', () => ({
    getNotes: jest.fn(() => () => {
    }),
    getNote: jest.fn(() => () => {
    }),
    patchNote: jest.fn((formValues, callback) => () => callback()),
}));

describe('NoteEditContainer Integration Test', () => {
    let props = {};
    let store = {};
    let mountedComponent;
    let history = createHistory();
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    let wrapper = () => {
        if (!mountedComponent) {
            mountedComponent = mount(
                <Provider store={store}>
                    <Router history={history}>
                        <NoteEditContainer {...props}/>
                    </Router>
                </Provider>
            )
        }
        return mountedComponent;
    };
    beforeEach(() => {
        props = {
            match: {
                params: {
                    id: 91
                }
            }
        };
        store = mockStore({
            notes: {
                edit: {
                    id: 91,
                    title: 'title1',
                    body: 'body1'
                }
            },
        });
        mountedComponent = undefined;
        jest.clearAllMocks();
    });
    describe('render', () => {
        it('should render NoteEditContainer component', () => {
            expect(wrapper()).toMatchSnapshot();
        });
    });
    describe('functionality', () => {
        it('should call getNote on render', () => {
            expect(getNote).not.toHaveBeenCalled();
            wrapper();
            expect(getNote).toHaveBeenCalledTimes(1);
            expect(getNote).toHaveBeenCalledWith(91);
        });
        it('should submit with formValues onSubmit', () => {
            const formValues = {
                title: 'testTitle',
                body: 'testBody'
            };
            expect(getNotes).toHaveBeenCalledTimes(0);
            expect(patchNote).toHaveBeenCalledTimes(0);
            wrapper().find('NoteFormContainer').first().props().onSubmit(formValues);
            expect(getNotes).toHaveBeenCalledTimes(1);
            expect(patchNote).toHaveBeenCalledTimes(1);
            expect(patchNote).toHaveBeenCalledWith(formValues, expect.anything());
        })
    });
});
