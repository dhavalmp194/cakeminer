import { useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import LoaderComponent from './components/LoaderComponent';
import MainContent from './components/MainContent';

function App() {
  const {loading} = useSelector(state => state.layout)
  return (
    <div className="App">
      <LoaderComponent loading={loading} />
      <Container>
        <Header />
        <MainContent />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
