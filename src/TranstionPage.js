
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TranstionPage = () => {
  const [transtiondata, settranstionData] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('6 months');
  const location = useLocation();
  const navigate = useNavigate();
  const dynamicId1 = location.state.Id;
  const dynamicToken1 = location.state.Token;

  useEffect(() => {
    const fetchPackageDetails = async () => {
      settranstionData(null);
      try {
        const response = await fetch('https://test.e-prathibha.com/apis/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            server_key: '3w99V63pW7tJ7vavGXtCKo8cp',
            Id: dynamicId1,
            tokenu: dynamicToken1,
          },
        });

        const getdata = await response.json();
        console.log(getdata);

        if (getdata.status === 200) {
          console.log(getdata.data);
          settranstionData(getdata.data);
        } else {
          console.error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (dynamicId1 && dynamicToken1) {
      fetchPackageDetails();
    }
  }, [dynamicId1, dynamicToken1]);

  return (
    <div className="package-details-container">
      {transtiondata && transtiondata.length > 0 && (
        <div className="result">
          <div>
            <h3>Premium: {transtiondata[0]?.Package[0]?.name}</h3>
            <h3>Amount: {transtiondata[0]?.Package[0]?.amount}</h3>
            <h3>PaymentId: {transtiondata[0]?.Package[0]?.id}</h3>
            <h3>Amount: {transtiondata[0]?.Payment?.created}</h3>
            <h3>Created: {transtiondata[0]?.Payment?.payments_from}</h3>
            <hr />
            <h3>Premium: {transtiondata[0]?.Package[0]?.name}</h3>
            <h3>Amount: {transtiondata[1]?.Package[0]?.amount}</h3>
            <h3>Created: {transtiondata[1]?.Payment?.created}</h3>
            <h3>AmountFrom: {transtiondata[1]?.Payment?.payments_from}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranstionPage;
