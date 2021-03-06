import React from 'react';
import {mount} from 'enzyme';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import ModalContainer from '../../../../app/containers/common/Modal/index';

describe('ModalContainer Integration Test', () => {
    let props = {};
    let store = {};
    let mountedComponent;
    const middleware = [thunk];
    const mockStore = configureMockStore(middleware);
    let wrapper = () => {
        if (!mountedComponent) {
            mountedComponent = mount(
                <Provider store={store}>
                    <ModalContainer {...props} />
                </Provider>
            )
        }
        return mountedComponent
    };
    beforeEach(() => {
        props = {
            returnModal: jest.fn()
        };
        store = mockStore({
            common: {
                modal: {
                    show: true,
                    type: "status",
                    props: {
                        status: "success",
                        title: "Note edited",
                        body: "note edited body"
                    }
                }
            }
        });
        mountedComponent = undefined;
        jest.clearAllMocks();
    });
    describe('render', () => {
        it('should render ModalContainer component', () => {
            expect(wrapper()).toMatchSnapshot();
        })
    });
    describe('functionality', () => {
        it('should render DeleteNoteContainer when modal type is status', () => {
            store = mockStore({
                common: {
                    modal: {
                        show: true,
                        type: "status",
                        props: {
                            status: "success",
                            title: "Note edited",
                            body: "note edited body"
                        }
                    }
                }
            });
            expect(wrapper()).toMatchSnapshot();
        });
        it('should render DeleteNoteContainer when modal type is deleteNoteConfirmation', () => {
            store = mockStore({
                common: {
                    modal: {
                        show: true,
                        type: "deleteNoteConfirmation",
                        props: {
                            status: "success",
                            title: "Note edited",
                            body: "note edited body"
                        }
                    }
                }
            });
            expect(wrapper()).toMatchSnapshot();
        })
    })
});
