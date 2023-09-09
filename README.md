App was created with [Ionic framework](https://ionicframework.com/) (Angular + Capacitor)

Used techonologies:

- Ionic 7 with Angular 16
- [@angular/fire](https://github.com/angular/angularfire)
- Capacitors plugins: Geolocation, Camera and [@ionic/storage-angular](https://github.com/ionic-team/ionic-storage)

- Firebase services: Authentication, Realtime Database, Firebase Storage (for images)

Angular project includes:

- 5 pages (main, login, tabs, current weather and history page)
- 2 components (popup, loader)
- 1 guard (auth guard for all not login routes)
- 10 services (auth, geolocation, image-store, data-store, local-storage, camera, validation, popup, date, weather)
- Ionic UI Components and Icons
- RxJS

For CI were used: Husky, Eslint, Prettier

Project is optimized for Web

Run project

Install Ionic CLI

```
npm install -g @ionic/cli
```

Install dependencies

```
npm i
```

Build project, copy and update

```
ionic capacitor sync
```

Open in the browser

```
npm run start
```

Future steps: optimize for Android or iOS and then:

Build project for Android and iOS

```
ionic capacitor build android
ionic capacitor build ios

```
Open IDE for(for pre-installed IDE)
```

ionic capacitor open android
ionic capacitor open ios

```

