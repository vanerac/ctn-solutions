FROM node:lts-alpine as install

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

COPY apps/api/package.json ./apps/api/package.json

RUN npm install -w apps/api

FROM install as build

WORKDIR /app

COPY apps/api ./apps/api
#COPY libs ./libs

RUN npm run build -w apps/api

FROM install as release

WORKDIR /app

COPY --from=build /app/apps/api/dist/src ./apps/api/dist
#COPY --from=build /app/libs ./libs
COPY --from=build /app/apps/api/tsconfig.build.json ./apps/api/tsconfig.build.json

CMD ["npm", "run", "start:prod", "-w", "apps/api"]
