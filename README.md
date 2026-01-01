# Important Notices

This was initial version for creating a react frontend for my CV site that was running on django backend. 

This version is no longer maintained, evolved version now resides as part of my [Kulku solution](https://github.com/arawnik/Kulku/tree/main/src/Kulku.Web/kulku.web.client).

This was a [React](https://react.dev) (with [Next.js](https://nextjs.org) framework) app version for my CV frontend.

# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/en) (developed with v22.15.0)

## Testing locally

1. Install dependencies: `npm install`
2. Run the development server: `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) with your browser

## Using Docker

0. Install [Docker](https://www.docker.com/) on your machine
1. Build your container: `docker build -t jela-react .`
    1. With build variables `docker build --build-arg NEXT_PUBLIC_API_BASE_URL=http://localhost:8083/api -t jela-react .`
2. Run your container: `docker run -p 3000:3000 jela-react`

### Developing

Prettier

```bash
npx prettier . --write
npx prettier . --check
```
