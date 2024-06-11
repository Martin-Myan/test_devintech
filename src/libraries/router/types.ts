import type { FC } from 'react'

export type TRoutePageType = {
  element: FC
  path: string
  title: string
}

export enum ERoutePaths {
  Home = '/',

  Error = '*',
}
