import _ from 'lodash'

import { split, toArray, equalsIgnoreCase } from './utils'
import environments from '../config/environments.json'

export const ENVIRONMENTS = environments

export const getEnvironment = id => environments.find(d => equalsIgnoreCase(d.id, id))

export const getRoute = (id, data) => toArray(data).find(d => equalsIgnoreCase(d.id, _.last(split(id, 'normal', '/')) || id))