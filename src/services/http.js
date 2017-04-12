import axios from 'axios'
import {config} from '../utils'

export default axios.create({
  baseURL: 'https://public-api.wordpress.com/rest/v1.1/sites/' + config.blog_id + '/'
})
