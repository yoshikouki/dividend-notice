include .env

init:
	docker-compose build

dev:
	docker-compose up -d
	@$(MAKE) migrate
	docker-compose logs -f

migrate:
	docker-compose exec app npm run migrate

stop:
	docker-compose stop

restart:
	@$(MAKE) stop
	@$(MAKE) dev
