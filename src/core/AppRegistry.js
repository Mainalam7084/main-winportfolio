import { PxFolder, PxGlobe, PxRadio, PxGrid4, PxUser, PxMail } from '../components/ui/PixelIcons'

import Explorer   from '../apps/Explorer/Explorer'
import ChromeApp  from '../apps/Chrome/Chrome'
import RadioApp   from '../apps/Radio/Radio'
import Projects   from '../apps/Projects/Projects'
import About      from '../apps/About/About'
import Contact    from '../apps/Contact/Contact'

export const AppRegistry = {
  explorer: {
    id: 'explorer',
    title: 'File Explorer',
    icon: PxFolder,
    component: Explorer,
    defaultSize: { width: 820, height: 580 },
    defaultPosition: { x: 100, y: 80 },
  },
  chrome: {
    id: 'chrome',
    title: 'Chrome',
    icon: PxGlobe,
    component: ChromeApp,
    defaultSize: { width: 1024, height: 768 },
    defaultPosition: { x: 50, y: 40 },
  },
  radio: {
    id: 'radio',
    title: 'Radio',
    icon: PxRadio,
    component: RadioApp,
    defaultSize: { width: 400, height: 560 },
    defaultPosition: { x: 200, y: 80 },
  },
  projects: {
    id: 'projects',
    title: 'Projects',
    icon: PxGrid4,
    component: Projects,
    defaultSize: { width: 860, height: 580 },
    defaultPosition: { x: 80, y: 60 },
  },
  about: {
    id: 'about',
    title: 'About',
    icon: PxUser,
    component: About,
    defaultSize: { width: 520, height: 560 },
    defaultPosition: { x: 160, y: 80 },
  },
  contact: {
    id: 'contact',
    title: 'Contact',
    icon: PxMail,
    component: Contact,
    defaultSize: { width: 520, height: 540 },
    defaultPosition: { x: 200, y: 100 },
  },
}
