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

I wrote a small node based transformer in the `transformer` folder for converting the data to the format requested. Currently it's usable but a tad narrow and doesn't provide any progress.

Currently also using es6 because it's good for future proofing and just looks way cleaner.

For a data layer, I used firebase. I am pretty certain for the amount of data, this isn't viable, but for the amount of time given it was what I knew best and could work with quickly. Though if FB can handle this amount of data, it could be a nice feature to pipe in data via sockets as trips became completed (just a thought).

#### Going forward
So I have quite a few things I wish could have done before I ran out of runway in terms of time. I already don't like the state created for filtered map points. It filters at the component level which I think it needs to filter at the state level.

__Features I was working on__
 - Showing number of points in fence
 - Making the fence draggable/resizable
 - Clicking on a marker and having it take you to the relevant drop point.
 - Clicking on a marker and having it show the date
 - Clicking on a marker and showing the time it took to drop off.

__Things I wish I could have gotten to but didn't even start.__
 - Better performance. The ui is fine here, but I worry about slower machines. I'm only displaying 300 of the possible millions of records that were in that data, so I can only imagine what kind of hit those give out.
 - Selecting different data sets (date ranges) and more data.
 - Implementing a css compiler
 - better es7 support (or any for that matter)
 - More ui polish.
 - A better button for drawing rectangles. The standard google one is pretty lame.
 - Ability to draw custom shapes. The pntinpoly function is pretty good at determining if it lives in a fence, but I only supported rects out of the box.
 - All of the extra credit.

 #### Closing thoughts
This is was a really fun project to work on and gave me a pretty good chance to mess around with Google Maps, particularly their drawing manager, which I have only used on occasion in the past. I spent a little too much time fleshing out the stack than I would have liked. This was my first time building a react/redux stack from the ground up (rather than use a boilerplate). In hindsight, using a boiler plate would have allowed for additional features to be completed, but I wanted to show an ability to manage a system from the bottom up.
