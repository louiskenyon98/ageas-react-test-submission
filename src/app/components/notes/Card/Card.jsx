import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from '../Notes.styles.scss';

class Card extends React.PureComponent {
    render() {
        return (
            <div className={`col-xs-1 col-md-4 col-xl-3 d-flex align-items-stretch ${styles.column}`}>
                <div className={`ui raised card ${styles.card}`}>
                    <div className={`content`}>
                        <i
                            onClick={() => this.props.delete(this.props.id)}
                            className={`right floated close icon ${styles["delete-button"]}`}
                        />
                        <div className={`header ${styles.header}`}>
                            {this.props.title}
                        </div>
                        <div className={`description ${styles.body}`}>
                            <p>
                                {this.props.body}
                            </p>
                        </div>
                    </div>
                    <div className={"extra content"}>
                        <span className="right floated pencil alternate">
                            {/*pass props to link*/}
                            <Link to={`/edit/${this.props.id}`}>
                                <i className={`pencil alternate icon ${styles["edit-button"]}`}/>
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

Card.propTypes = {
    delete: PropTypes.func,
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string
};

export default Card;
