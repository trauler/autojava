import { connect } from 'react-redux';
import AuthPage from './AuthPage';
import { userAuth, tryLogin } from '../../actions/user';

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = {
  userAuth,
  tryLogin,
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);