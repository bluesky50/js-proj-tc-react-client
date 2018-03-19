import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

// const isAuthenticated = () => {
//     return true;
// }

// const isAuthenticated = (userInfo) => {
//     // const { userInfo } = this.props;
//     if (userInfo && userInfo.username && typeof userInfo.username === 'string' && userInfo.room && typeof userInfo.room === 'string') {
//         return true;
//     }
//     return false;
// };

// const PrivateRoute = ({ component: Component, ...rest }) => {

//     return (
//         <Route {...rest} 
//             render={ props => isAuthenticated(userInfo) ? 
//                 (<Component {...props}/>) : 
//                 (<Redirect 
//                     to={{ 
//                         pathname: "/", 
//                         state: { from: props.location } 
//                     }}/>
//                 ) 
//             } 
//         />
//     );
// }

class PrivateRoute extends React.Component {

    isAuthenticated() {
        const { userInfo } = this.props;
        if (userInfo && userInfo.username && typeof userInfo.username === 'string' && userInfo.room && typeof userInfo.room === 'string') {
            return true;
        }
        return false;
    };

    render() {
        const { component:Component, ...rest } = this.props;
        return (
            <Route {...rest} 
                render={ props => this.isAuthenticated() ? 
                    (<Component {...props}/>) : 
                    (<Redirect 
                        to={{ 
                            pathname: "/", 
                            state: { from: props.location } 
                        }}/>
                    ) 
                } 
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    };
};

export default connect(mapStateToProps, null)(PrivateRoute);