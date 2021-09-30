import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import LoaderComponent from './components/LoaderComponent';
import MainContent from './components/MainContent';

import 'react-toastify/dist/ReactToastify.css';
function App() {
  const {loading} = useSelector(state => state.layout)
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
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
