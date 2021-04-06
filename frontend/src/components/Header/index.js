import Header from './Header';
import { connect } from 'react-redux';
import { userLogOut } from '../../actions/user';


const mapStateToProps = (state) => ({
  router: state.router,
})

const mapDispatchToProps = {
  userLogOut,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
