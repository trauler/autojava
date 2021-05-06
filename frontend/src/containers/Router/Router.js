import React, { Fragment, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import AuthPage from '../AuthPage';
import { AUTH_PATH } from '../../constants';


export default function Router(props) {
  const {
    router,
    lastLocation,
    user: { isLoggedIn },
    location: { pathname },
  } = props;

  // const NotFound = lazy(() => import('../../components/NotFound'));
  const enhanceRouter = [
    ...router,
    {
      type: 'route',
      path: '/404/',
      component: () => (<div>not found</div>),
    },
  ];

  const renderDefaultRedirect = (path = '/') => {
    return (
      <Route
        render={({ history }) => {
          const { location } = history || {};
          return (
            <Redirect
              to={{
                state: { referrer: location },
                pathname: lastLocation && lastLocation.pathname && !(lastLocation.pathname === AUTH_PATH && isLoggedIn) ? lastLocation.pathname : path,
                search: lastLocation && lastLocation.search ? lastLocation.search : '',
              }}
              push
            />
          );
        }}
      />
    );
  }

  
  return (
    <Fragment>
      <Suspense fallback={<Loader />}>
          { !isLoggedIn ? (
            <Switch>
              <Route exact path={AUTH_PATH}>
                <AuthPage />
              </Route>
              {renderDefaultRedirect(AUTH_PATH)}
            </Switch>
          ) : (
            <Route path="/">
              <Header />
              <Switch>
                {enhanceRouter.map(item => {
                  const { type, path, ...attrs } = item;
                  const Component = type === 'redirect' ? Redirect : Route;
                  return (
                    <Component
                      key={path}
                      path={path}
                      {...attrs}
                    />
                  );
                })}
                {renderDefaultRedirect()}
              </Switch>
            </Route>
          )}
      </Suspense>
    </Fragment>
  );
}
