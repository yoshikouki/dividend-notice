include .env

init:
	docker-compose build

dev:
	docker-compose up -d
	$(MAKE) migrate
	$(MAKE) db_init
	docker-compose logs -f

stop:
	docker-compose down

migrate:
	docker-compose exec app npm run migrate

db_init:
	docker-compose exec app npm run db:init

restart:
	$(MAKE) stop
	$(MAKE) dev
