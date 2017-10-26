/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import isEmail from 'validator/lib/isEmail';
import validPassword from './core/validPassword';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import router from './router';
import models, { User } from './data/models';
import schema from './data/schema';
import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import configureStore from './store/configureStore';
import config from './config';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: true,
    getToken: req => req.cookies.id_token,
  }).unless({
    path: config.publicRoutes,
  }),
);

app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
  }),
);

// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.id_token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('id_token');
    res.redirect('/login');
  } else if (err.name === 'UnauthorizedError') {
    res.redirect('/login');
  }
  next(err);
});

app.get('/logout', (req, res) => {
  res.clearCookie('id_token');
  res.redirect('/login');
});

if (__DEV__) {
  app.enable('trust proxy');
}

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const failureUrl = `/login?email=${email}`;
  const successUrl = '/search';
  const errors = [];

  try {
    const user = await User.find({
      where: {
        email,
      },
    });

    if (!user || !user.validPassword(password)) {
      errors.push('Invalid email or password');
      return res.redirect(`${failureUrl}&errors=${JSON.stringify(errors)}`);
    }

    const expiresIn = 60 * 60 * 24 * 365; // 1 year
    const token = jwt.sign({ id: user.id }, config.auth.jwt.secret, {
      expiresIn,
    });
    res.cookie('id_token', token, {
      maxAge: 1000 * expiresIn,
      httpOnly: true,
    });

    return res.redirect(`${successUrl}`);
  } catch (err) {
    errors.push('Unable to connect to database');
    console.log(err); // eslint-disable-line no-console

    return res.redirect(`${failureUrl}&errors=${JSON.stringify(errors)}`);
  }
});

app.post('/register', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const verifyPassword = req.body.verifyPassword;
  const type = req.body.type;
  const failureUrl = `/register?email=${email}`;
  const successUrl = `/login?email=${email}`;
  const errors = [];

  if (!isEmail(email)) {
    errors.push('Invalid email address');
  }
  if (!validPassword(password)) {
    errors.push('Invalid password');
  }
  if (!(password === verifyPassword)) {
    errors.push('Password fields did not match');
  }
  if (errors.length === 0) {
    try {
      const user = await User.create({
        email,
        password,
        type,
      });

      if (!user) {
        errors.push('Unable to connect to database');
      }
    } catch (err) {
      errors.push('Email address already exists');
      // database error
      console.log(err); // eslint-disable-line no-console
    }
  }
  if (errors.length > 0) {
    return res.redirect(`${failureUrl}&errors=${JSON.stringify(errors)}`);
  }
  return res.redirect(`${successUrl}`);
});

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use(
  '/graphql',
  expressGraphQL(req => ({
    schema,
    graphiql: __DEV__,
    rootValue: { request: req },
    pretty: __DEV__,
  })),
);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    const initialState = {
      user: req.user || null,
    };

    const store = configureStore(initialState, {
      fetch,
      history: null,
    });

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      // Enables critical path CSS rendering
      // https://github.com/kriasoft/isomorphic-style-loader
      insertCss: (...styles) => {
        // eslint-disable-next-line no-underscore-dangle
        styles.forEach(style => css.add(style._getCss()));
      },
      // Universal HTTP client
      fetch: createFetch(fetch, {
        baseUrl: config.api.serverUrl,
        cookie: req.headers.cookie,
      }),
      store,
      storeSubscription: null,
    };

    const route = await router.resolve({
      ...context,
      store,
      path: req.path,
      query: req.query,
      user: req.user || null,
    });

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const data = { ...route };
    data.children = ReactDOM.renderToString(
      <App context={context} store={store}>
        {route.component}
      </App>,
    );
    data.styles = [{ id: 'css', cssText: [...css].join('') }];
    data.scripts = [assets.vendor.js];
    if (route.chunks) {
      data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
    }
    data.scripts.push(assets.client.js);
    data.app = {
      apiUrl: config.api.clientUrl,
      state: context.store.getState(),
    };

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(route.status || 200);
    res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch(err => console.error(err.stack));
if (!module.hot) {
  promise.then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
  module.hot.accept('./router');
}

export default app;
