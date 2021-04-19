// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sitekey: '6LfCGR4aAAAAAHT6DmKV1pSW4ITStbYp-FRRDfTe',
  apis: {
    myback: {
      baseurl: 'http://localhost:3000/api',
      endpoints: {
        usuarios: '/usuarios',
        login: '/auth/login',
        validar: '/auth/validar',
        crearTarea: '/tareas/add',
        obtenerTareas: '/tareas'
      }
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
