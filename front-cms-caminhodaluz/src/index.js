import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Se você quiser começar a medir o desempenho em sua aplicação, passe uma função
// para logar os resultados (por exemplo: reportWebVitals(console.log))
// ou envie para um serviço de análise de desempenho.
reportWebVitals();
