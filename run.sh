#!/bin/bash

executeScript() {
    x=$(echo -n $(openssl rand -hex 32))
    y=$(echo -n $x | sha256sum | head -c 64)
    echo -n $y > "/usr/src/app/secret-key"
    
    echo "|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|";
    echo "|@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|";
    echo "|                                                                 |";
    echo "|SECRET PASSKEY, please COPY and save it                          |";
    echo ""
    # echo -n $y > "/home/souvik/Work Space/projects/final-year/kubemate-backend/secret-key-1"
    echo $x
    echo ""
    echo "|                                                                 |";
    echo "|@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|";
    echo "|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|";
    echo ""
    # read -p 'Once copied, please press Enter ' value;
    # echo $value;

    pm2-runtime src/index.js
}

executeScript


