// Core
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

// Instruments
import Styles from './styles.m.css';
import PropTypes from 'prop-types';

const portal = document.getElementById('spinner');

export default class Spinner extends Component {
    static propTypes = {
        isPostsFetching: PropTypes.bool.isRequired,
    };
    render () {
        const { isPostsFetching } = this.props;

        return createPortal(
            isPostsFetching ? <div className = { Styles.spinner } /> : null,
            portal
        );
    }
}
