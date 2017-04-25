.PHONY: docker-build
# Filenames
REPOSITORY_NAME := backend
DOCKER_REGISTRY_NAME_ADDRESS := 095122161940.dkr.ecr.ap-southeast-2.amazonaws.com
AWS_REGION := ap-southeast-2
TAG_NAME = latest

docker-build:
	$(shell aws ecr get-login --region $(AWS_REGION) --profile $(AWS_CONFIG_PROFILE))
	docker build -t $(REPOSITORY_NAME):$(TAG_NAME) .
	docker tag $(REPOSITORY_NAME):$(TAG_NAME) $(DOCKER_REGISTRY_NAME_ADDRESS)/$(REPOSITORY_NAME):$(TAG_NAME)

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
