// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBxBJdog7UzL37CxrDbyJd12ioIFu7nFfU',
    authDomain: 'corporatings-demo.firebaseapp.com',
    databaseURL:
      'https://corporatings-demo-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'corporatings-demo',
    storageBucket: 'corporatings-demo.appspot.com',
    messagingSenderId: '344050137708',
    appId: '1:344050137708:web:6103e6e07b025ea170b649',
  },
  //server: 'https://api.dev.corporatings.com/',
  server: 'https://localhost:44366/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
