import { Container } from 'reactstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Modal from './components/Modal';
import NavBar from './components/NavBar';
import Tabs from './components/Tabs';

function App() {
  return (
    <div className="App">
      <Container>
        <Header />
        <MainContent />
        <Footer />
      </Container>
    </div>
  );
}

export default App;
