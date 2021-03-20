include .env

db:
	docker run  --rm -itd \
	--name db \
	-e POSTGRES_USER=$(POSTGRES_USER) \
	-e POSTGRES_PASSWORD=$(PGPASSWORD) \
	-p 5432:$(DB_PORT) \
	postgres
	npm run db-migrate

db_stop:
	docker stop db

db_restart:
	@$(MAKE) db_stop
	@$(MAKE) db

db_connect:
	PGPASSWORD=$(PGPASSWORD) psql -h localhost -p $(DB_PORT) -U $(POSTGRES_USER)
