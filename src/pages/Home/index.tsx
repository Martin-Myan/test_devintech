import { useEffect, useState, type FC } from 'react'
import { isEmpty } from 'lodash'
import { format } from 'date-fns'

import { useAppDispatch, useAppSelector } from 'libraries/redux'
import { getForecastData, getWeatherData } from 'store/weather/actions'

import styles from './Home.module.scss'
import { Loader } from 'components'

const Home: FC = () => {
  const dispatch = useAppDispatch()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { forecastData, weatherData } = useAppSelector(state => state.weather)
  const [activeList, setActiveList] = useState<any>([])
  const [mergeDuplicateData, setMergeDuplicateData] = useState<any>([])

  const refactorDataReturn5days = forecastData?.data?.list?.map((item: any) => {
    return { ...item, dt_txt: format(item?.dt_txt, 'yyyy-MM-dd') }
  })

  const selectHandler = (e: string) => {
    const detectActiveList = forecastData?.data?.list?.filter((item: any) => {
      if (format(item?.dt_txt, 'yyyy-MM-dd') === e) {
        return item
      }
    })

    setActiveList(detectActiveList)
  }

  const renderTodayList = activeList?.map((item: any) => (
    <div key={`${item?.dt}-${item?.pop}`} className={styles.container__wrapper__today__list__item}>
      {item?.dt_txt} - {`${item?.main?.temp} C`}
    </div>
  ))

  const renderCards = mergeDuplicateData?.map((item: any) => (
    <div
      role='button'
      key={`${item?.dt}-${item?.pop}`}
      onClick={() => selectHandler(item?.dt_txt)}
      className={styles.container__wrapper_cards_item}
    >
      <p>{item?.main?.temp} C</p>
      <p>{format(item?.dt_txt, 'MM-dd')}</p>
    </div>
  ))

  const renderActiveTimeCelsius = activeList && activeList[0]

  useEffect(() => {
    if (!forecastData?.loading && refactorDataReturn5days && isEmpty(mergeDuplicateData)) {
      const mergedData = refactorDataReturn5days?.reduce((acc: any, obj: any) => {
        const { dt, dt_txt } = obj
        if (acc[dt_txt]) {
          acc[dt_txt].dt = Math.min(acc[dt_txt].dt, dt)
        } else {
          acc[dt_txt] = { ...obj }
        }

        return acc
      }, {})

      const detectActiveList = forecastData?.data?.list?.filter((item: any) => {
        if (format(item?.dt_txt, 'yyyy-MM-dd') === format(forecastData?.data?.list[0]?.dt_txt, 'yyyy-MM-dd')) {
          return item
        }
      })

      setActiveList(detectActiveList)
      setMergeDuplicateData(Object.values(mergedData))
    }
  }, [forecastData?.data?.list, forecastData?.loading, mergeDuplicateData, refactorDataReturn5days])

  useEffect(() => {
    dispatch(getWeatherData())
    dispatch(getForecastData())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section className={styles.container}>
      {!forecastData?.loading ? (
        <div className={styles.container__wrapper}>
          <div className={styles.container__wrapper__today}>
            <div className={styles.container__wrapper__today_city}>
              <p>{forecastData?.data?.city?.name} </p>
              <p>{renderActiveTimeCelsius?.main.temp} C</p>
            </div>
            <div className={styles.container__wrapper__today__list}>{renderTodayList}</div>
          </div>
          <div className={styles.container__wrapper_cards}>{renderCards}</div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  )
}

export default Home
