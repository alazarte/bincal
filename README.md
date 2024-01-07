# bincal

Binary calendar to keep track of habits, made only for educational purposes.

## Usage

```
# install requirements
$ npm install

# run the program
$ node index.js
```

Open a browser and go to `localhost:8081`

## Usage without server

For that there's `web/localStorageScript.js`, it uses the local storage to keep
track of the data. I prefer having an API so I can save a local JSON file,
harder to lose I think.

To use this, in `web/index.html` replace:

```
    <script src="script.js"></script>
```

with:

```
    <script src="localStorageScript.js"></script>
```

And only open `web/index.html` in a browser, no need to run any API.
