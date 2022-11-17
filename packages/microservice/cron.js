const fetch = require('node-fetch')

const normalizeJob = (job) => {
  job.enabled = Boolean(job.enabled)
  job.requestMethod = job.requestMethod || 0
  job.saveResponses = Boolean(job.saveResponses)
  job.requestTimeout = job.requestTimeout || 30
  job.schedule.hours = job.schedule.hours || [-1]
  job.schedule.wdays = job.schedule.wdays || [-1]
  job.schedule.minutes = job.schedule.minutes || [-1]
  job.schedule.mdays = job.schedule.mdays || [-1]
  job.schedule.months = job.schedule.months || [-1]

  return job
}

const compareSchedule = (aJob, bJob, time) =>
  bJob.schedule[time].toString() == aJob.schedule[time].toString()

const equals = (aJob, bJob) => {
  if (aJob.title != bJob.title) return false
  if (aJob.enabled != bJob.enabled) return false
  if (aJob.url != bJob.url) return false
  if (aJob.requestMethod != bJob.requestMethod) return false
  if (aJob.saveResponses != bJob.saveResponses) return false
  if (aJob.requestTimeout != bJob.requestTimeout) return false

  if (!compareSchedule(aJob, bJob, 'hours')) return false
  if (!compareSchedule(aJob, bJob, 'mdays')) return false
  if (!compareSchedule(aJob, bJob, 'minutes')) return false
  if (!compareSchedule(aJob, bJob, 'months')) return false
  if (!compareSchedule(aJob, bJob, 'wdays')) return false

  return true
}

module.exports = class Cron {
  constructor({ config }) {
    this.baseUrl = 'https://api.cron-job.org'
    this.apiKey = config.get('cron.apiKey')
    this.jobs = config.get('cron.jobs') || []
  }

  init = async () => {
    if (!this.apiKey || !this.jobs || !this.jobs.length) return

    const jobs = await this.getJobs()
    this.jobs.forEach(async (newJob) => {
      newJob = normalizeJob(newJob)
      const oldJob = jobs.find(({ title }) => title == newJob.title)

      if (!oldJob) return this.createJob(newJob)
      if (!equals(oldJob, newJob)) return this.updateJob(oldJob.jobId, newJob)
    })
  }

  report = () => {
    if (this.errorReport) return `❗️ - ${this.errorReport}`
    if (!this.jobs || !this.jobs.length) return '❎ - Not configured'

    return `✅ - ${this.jobs.map(({ title }) => title)}`
  }

  getJobs = () =>
    fetch(this.baseUrl + '/jobs', {
      method: 'get',
      headers: {
        Authorization: 'Bearer ' + this.apiKey
      }
    })
      .then((res) => res.json())
      .then((res) => (res && res.jobs) || [])
      .catch((e) => {
        this.errorReport = e.message
        return []
      })

  createJob = (job) =>
    fetch(this.baseUrl + '/jobs', {
      method: 'put',
      headers: {
        Authorization: 'Bearer ' + this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ job })
    })
      .then((res) => res.json())
      .then(console.log)
      .catch((e) => {
        this.errorReport = e.message
        return -1
      })

  updateJob = (id, job) =>
    fetch(this.baseUrl + '/jobs/' + id, {
      method: 'patch',
      headers: {
        Authorization: 'Bearer ' + this.apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ job })
    })
      .then((res) => res.json())
      .catch((e) => {
        this.errorReport = e.message
        return -1
      })
}
