import { create } from 'zustand'

export const WMO = {
  0:  { desc: 'CLEAR SKY',      type: 'sunny' },
  1:  { desc: 'MAINLY CLEAR',   type: 'sunny' },
  2:  { desc: 'PARTLY CLOUDY',  type: 'partlyCloudy' },
  3:  { desc: 'OVERCAST',       type: 'cloudy' },
  45: { desc: 'FOG',            type: 'cloudy' },
  48: { desc: 'ICING FOG',      type: 'cloudy' },
  51: { desc: 'LIGHT DRIZZLE',  type: 'rain' },
  53: { desc: 'DRIZZLE',        type: 'rain' },
  55: { desc: 'HEAVY DRIZZLE',  type: 'rain' },
  61: { desc: 'LIGHT RAIN',     type: 'rain' },
  63: { desc: 'RAIN',           type: 'rain' },
  65: { desc: 'HEAVY RAIN',     type: 'rain' },
  71: { desc: 'LIGHT SNOW',     type: 'snow' },
  73: { desc: 'SNOW',           type: 'snow' },
  75: { desc: 'HEAVY SNOW',     type: 'snow' },
  77: { desc: 'SNOW GRAINS',    type: 'snow' },
  80: { desc: 'RAIN SHOWER',    type: 'rain' },
  81: { desc: 'RAIN SHOWER',    type: 'rain' },
  82: { desc: 'RAIN SHOWER',    type: 'rain' },
  85: { desc: 'SNOW SHOWER',    type: 'snow' },
  86: { desc: 'SNOW SHOWER',    type: 'snow' },
  95: { desc: 'THUNDERSTORM',   type: 'storm' },
  96: { desc: 'THUNDERSTORM',   type: 'storm' },
  99: { desc: 'THUNDERSTORM',   type: 'storm' },
}

export function getWMO(code) {
  if (WMO[code]) return WMO[code]
  const keys = Object.keys(WMO).map(Number).sort((a, b) => b - a)
  const match = keys.find(k => k <= code)
  return WMO[match] || { desc: 'UNKNOWN', type: 'cloudy' }
}

export const useWeatherStore = create((set, get) => ({
  data: null,
  loading: false,
  error: null,
  lastFetched: null,

  fetchWeather: async () => {
    const { loading, lastFetched } = get()
    if (loading) return
    if (lastFetched && Date.now() - lastFetched < 600_000) return

    set({ loading: true, error: null })
    try {
      const pos = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 })
      )
      const { latitude: lat, longitude: lon } = pos.coords

      const [wRes, gRes] = await Promise.all([
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh`
        ),
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`,
          { headers: { 'User-Agent': 'BRUTA/OS WeatherApp/1.0' } }
        ),
      ])

      const wData = await wRes.json()
      const gData = await gRes.json()

      const location =
        gData.address?.city ||
        gData.address?.town ||
        gData.address?.village ||
        gData.address?.county ||
        gData.address?.country ||
        'UNKNOWN'

      set({
        data: {
          temp:        Math.round(wData.current.temperature_2m),
          humidity:    wData.current.relative_humidity_2m,
          windSpeed:   Math.round(wData.current.wind_speed_10m),
          weatherCode: wData.current.weather_code,
          location:    location.toUpperCase(),
        },
        loading: false,
        error: null,
        lastFetched: Date.now(),
      })
    } catch (e) {
      const msg = e.code === 1
        ? 'LOCATION DENIED'
        : e.code === 3
        ? 'LOCATION TIMEOUT'
        : 'FETCH FAILED'
      set({ loading: false, error: msg, lastFetched: null })
    }
  },

  refresh: () => {
    set({ lastFetched: null })
    get().fetchWeather()
  },
}))
