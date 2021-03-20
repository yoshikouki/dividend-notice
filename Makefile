include .env

db:
	docker run  --rm -itd \
	--name db \
	-e POSTGRES_USER=$(POSTGRES_USER) \
	-e POSTGRES_PASSWORD=$(PGPASSWORD) \
	-p 5432:$(DB_PORT) \
	postgres
	npx prisma migrate dev --name init --preview-feature

db_stop:
	docker stop db

connect_db:
	PGPASSWORD=$(PGPASSWORD) psql -h localhost -p $(DB_PORT) -U $(POSTGRES_USER)
