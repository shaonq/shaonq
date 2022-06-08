import base from './utils/base'
import date from './utils/date'
import dialog from './utils/dialog'
import dom from './utils/dom'
import util from './utils/util'

import "./index.scss"
export default {
    ...base,
    dom,
    ...dialog,
    date,
    ...util,
}