// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlRoles:      'http://localhost:8000/api/roles',
  urlPlaces:     'http://localhost:8000/api/places',
  urlEntities:   'http://localhost:8000/api/entities',
  urlTurns:      'http://localhost:8000/api/turns',
  urlTurnStatus: 'http://localhost:8000/api/turnstatus',
  urlUsers:      'http://localhost:8000/api/users'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
