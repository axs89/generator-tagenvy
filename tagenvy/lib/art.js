var chalk = require('chalk');

var art = module.exports;

// Welcome message
art.welcome =
'\n' +
'\n   _____           _____                  ' +
'\n  |_   _|_ _  __ _| ____|_ ____   ___   _ ' +
'\n    | |/ _` |/ _` |  _| | \'_ \\ \\ / / | | |' +
'\n    | | (_| | (_| | |___| | | \\ V /| |_| |' +
'\n    |_|\\__,_|\\__, |_____|_| |_|\\_/  \\__, |' +
'\n              |___/                  |___/' +
'\n\n';


art.h1 = function(title){
    console.log('\n' + '------------------------------------------------------------------');
    console.log(chalk.yellow(title));
    console.log('------------------------------------------------------------------' + '\n');
};

// Clear screen
art.clear = '\u001B[2J\u001B[0;0f'