// Set utils function parseTime to filter
export { parseTime } from '@/utils'

// Filter for article status
export const articleStatusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}

export const driverLicenseStatusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    Valid: 'success',
    Invalid: 'danger'
  }
  return statusMap[status]
}

export const busStatusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    Active: 'success',
    Inactive: 'danger'
  }
  return statusMap[status]
}

// Filter to uppercase the first character
export const uppercaseFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
