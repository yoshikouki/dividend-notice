include .env

init:
	docker-compose build

dev:
	docker-compose up -d
	docker-compose exec app npm run migrate
	docker-compose logs -f

stop:
	docker-compose down

restart:
	@$(MAKE) stop
	@$(MAKE) dev
