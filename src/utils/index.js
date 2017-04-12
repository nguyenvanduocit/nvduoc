let config = {
  dateFormat: '[Ngày] DD [tháng] MM [năm] YYYY',
  client_id: process.env.NODE_ENV === 'production' ? 52911 : 52914,
  blog: 'nguyenvanduocit.wordpress.com',
  blog_id: 27765739
}

let getJsonFromUrl = () => {
  let query = location.hash.substr(1)
  let result = {}
  query.split('&').forEach((part) => {
    let item = part.split('=')
    result[item[0]] = decodeURIComponent(item[1])
  })
  return result
}

export {
  config,
  getJsonFromUrl
}
