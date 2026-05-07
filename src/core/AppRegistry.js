import { PxFolder, PxGlobe, PxRadio, PxGrid4, PxUser, PxMail, PxCamera, PxGamepad, PxCalculator, PxCloud } from '../components/ui/PixelIcons'

import Explorer    from '../apps/Explorer/Explorer'
import ChromeApp   from '../apps/Chrome/Chrome'
import RadioApp    from '../apps/Radio/Radio'
import Projects    from '../apps/Projects/Projects'
import About       from '../apps/About/About'
import Contact     from '../apps/Contact/Contact'
import Gallery     from '../apps/Gallery/Gallery'
import Games       from '../apps/Games/Games'
import Snake       from '../apps/Games/Snake/Snake'
import FloppyBird  from '../apps/Games/FloppyBird/FloppyBird'
import Calculator  from '../apps/Calculator/Calculator'
import Weather     from '../apps/Weather/Weather'

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
  gallery: {
    id: 'gallery',
    title: 'Gallery',
    icon: PxCamera,
    component: Gallery,
    defaultSize: { width: 860, height: 600 },
    defaultPosition: { x: 120, y: 70 },
  },
  games: {
    id: 'games',
    title: 'Games',
    icon: PxGamepad,
    component: Games,
    defaultSize: { width: 640, height: 440 },
    defaultPosition: { x: 140, y: 80 },
  },
  snake: {
    id: 'snake',
    title: 'Snake',
    icon: PxGamepad,
    component: Snake,
    defaultSize: { width: 480, height: 560 },
    defaultPosition: { x: 180, y: 60 },
  },
  floppybird: {
    id: 'floppybird',
    title: 'Floppy Bird',
    icon: PxGamepad,
    component: FloppyBird,
    defaultSize: { width: 460, height: 640 },
    defaultPosition: { x: 200, y: 40 },
  },
  calculator: {
    id: 'calculator',
    title: 'Calculator',
    icon: PxCalculator,
    component: Calculator,
    defaultSize: { width: 360, height: 560 },
    defaultPosition: { x: 240, y: 80 },
  },
  weather: {
    id: 'weather',
    title: 'Weather',
    icon: PxCloud,
    component: Weather,
    defaultSize: { width: 400, height: 520 },
    defaultPosition: { x: 220, y: 80 },
  },
}
