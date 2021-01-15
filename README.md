# Docker Compose Port Mapping Manager
simply add or remove port mapping options via command line on docker compose yaml file

## Installation

you should have device nodejs+npm installed

```bash
npm -g install docker-compose-port-mapping-manager
```

## Usage

if you want to add port 8080 mapping to 80 of nginx and remove existing 80:80 mapping, run command below
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

