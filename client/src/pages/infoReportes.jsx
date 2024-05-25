import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import './infoReportes.css';

const VerReportes = () => {
  // Información sobre rango de fechas de reporte
  const fechaInicio = localStorage.getItem('fechaInicio');
  const fechaFin = localStorage.getItem('fechaFin');
  const APIfetch = localStorage.getItem('reportAPI');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const API_BASE_URL = 'https://the-cozy-whiskers-api-vercel.vercel.app/';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      const url = `${API_BASE_URL}${APIfetch}`;
      const methodType = url.includes('report-server-efficiency-last-6-months') ? 'GET' : 'POST';
      const body =
        methodType === 'POST'
          ? JSON.stringify({
              fecha_inicio: fechaInicio,
              fecha_fin: fechaFin,
            })
          : null;

      try {
        const response = await fetch(url, {
          method: methodType,
          headers: { 'Content-Type': 'application/json' },
          body: body,
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const result = await response.json();
        if (result.data) {
          // Format data if specific API endpoint
          if (APIfetch.includes('report-average-dining-time')) {
            const formattedData = result.data.map((item) => ({
              ...item,
              tiempo_promedio: formatTime(item.tiempo_promedio),
            }));
            setData(formattedData);
          } else {
            setData(result.data);
          }
        }
      } catch (e) {
        setError(`Failed to fetch data: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [APIfetch, fechaInicio, fechaFin]);

  const formatTime = ({ minutes, seconds, milliseconds }) => {
    return `${minutes}m ${seconds}s ${milliseconds.toFixed(2)}ms`;
  };

  const DynamicTable = ({ data }) => {
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, index) => (
                <td key={index}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="ver__reporte">
      <div className="header__reporte">
        <h3>Reporte de The Cozy Whiskers</h3>
        <Link to={'/reportes'}>
          <button className="close-button">X</button>
        </Link>
      </div>
      <img src="/resources/mainlogo.png" alt="Logo" className="main__logo__reporte" />
      <div className="info__empresa__reporte">
        <p>The Cozy Whiskers S.A</p>
        <p>Nit: 456778-2</p>
        <p>6a. Avenida 8-28 zona 9</p>
      </div>

      <div className="fecha__emision">
        <p>
          <span>Rango de Fechas: </span>
          {fechaInicio} - {fechaFin}
        </p>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <DynamicTable data={data} />
      )}

      <div className="footer_queja">
        <p className="page__message">Your Second Home, with a Feline Twist</p>
      </div>
    </div>
  );
};

const VerReporteAdmin = ({ action }) => {
  return <div>{action === 'verReporte' && <VerReportes />}</div>;
};

export default VerReporteAdmin;
