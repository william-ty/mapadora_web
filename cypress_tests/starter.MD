Add the projectId to your cypress.json file:
{
  "projectId": "xoeohg"
  // The rest of the Cypress config options go here...
}

Run this command with your record key from your terminal or in CI:
$ npx cypress run --record --key 6e085db6-8383-4791-840c-6853edeb5f2b

Optimize your tests in CI by following these guides:
https://docs.cypress.io/guides/continuous-integration/gitlab-ci