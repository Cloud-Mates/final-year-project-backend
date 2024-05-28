#!/bin/bash

executeScript() {
    echo "\n|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|";
    echo "|@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|";
    echo "|                                                                 |";
    echo "|THIS SECRET PASSKEY IS ONE TIME VISIBLE, please COPY and save it |\n";
    x=$(echo -n $(openssl rand -hex 32))
    y=$(echo -n $x | sha256sum | head -c 64)
    # echo -n $x > "/usr/src/app/secret-key"
    echo -n $y > "/home/souvik/Work Space/projects/final-year/kubemate-backend/secret-key-1"
    echo $x
    echo ""
    echo "|                                                                 |";
    echo "|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|\n";
    read -p 'Once copied, please press Enter ' value;
    # echo $value;

    pm2-runtime src/index.js
}

executeScript


