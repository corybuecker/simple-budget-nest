import { migrator } from './migrator';

migrator
  .runAsCLI()
  .then((u) => {
    console.log(u);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
