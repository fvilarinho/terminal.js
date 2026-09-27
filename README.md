# terminal.js

A lightweight, dependency-free browser terminal emulator that animates commands being typed and their output being rendered — like an interactive terminal recording, but driven entirely by data. It includes an ANSI escape-code parser that converts colored/styled terminal output into HTML.

## Features

- **Typing animation** — commands and output appear character by character, with a blinking cursor and configurable speed.
- **ANSI → HTML rendering** — supports 256-color foreground/background (`38;5;n` / `48;5;n`) and text styles: bold, dim, italic, underline, and strikethrough.
- **Login flow simulation** — model a full session including a `login:` / `Password:` prompt and a dynamic, timestamped shell prompt (PS1).
- **Data-driven** — the whole session is described declaratively as a list of command objects; no code changes needed to change the scene.
- **Zero dependencies** — plain HTML, CSS, and vanilla JavaScript. Just open `index.html`.

## Getting Started

No build step or package manager is required.

1. Clone or download the project.
2. Open `index.html` in a browser.

For local development, any static file server also works, for example:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project Structure

```
terminal.js/
├── index.html        # Page markup and script includes
├── css/
│   ├── style.css     # Page and terminal layout/theme
│   └── ansi.css      # ANSI 256-color palette classes
├── js/
│   ├── ansi.js       # ANSI escape-code → HTML converter
│   ├── home.js       # The COMMANDS session data (the "script")
│   └── terminal.js   # Animation engine, prompt builder, main loop
└── images/
    └── favicon.png
```

The scripts must load in order: `ansi.js`, then `home.js`, then `terminal.js` (as declared in `index.html`).

## Configuration

Terminal behavior is configured at the top of `js/terminal.js`:

| Property                        | Description                          | Default        |
| ------------------------------- | ------------------------------------ | -------------- |
| `terminal.hostname`             | Hostname shown in the prompt         | `myhost`       |
| `terminal.os`                   | OS name shown at login               | `my linux`     |
| `terminal.version`              | Version string shown at login        | `1.2.3`        |
| `terminal.typeSpeed`            | Delay between characters (ms)         | `50`           |
| `terminal.delayBetweenCommands` | Pause between commands (ms)          | `1000`         |

## Defining the Session

The session is defined by the `COMMANDS` array in `js/home.js`. Each entry is a command object:

```js
const COMMANDS = [
    {
        "executable": "fortune | cowsay -n",  // command text that gets "typed"
        "authenticated": true,                 // true = shell prompt, false = login flow
        "baseDir": "",                         // directory appended to the prompt path
        "output": [                            // lines printed after the command
            "line one",
            "\e[38;5;87m\e[1mcolored line\e[0m"  // ANSI escapes are supported
        ]
    }
];
```

Field notes:

- `authenticated: false` renders the login sequence — the first such entry shows the OS banner and `login:` prompt, subsequent ones show `Password:`.
- `authenticated: true` renders the timestamped shell prompt, optionally including `baseDir` in the path.
- `pwned: true` switches the prompt to a bare `> `.
- `output` is an array of strings; ANSI escape sequences (written with `\e[`) are converted to styled HTML.

## ANSI Support

`ansi2Html()` in `js/ansi.js` translates escape sequences into HTML `<span>` elements. Colors map to classes defined in `css/ansi.css`; styles are applied inline:

| Sequence      | Effect              |
| ------------- | ------------------- |
| `\e[38;5;Nm`  | Foreground color N  |
| `\e[48;5;Nm`  | Background color N  |
| `\e[1m`       | Bold                |
| `\e[2m`       | Dim                 |
| `\e[3m`       | Italic              |
| `\e[4m`       | Underline           |
| `\e[9m`       | Strikethrough       |
| `\e[0m`       | Reset all styles    |

## Credits

Based on original work by Dave Eddy (`dave@daveeddy.com`), modified by Felipe Vilarinho (`me@vila.net.br`).

## License

Licensed under the [Apache License, Version 2.0](LICENSE).
