import {format, createLogger, transports} from 'winston';
const {timestamp, combine, printf, colorize} = format

function buildDevLogger(){
    const myFormat = printf(({ level, message, timestamp }) => {
        return `${timestamp}  ${level}: ${message}`;
      });
    
    return createLogger({
        level: 'debug',
        format:  combine(
            // colorize(),
            timestamp({format:'DD-MM-YY HH:mm:ss'}),
            myFormat),
        transports: [new transports.Console(),
            new transports.File({filename:'EY_Loogerfile.log'})
        ]
    });
}

export default buildDevLogger;