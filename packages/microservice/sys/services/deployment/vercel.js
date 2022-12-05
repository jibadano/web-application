const fetch = require('node-fetch')

module.exports.deploy = ({ projectId, hookId }) =>
  fetch(
    `https://api.vercel.com/v1/integrations/deploy/${projectId}/${hookId}?buildCache=false`,
    {
      method: 'get'
    }
  )
    .then((res) => res.status == 200)
    .catch(() => false)

module.exports.deployments = ({ token, projectId, moduleId }) =>
  fetch(`https://api.vercel.com/v6/now/deployments?projectId=${projectId}`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((res) => res.deployments)
    .then((deployments = []) =>
      deployments.map((deploy) => ({
        _id: deploy.uid,
        url: deploy.url,
        service: 'vercel',
        status: {
          READY: 'ok',
          INITIALIZING: 'info',
          BUILDING: 'info',
          QUEUED: 'info',
          CANCELED: 'warning',
          ERROR: 'error'
        }[deploy.state],
        moduleId,
        commit: {
          message: deploy.meta.githubCommitMessage,
          _id: deploy.meta.githubCommitSha
        },
        createdAt: new Date(deploy.created),
        finishedAt: new Date(deploy.ready)
      }))
    )
    .catch((e) => {
      console.log(e)
      return []
    })
