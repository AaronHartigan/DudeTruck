## Getting Started

### Requirements
  * [Node.js](https://nodejs.org/) (LTS version is fine)
  * [git](https://git-scm.com/downloads)

### Directory Layout

```
.
├── /build/                     # The folder for compiled output
├── /docs/                      # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /public/                    # Static files which are copied into the /build/public folder
├── /src/                       # The source code of the application
│   ├── /components/            # React components
│   ├── /data/                  # GraphQL server schema and data models
│   ├── /routes/                # Page/screen components along with the routing information
│   ├── /client.js              # Client-side startup script
│   ├── /config.js              # Global application settings
│   ├── /server.js              # Server-side startup script
│   └── ...                     # Other core framework modules
├── /test/                      # Unit and end-to-end tests
├── /tools/                     # Build automation scripts and utilities
│   ├── /lib/                   # Library for utility snippets
│   ├── /build.js               # Builds the project from source to output (build) folder
│   ├── /bundle.js              # Bundles the web resources into package(s) through Webpack
│   ├── /clean.js               # Cleans up the output (build) folder
│   ├── /copy.js                # Copies static files to output (build) folder
│   ├── /deploy.js              # Deploys your web application
│   ├── /postcss.config.js      # Configuration for transforming styles with PostCSS plugins
│   ├── /run.js                 # Helper function for running build automation tasks
│   ├── /runServer.js           # Launches (or restarts) Node.js server
│   ├── /start.js               # Launches the development web server with "live reload"
│   └── /webpack.config.js      # Configurations for client-side and server-side bundles
└── package.json                # The list of 3rd party libraries and utilities
```

### Quick Start

#### 1. Get the latest version

You can start by cloning the latest version of DudeTruck on your local machine.

```shell
$ git clone https://github.com/AaronHartigan/DudeTruck
```

#### 2. Run `npm install`

This will install both run-time project dependencies and developer tools listed
in [package.json](https://github.com/AaronHartigan/DudeTruck/blob/master/package.json) file.

#### 3. Run `npm start`

This command will build the app from the source files (`/src`) into the output
`/build` folder. As soon as the initial build completes, the app will automatically
open in your browser.

### How to Test

To launch unit tests:

```shell
$ npm run test          # Run unit tests with Mocha
```

Note: no tests currently exist.

### How to Update

If you need to keep your project up to date with the recent changes made,
you can always fetch and merge them from [this repo](https://github.com/AaronHartigan/DudeTruck)
back into your own project by running:

```shell
$ git pull
```

### How to Make Changes

After editing files, run this command to add all the changes:

```shell
$ git add -A
```

Then record the changes:

```shell
$ git commit -m "Description of changes"
```

NOTE: The project is setup to run a linter before accepting commits.
This means your code must contain no errors and use proper syntax.
This project follows the [Airbnb](https://github.com/airbnb/javascript/blob/master/README.md) style guide.

Finally, upload your changes to the github repository.

```shell
$ git push
```

NOTE: If you edited files that someone else has edited, you will get a merge conflict.
You need to manually go into each conflicted file, and choose which changes
to keep. After fixing the conflicts, commit and push again.
