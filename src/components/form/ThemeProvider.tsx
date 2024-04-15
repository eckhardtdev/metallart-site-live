import mt from '@material-tailwind/react'
const { ThemeProvider: MTThemeProvider } = mt

export function ThemeProvider({ children }) {
  return <MTThemeProvider>{children}</MTThemeProvider>
}

export default ThemeProvider
