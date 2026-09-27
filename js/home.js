const now = new Date();

const COMMANDS = [
    {
        "executable": "me",
        "authenticated": false,
        "output": []
    },
    {
        "executable": "*******",
        "authenticated": false,
        "output": [
            "\nThe programs included with this GNU/Linux system are free software; the exact distribution terms for each program are described in the individual files in /usr/share/doc/*/copyright.\n",
            "GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent permitted by applicable law.\n",
            "\nLast login: " + now.toDateString() + " " + now.toLocaleTimeString() + " on tty1\n",
        ]
    },
    {
        "executable": "fortune | cowsay -n",
        "authenticated": true,
        "baseDir": "",
        "output": [
            "",
            '  --------------------------------',
            ' /       \e[38;5;87m\e[1mWELCOME TO VILANET\e[0m       \\',
            '|                                  |',
            '|  Mind tricks don´t work on me!   |',
            '|    May the force be with you!    |',
            '|                                  |',
            '|  \e[38;97m\e[1mClick on the files/directories\e[0m  |',
            ' \\          \e[38;97m\e[1mto navigate!\e[0m          /',
            '  --------------------------------',
            '        \\   ^__^',
            '         \\  (oo)\\_______',
            '            (__)\\       )\\/\\',
            '                ||----w |',
            '                ||     ||\n'
        ]
    }
];