import rbacProviderReducer from './components/RBACProvider/reducer';
import appReducer from './pages/App/reducer';

const reducers = {
  admin_app: appReducer,
  rbacProvider: rbacProviderReducer
};

export default reducers;
