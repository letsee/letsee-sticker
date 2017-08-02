FROM node

ENV NODE_ENV production
ENV PORT 3000

RUN mkdir -p /usr/src/app
COPY . /usr/src/app

WORKDIR /usr/src/app

# RUN yarn add webpack dotenv-webpack html-webpack-plugin extract-text-webpack-plugin babel-loader
# RUN yarn install

RUN yarn run build:staging

EXPOSE 3000
CMD [ "yarn", "start" ]
# CMD "./yarn.sh"

