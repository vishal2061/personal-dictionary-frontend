import './App.css';
import { CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core';
import WordList from './components/WordList';
import AddWord from './components/add-word/AddWord';
import SearchWord from './components/search/Search-component';

function App() {
  return (
    <div className="App">
      <>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" >
              My Dictionary
            </Typography>
            <SearchWord />
          </Toolbar>
        </AppBar>
      </>
      <main>
        <WordList />
        <AddWord />
      </main>
    </div>
  );
}

export default App;
