// Copyright 2021 Sadegh Mohebbi
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const _ = require('lodash')

module.exports = class ActionClass {
  constructor(action, portMapping, service) {
    this.action = action,
    this.portMapping = portMapping
    this.service = service
  }

  getAction() {
    return this.action
  }

  isDelete() {
    return this.action == 'delete'
  }

  isAdd() {
    return this.action == 'add'
  }

  getPortMapping() {
    return this.portMapping
  }

  getService() {
    return this.service
  }

  static loadActionsFromCli(cliFlags) {
    // cliFlags structure example:
    // {
    //   "delete": [
    //     "80:80"
    //   ],
    //   "fromService": [
    //     "nginx"
    //   ],
    //   "add": [
    //     "8080:80"
    //   ],
    //   "toService": [
    //     "nginx"
    //   ]
    // }
    let result = []
    for (let n = 0; n < cliFlags.delete.length; n++) {
      const deleteElement = cliFlags.delete[n]
      result.push(new ActionClass('delete', deleteElement, cliFlags.fromService[n]))
    }
    for (let m = 0; m < cliFlags.add.length; m++) {
      const addElement = cliFlags.add[m]
      result.push(new ActionClass('add', addElement, cliFlags.toService[m]))
    }
    return result
  }

  toHumanizedString() {
    return `${this.action} port mapping ${this.portMapping} ${(this.action == 'delete') ? 'from' : 'to'} ${this.service}`
  }

  isValid(yamlObj) {
    const services = _.keys(yamlObj.services)
    if (!services.includes(this.service)) {
      throw new Error('Invalid Service, not found service: '+this.service)
    }
    if (!['delete', 'add'].includes(this.action)) {
      throw new Error('Invalid Action, got: '+this.action)
    }
    return true
  }
}