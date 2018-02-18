# MMM-kalliope

Module to bind [Kalliope](https://github.com/kalliope-project/kalliope) with your Magic Mirror.

## Installation

Clone this repo into `~/MagicMirror/modules` directory.

Configure your `~/MagicMirror/config/config.js`:

```js
{
    module: "MMM-kalliope",
    position: "upper_third",
    config: {
        title: "Kalliope"
    }
}
```

## Configuration option

| Option       | Default  | Description                                                                                                |
|--------------|----------|------------------------------------------------------------------------------------------------------------|
| max          | 5        | How many messages should be keept on the screen.                                                           |
| keep_seconds | 5        | Number of seconds received messages will stay displayed. If set to "0", then message will never be removed |
| title        | Kalliope | The name placed above received messages                                                                    |

## API usage

HTTP POST request example:
```
curl -H "Content-Type: application/json" -X POST -d '{"message":"test"}' http://localhost:8080/kalliope
```
