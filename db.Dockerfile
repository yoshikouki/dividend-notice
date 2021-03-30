FROM postgres

RUN apt-get update && apt-get install -y \
  curl

RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
  && apt-get install -y nodejs

WORKDIR /app
COPY . .

RUN npm install -g npm && npm install
