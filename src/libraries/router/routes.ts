import { lazy } from 'react'

import { ERoutePaths, type TRoutePageType } from './types'

const Error = lazy(() => import('pages/Error'))
const Home = lazy(() => import('pages/Home'))

const routesList: TRoutePageType[] = [
  {
    element: Home,
    path: ERoutePaths.Home,
    title: 'Home',
  },
  {
    element: Error,
    path: ERoutePaths.Error,
    title: 'Error',
  },
]

export default routesList
