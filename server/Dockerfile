FROM mhart/alpine-node:6

# docker mantainer
MAINTAINER Ali Fathieh

RUN mkdir /src

# Add package.json and npm install to use docker cache for speedy build
ADD package.json /src/package.json
RUN cd /src && npm install

ADD . /src
WORKDIR /src

EXPOSE 3000

CMD npm start
