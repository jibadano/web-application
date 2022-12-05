const fetch = require('node-fetch')

module.exports.deploy = ({ projectId, hookId }) =>
  fetch(`https://api.render.com/deploy/${projectId}?key=${hookId}`, {
    method: 'get'
  })
    .then((res) => res.status == 200)
    .catch(() => false)

module.exports.deployments = ({ token, projectId, moduleId }) =>
  fetch(`https://api.render.com/v1/services/${projectId}/deploys`, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((deployments = []) =>
      deployments.map(({ deploy }) => ({
        _id: deploy.id,
        service: 'render',
        status: {
          live: 'ok',
          created: 'info',
          build_in_progress: 'info',
          update_in_progress: 'info',
          canceled: 'warning',
          build_failed: 'error',
          update_failed: 'error',
          deactivated: ''
        }[deploy.status],
        moduleId,
        commit: { message: deploy.commit.message, _id: deploy.commit.id },
        createdAt: new Date(deploy.createdAt),
        finishedAt: new Date(deploy.finishedAt)
      }))
    )
    .catch(() => [])
