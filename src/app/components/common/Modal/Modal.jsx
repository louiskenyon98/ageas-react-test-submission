import React from 'react';
import styles from './Modal.styles.scss';

class Modal extends React.Component {
    render() {
        const {show, children} = this.props;
        if (show) {
            return (
                <React.Fragment>
                    <div className={styles.veil} onClick={this.props.close}/>
                    <div className={styles.modal}>
                        {this.props.title && <h1>{this.props.title}</h1>}
                        {children}
                    </div>
                </React.Fragment>
            )
        }
        return null;
    }

}

export default Modal;
