import { PxFolder, PxGlobe, PxRadio, PxGrid4 } from '../components/ui/PixelIcons'

import Explorer   from '../apps/Explorer/Explorer'
import ChromeApp  from '../apps/Chrome/Chrome'
import RadioApp   from '../apps/Radio/Radio'
import Projects   from '../apps/Projects/Projects'

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
}
