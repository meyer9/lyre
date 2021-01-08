import { ApolloServer } from 'apollo-server';
import { PlanetType, Resolvers, StarType } from '../graphql/generated';
import { importSchema } from 'graphql-import';
import glob from 'glob';
import path from 'path';

const typeDefs = importSchema(glob.sync(path.join(__dirname, "../graphql/**/*.graphqls")));

const STARS = [
  {
    name: 'Sun',
    type: StarType.MainSequence
  }
]

const PLANETS = [
  {
    name: 'Mercury',
    altitude: 58000000,
    type: PlanetType.Terrestrial,
    star: STARS[0]
  },
  {
    name: 'Venus',
    altitude: 108000000,
    type: PlanetType.Terrestrial,
    star: STARS[0]
  },
  {
    name: 'Earth',
    altitude: 149600000,
    type: PlanetType.Terrestrial,
    star: STARS[0]
  },
  {
    name: 'Mars',
    altitude: 228000000,
    type: PlanetType.Terrestrial,
    star: STARS[0]
  },
  {
    name: 'Jupiter',
    altitude: 778330000,
    type: PlanetType.GasGiant,
    star: STARS[0]
  },
  {
    name: 'Saturn',
    altitude: 1400000000,
    type: PlanetType.GasGiant,
    star: STARS[0]
  },
  {
    name: 'Uranus',
    altitude: 2870658000,
    type: PlanetType.IceGiant,
    star: STARS[0]
  }, // sorry pluto :(
]

const resolvers = {
  Query: {
    planets: () => PLANETS
  }
} as Resolvers

const server = new ApolloServer({ typeDefs, resolvers });

const port = process.env.PORT || 3000

server.listen(port).then(() => {
  console.log(`Listening on http://localhost:${port}/`);
})