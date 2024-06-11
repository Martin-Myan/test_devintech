import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

import { ERoutePaths } from 'libraries/router/types'

import styles from './Error.module.scss'

const Error: FC = () => {
  const navigate = useNavigate()

  const changeToRealRouteHandler = () => {
    navigate(ERoutePaths.Home)
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.wrapper__title}>You don't have this route</h1>

      <button className={styles.wrapper__button} onClick={changeToRealRouteHandler}>
        Go to real route
      </button>
    </div>
  )
}

export default Error
