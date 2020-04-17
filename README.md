# Where's my courier

[![Santi](https://circleci.com/gh/santiripper/wheres-my-courier.svg?style=svg)](https://circleci.com/gh/santiripper/wheres-my-courier)

This is a demo service to find couriers.

## List of features

### Api

- Lookup couriers & filter by `capacity_required`
- Update couriers `max_capacity`

### Project

- Automatic migrations
- Dockerized
- Api functional tests

## Special Considerations

This is the first time I use the AdonisJS framework, i did to try something new (not a typical express project) as it uses a lot of design patterns & utils:
IoC, factories, dependency injection, service providers, active record, scaffolding, etc.

I've added typescript but the framework doesn't have definitions (just a few incomplete & outdated from a collaborator), they will fully support it on the new version, but is currently in alpha

## Important questions

**How do we run this API? Please provide the right amount of documentation in any format you prefer.**

Please see usage section below

**We plan to run this service in the AWS environment. Prepare this API to be deployed.**

The service is dockerized, so it can be uploaded to AWS Fargate cluster with the proper env config.
Another option could be to upload it to AWS Lambda behind an AWS API Gateway.

**If you were to have more time, what would you do? Briefly explain what could be improved**

- Decouple logic from controllers & create a repository/service to handle courier lookups & updates
- Unit tests
- Create a list of api endpoints to avoid hardcoded routes
- Document classes & functions
- Add swagger
- Namespace api versions
- Race conditions proof/tests
- Fully Typescript
- Courier capacities change log
- Add deploy job to CircleCI

**Come up with a smart and scalable output schema that is future-proof. Explain why you think it is so.**

The database schema is pretty simple, all in one table, but for real cases it would be better to have different tables for user data & delivery capacities.

The api responses uses transformers for giving control about the structure and make easy to add new versions of the api and changing the database model without affecting anything.

**How about race conditions? How would you avoid race conditions if a lookup is being executed and a capacity update comes?**

Some quick thoughts:

- By locking the row on the db while updating?
- By have a control column on the table that sets if it's enabled and set the status on/off while updating?
- By adding a where on the lookup query that filters `capacity_updated_at` is older the current time minus some safe value like 1 second?

## Usage

### Run service with docker

Start the service by running `docker-compose up` & visit http://127.0.0.1:3000

### Dev & Testing

Requires node v10

Copy the example .env file, this sets the ip, port & database driver `sqlite`

```bash
cp .env.example .env
```

Install the dependencies

```bash
npm install
```

Run migrations:

```bash
npx adonis migration:run
```

Populate sample data from seeders, it creates 30 couriers with capacities of 10, 25 & 35

```bash
npx adonis seed
```

Development server:

```bash
npx adonis serve --dev
```

Run tests:

```bash
npm run test
```

## Notes

## Authors or Acknowledgments

Written by Santiago Corrales

Thanks to:

- [AdonisJS](https://adonisjs.com)
- [Adonis Bumblebee](https://github.com/rhwilr/adonis-bumblebee)

## License

This project is licensed under the MIT License, but who cares
