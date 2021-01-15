#!/usr/bin/env node
'use strict';

/**
 * Cli interface Region
 */

const meow = require('meow')

const helpMessage = 'Usage \n \
$ docker-compose-port-mapping-manager <input> \n \
\n \
Options \n \
--input, -i  base docker compose yaml file (default: docker-compose.yml) \n \
--output, -o  target docker compose yaml file (default: docker-compose.overwrite.yml) \n \
--delete, -D  delete ports action \n \
--add, -A  add ports mapping action \n \
--to-service, -to  selected service to add ports mapping option \n \
--from-service, -from  selected service to delete ports mapping option \n \
\n \
Example: \n \
remove 80->80 port mapping and add 8080->80 as a replacement to nginx service \n \
$ docker-compose-port-mapping-manager --delete 80:80 --from nginx --add 8080:80 --to nginx\n'

const cli = meow(helpMessage, {
  flags: {
    input: {
      type: 'string',
      alias: 'i',
    },
    output: {
      type: 'string',
      alias: 'o'
    },
    delete: {
      type: 'string',
      alias: 'D',
      isMultiple: true
    },
    add: {
      type: 'string',
      alias: 'A',
      isMultiple: true
    },
    toService: {
      type: 'string',
      alias: 'to',
      isMultiple: true
    },
    fromService: {
      type: 'string',
      alias: 'from',
      isMultiple: true
    }
  }
})

/**
 * Logic Region
 */
const fs = require('fs')
const yaml = require('yaml')
const path = require('path')
const chalk = require('chalk')
const Action = require('../action-class')
const _ = require('lodash')

const log = function(title, desc) {
  console.log(title + '\n' + desc)
}

cli.flags.input = cli.flags.input || 'docker-compose.yml'
cli.flags.output = cli.flags.output || 'docker-compose.overwrite.yml'

const inputFilePath = path.resolve(cli.flags.input)
const outputFilePath = path.resolve(cli.flags.output)

if (!fs.existsSync(inputFilePath)) {
  throw new Error('Invalid Input, no input file found at path: '+inputFilePath.toString())
}

log(chalk.greenBright('reading input file'), 'output file: '+chalk.grey(inputFilePath.toString()))
const inputFileData = fs.readFileSync(inputFilePath, { encoding: 'utf8' })

const parsedYamlInput = yaml.parse(inputFileData)

const loadedActions = Action.loadActionsFromCli(cli.flags)

let finish = loadedActions.length

if (Array.isArray(loadedActions) && loadedActions.length == 0) {
  console.log(chalk.redBright('No Actions Specified!'))
  process.exit(0)
}

loadedActions.forEach(function (action) {
  log(chalk.cyanBright('do action'), action.toHumanizedString())
  if (action.isValid(parsedYamlInput)) {
    let service = parsedYamlInput.services[action.getService()]
    if (action.isAdd()) {
      if (Array.isArray(service.ports)) {
        service.ports.push(action.getPortMapping())
      } else {
        service.ports = [ action.getPortMapping() ]
      }
    } else if (action.isDelete()) {
      if (Array.isArray(service.ports)) {
        _.remove(service.ports, function (portMap) { return portMap == action.getPortMapping() })

        if (service.ports.length == 0) {
          //clear empty ports directive
          delete service.ports
        }
      }
    }
    parsedYamlInput.services[action.getService()] = JSON.parse(JSON.stringify(service))

    finish--
    if (finish == 0) {
      log(chalk.greenBright('write modified yaml data to output file'), 'output file: '+outputFilePath.toString())
      const outputFileData = yaml.stringify(parsedYamlInput)
      fs.writeFileSync(outputFilePath, outputFileData, { encoding: 'utf8' })

      console.log(chalk.greenBright.bold('Congratulations, It is done'))
      console.log(chalk.greenBright.bold('---------------------------'))
      console.log(chalk.yellowBright('NOTE:')+' to see effect, run docker-compose up -d -f '+cli.flags.output)
    }
  }
})
