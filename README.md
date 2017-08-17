
Hustlin is a project I created to let me know when there is a home baseball game happening. I get notifications every morning so I can plan my day around not using public transportation before, after, or during baseball games.

The repo contains the code for that JSON API and is powered by a Lambda function that reads from a DynamoDB table. The code for the front-end react app can be found at [bdougie/hustlin-react](https://github.com/bdougie/hustlin-react) and mobile app at [bdougie/HusslnMobile](https://github.com/bdougie/HusslnMobile). 

# AWS Node Scheduled Emails

This is an example of creating a function that runs as a cron job using the serverless `schedule` event. It retrieves weather information at 10am (UTC) and emails it to a predefined recipient. For more information on `schedule` event check out the Serverless docs on [schedule](https://serverless.com/framework/docs/providers/aws/events/schedule/).

## Cron syntax

```pseudo
cron(Minutes Hours Day-of-month Month Day-of-week Year)
```

All fields are required and time zone is UTC only.

| Field         | Values         | Wildcards     |
| ------------- |:--------------:|:-------------:|
| Minutes       | 0-59           | , - * /       |
| Hours         | 0-23           | , - * /       |
| Day-of-month  | 1-31           | , - * ? / L W |
| Month         | 1-12 or JAN-DEC| , - * /       |
| Day-of-week   | 1-7 or SUN-SAT | , - * ? / L # |
| Year          | 1970-2199      | , - * /       |

Read the [AWS cron expression syntax](http://docs.aws.amazon.com/lambda/latest/dg/tutorial-scheduled-events-schedule-expressions.html) docs for more info on how to setup cron

## Setup

### Postmark

Please visit https://postmarkapp.com to register for a free Postmark account.

### Configuration

Upon setting up access to both external services, you'll be required to update the environment variables in `serverless.yml`:

```
environment:
  RECIPIENT: brian@netlify.com
  POSTMARK_API_KEY: abc123
  POSTMARK_SENDER: hello@briandouglas.me
```

## Deploy

In order to deploy the you endpoint simply run

```bash
serverless deploy
```

The expected result should be similar to:

```bash
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading service .zip file to S3 (1.87 MB)...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
...........
Serverless: Stack update finished...
Serverless: Removing old service versions...
Service Information
service: scheduled-weather-example
stage: dev
region: us-east-1
api keys:
  None
endpoints:
  None
functions:
  email: arn:aws:lambda:us-east-1:219106525755:function:serverless-scheduled-hustlin
```

There is no additional step required. Your defined schedule becomes active right away after deployment.

## Usage

To test your function remotely:

```bash
sls invoke -f email  
```

The expected result should be similar to:

```json
{
  "success": true
}
```

