import List  from './pages/pet/List'
import { Provider } from './pages/pet/Provider'

function App() {
  return (
    <Provider>
      <div className="App">
        <List />
      </div>
    </Provider>
  );
}

export default App;



