import React, { Component } from 'react';
import '../loading.css';
import { Trans } from 'react-i18next';
class Loader extends Component {
    render() {
        return (<div className='loader-container'>
            <div className='loader'>
                <div className="lds-ripple"><div></div><div></div></div>
                <h4><Trans i18nKey="loading"></Trans></h4>
            </div>

        </div>)
    }
}
export default Loader;
