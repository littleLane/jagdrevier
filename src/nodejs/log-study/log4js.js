const log4js = require('log4js')

// log4js 支持 6 种错误日志等级
// trace(蓝色)、debug(青色)、info(绿色)、warn(黄色)、error(红色)、fatal(粉色)
const logLevels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'culog']

const customLog = {};

logLevels.forEach((level) => {
  const logger = log4js.getLogger()
  console.log(level)

  if (logger[level]) {
    customLog[level] = function(...rest) {
      // 针对一个 logger 只能设置一次
      logger.level = level
      logger[level](...rest)
    }
  }
});

// test case =>
customLog.trace('test log1')
customLog.debug('test log2')
customLog.info('test log3')
customLog.warn('test log4')
customLog.error('test log5')
customLog.fatal('test log6')
customLog.culog('test log7')


// log4js.configure({
//   appenders: {
//     cheese: {
//       type: 'file',
//       filename: `${__dirname}/logs/cheese.log`
//     },
//     cheese1: {
//       type: 'file',
//       filename: `${__dirname}/logs/cheese1.log`
//     }
//   },
//   categories: {
//     default: {
//       appenders: ['cheese', 'cheese1'],
//       level: 'error'
//     }
//   }
// })

// const logger = log4js.getLogger('logger')
// logger.error('test log5')