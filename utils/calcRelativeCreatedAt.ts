import { DateTime } from 'luxon'
export function calcRelativeCreatedAt(createdAt: string | number): string {
  // Can be memoized so this function isn't called on each render

  if (typeof createdAt === 'string') createdAt = parseFloat(createdAt)

  const created = DateTime.fromMillis(createdAt)
  const now = DateTime.now()
  const ts = now
    .diff(created, [
      'seconds',
      'minutes',
      'hours',
      'days',
      'weeks',
      'months',
      'years',
    ])
    .toObject()
  const { seconds, minutes, hours, days, weeks, months, years } = ts

  if (years) {
    return years.toString() + (years > 1 ? ' years ago' : ' year ago')
  }

  if (months) {
    return months.toString() + (months > 1 ? ' months ago' : ' month ago')
  }

  if (weeks) {
    return weeks.toString() + (weeks > 1 ? ' weeks ago' : ' week ago')
  }

  if (days) {
    return days.toString() + (days > 1 ? ' days ago' : ' day ago')
  }

  if (hours) {
    return hours.toString() + (hours > 1 ? ' hours ago' : ' hour ago')
  }

  if (minutes) {
    return minutes.toString() + (minutes > 1 ? ' minutes ago' : ' minute ago')
  }

  if (seconds && seconds >= 1) {
    return (
      seconds.toFixed().toString() +
      (seconds > 1 ? ' seconds ago' : ' second ago')
    )
  }

  return 'just now'
}
