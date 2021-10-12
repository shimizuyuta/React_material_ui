import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import {ThemeProvider,createTheme} from '@material-ui/core'


const theme = createTheme({
  palette:{
    primary:{
      main:"#fefefe"
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#010',
    },
    typography:{
      fontFamily:'Quicksand',
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Notes />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
        </Switch>
    </Router>
    </ThemeProvider>

  );
}

export default App;
