## Fencing
Fetches data from a database full of markers and displays it on a map.

To develop, ensure you have node > 6, npm > 3
install deps
```
npm i
```
developing (mainly for hot reloading):
```
npm run dev
```

running just the app (just a small koa server).
```
npm start
```

#### Philosphy and decisions made:
Stack is built on redux/react/immutable. This is my favorite stack at the moment and allows for a purely functional approach to creating an application. I used webpack to allow for faster development with hot loading and it's extensibility. I added some middleware to redux to pass firebase instances around as well as slight changes for starting/finishing promises.

I wrote a small node based transformer in the `transformer` folder for converting the data to the format requested. Currently it's usable but a tad narrow and doens't provide any progress.

Currently also using es6 because it's good for future proofing and just looks way cleaner.

For a data layer, I used firebase. I am almost 100% certain for the amount of data, this isn't viable, but for the amount of time given it was what I knew best and could work with quickly.
