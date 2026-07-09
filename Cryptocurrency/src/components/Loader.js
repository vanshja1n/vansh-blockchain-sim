import React, {Component} from 'react';

class Loader extends Component {
    render(){
        return(
            <div className="loader-container">
                <div className="spinner-modern"></div>
                <span className="loader-text">Loading blockchain data...</span>
            </div>
        )
    }
}

export default Loader;