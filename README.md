![](./resources/fdc3.png)

# App Directory Demo Launcher aka Toolbar

This Toolbar, contributed by Tick42, connects to one or more FINOS FDC3 compatible application directories that implement the FDC3 App Directory REST API https://fdc3.finos.org/appd-spec. The Toolbar will show all the defined applications, and will attempt to launch applications that are defined by a supported Manifest type.

The Toolbar can also show a set of favourite applications as Icons in the main Toolbar. 

The Toolbar is primarily aimed at developers working with FINOS FDC3, it provides easy access to the application definitions and to the log files to allow developers to explore the services.

## Toolbar components 

The Toolbar is separated into two main components

### app 
The app component is a standalone Electron application. It also includes wrappers for the App Directory services.
It loads the Toolbar window with a URI that is stored in ```./toolbar-ui-angular/dist```. 

### toolbar-ui-angular
The toolbar-ui-angular component is the Toolbar window displayed by the Electron application. It is written with Angular 7. 
By default the Electron application starts the Toolbar window in file mode.

The Toolbar is currently aware of the following manifest types:
- 'org.finos.fdc3.demo' - covers browser/exe and therefore is platform/host independent
- 'org.finos.fdc3.demo.host' - covers platform/host specific applications


## Getting Started

### Prerequisites

You will need node.js & npm as well as a globally installed electron (npm i -g electron).

The project has dependencies that require Node 8.9 or higher, together with NPM 5.5.1 or higher.

### Steps to run project

- Clone the project

- run build-ui.bat
- run build-app.bat
- run start.bat

### Steps to run project manually

#### Build Toolbar Window (UI)

- ```cd``` to <project's root dir>/toolbar-ui-angular
- ```npm i```
- ```npm run build```

#### Install dependencies

- ```cd``` to the project's root dir
- ```npm i```

#### Run dev version

- ```npm run build```
- ```electron app-js/main.js```

#### Run prod version

- ```npm run package:all```
- Inside the release-builds folder locate the built version for your OS

## Description

### Application providers

The list Application providers aka (Application Directories) is defined in the Toolbar, using the Settings UI. 

Application provider details are held in local storage.

#### <a name="appd-poc-provider"></a> AppD PoC provider

In order to use the FDC3 Demo Toolbar, you need to have AppD services to connect to. If you do not have access to services, you can run your own instances using the [appd-poc](https://github.com/FDC3/appd-poc), a Java server. Steps to run:

- Clone the project

- Build the appd-poc

- Launch the appd-poc

- Register a user with the appd-poc

- Configure ```app/config/providers.config.ts``` with your e-mail and password for the appd-poc

- Inside of ```app/providers/appd-poc-apps``` you can find example application definitions that you can configure and provide to the appd-poc inside of ```json/apps```

- On Startup the Toolbar connects to all the configured application providers. The Toolbar can start applications with manifestType `org.finos.fdc3.demo` which is used to start non-FDC3 applications such as Desktop Executables and Browsers.

##### [org.finos.fdc3.demo](./app/apps/schemas/org.finos.fdc3.demo-manifest-schema.json)

Support for starting application of manifestType `org.finos.fdc3.demo.host` is scheduled for version 1.1 of the Toolbar. This can be viewed in the [FINOS Plexus Interop API examples](https://github.com/finos-plexus/finos-plexus.github.io/tree/master/demos/finos-fdc3/fdc3-toolbar) This manifestType is used for applications that are started via the FDC3 API.

##### [org.finos.fdc3.demo.host](./app/apps/schemas/org.finos.fdc3.demo.host-manifest-schema.json)

##### Other manifest types

The Toolbar can easily be extended to support more manifest types, by extending the code in ```app/apps/app.ts```.
