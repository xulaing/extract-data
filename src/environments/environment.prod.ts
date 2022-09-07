export const environment = {
  production: true,
  firebase: {
      apiKey: "${FIREBASE_APIKEY}",
      authDomain: "${FIREBASE_AUTHDOMAIN}",
      databaseURL: "${FIREBASE_DATABASEURL}",
      projectId: "${FIREBASE_PROJECTID}",
      storageBucket: "${FIREBASE_STORAGEBUCKET}",
      messagingSenderId: "${FIREBASE_MESSAGINGSENDERID}",
      appId: "${FIREBASE_APPID}"
  },
  server: "${API_ENDPOINT}",
};