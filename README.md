# Docker Compose Port Mapping Manager
#### Video Demo: https://youtu.be/eeYDFllO8u0
#### Description:

simply add or remove port mapping options via command line on docker compose yaml file. somtimes in devops process and bash scripts, you wanna enable or disable service published ports, this tool help us to achieve this purpose.

Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. To learn more about all the features of Compose, see the list of features.

## Installation

you should have nodejs+npm installed environment, then you can install this package globaly via npm package manager

```bash
npm -g install docker-compose-port-mapping-manager
```

## Usage
simple, fast and expressive command line options!

note that, default input file is *docker-compose.yml* and default output file is *docker-compose.overwrite.yml* file. you can change them with ``--input`` and ``--output`` options.

```bash

docker-compose-port-mapping-manager --delete {port-mapping} --from {service-name}

docekr-compose-port-mapping-manager --add {port-mapping} --to {service-name}
```

if we combine two commands above together, for example we want to add port 8080 mapping to 80 of nginx and remove existing 80:80 mapping, run command below:
```bash

docker-compose-port-mapping-manager --delete 80:80 --from nginx --add 8080:80 --to nginx
```

## See Help

```bash
docker-compose-port-mapping-manager --help

adding or removing ports from docker compose yaml file via command line

Usage 
  $ docker-compose-port-mapping-manager <input> 

  Options 
  --input, -i  base docker compose yaml file (default: docker-compose.yml) 
  --output, -o  target docker compose yaml file (default: docker-compose.override.yml) 
  --delete, -D  delete ports action 
  --add, -A  add ports mapping action 
  --to-service, --to  selected service to add ports mapping option 
  --from-service, --from  selected service to delete ports mapping option 

  Example: 
  remove 80->80 port mapping and add 8080->80 as a replacement to nginx service 
  $ docker-compose-port-mapping-manager --delete 80:80 --from nginx --add 8080:80 --to nginx
```

that's all, i hope you enjoy this project
contribution is open for all

## License
```
<!--
 Copyright 2021 Sadegh Mohebbi
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->
```

