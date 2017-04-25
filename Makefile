.PHONY: docker-login docker-compose docker-down

npm-i: 
	- npm i
	- cd server && npm i 
	- cd client && npm i

docker-compose: export APP_ENV:=development
docker-compose: export DOCKER_REGISTRY_NAME_ADDRESS:=$(DOCKER_REGISTRY_NAME_ADDRESS)
docker-compose:
	${INFO} "docker-compose..."
	docker-compose build
	docker-compose up
	
docker-down:
	- docker stop $$(docker ps -a -q)
	- docker rm $$(docker ps -aq)
	- docker volume rm $$(docker volume ls -f dangling=true)
	- docker rmi -f $$(docker images -f dangling=true)

# Cosmetics
YELLOW := "\e[1;33m"
NC := "\e[0m"

# Shell Functions
INFO := @bash -c '\
	printf $(YELLOW); \
	echo "=> $$1"; \
	printf $(NC)' SOME_VALUE
