class Log {
    blue(str: string | any) {
        console.log(`\x1b[34m${str}\x1b[0m`);
    }
    green(str: string | any) {
        console.log(`\x1b[32m${str}\x1b[0m`);
    }
    error(str: string) {
        console.log(`[\x1b[31m Error \x1b[0m]:\x1b[31m ${str}\x1b[0m`);
    }
}

export default new Log;
