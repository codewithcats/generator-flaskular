# <%= appName %> #

## Prerequisites ##

- NodeJs
- Python 2.7 with pip installed

## Getting Start ##

`$ROOT` is application root directory.

```
$ cd $ROOT
$ pip install -r requirements.txt
$ grunt build
```

At this point, you should have javascript files in your `$ROOT/static/js` and css files in `$ROOT/static/css`.

## Start Flask server ##

You need to run server.py inside your app directory

```
$ cd $ROOT/{app-name}
$ python server.py
```