import image from './assets/0-floor.png';
import svgOverlay from './assets/0-floor.svg';

function App() {
  return (
    <>
      <img style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: '#272727',
        objectFit: 'cover'
      }} src={image} />
      <img style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }} src={svgOverlay} />
    </>
  )
}

export default App
