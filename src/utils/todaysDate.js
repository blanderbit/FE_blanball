export default function useTodaysDate() {
  const data = new Date()
  const year = data.getFullYear()
  let month = data.getMonth() + 1
  let date = data.getDate()

  month = month < 10 ? '0' + month : month
  date = date < 10 ? '0' + date : date

  return `${year}-${month}-${date}`
}