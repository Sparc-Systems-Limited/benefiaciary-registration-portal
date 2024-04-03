import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import { registerAccount, registerToken } from './TokenService';

//payment type
const paymentTypes = [
  { type: 'MSISDN', name: 'Mobile Number' },
  { type: 'ACCOUNT_NO', name: 'Account Number' },
  { type: 'EMAIL', name: 'Email' },
  { type: 'PERSONAL_ID', name: 'Personal ID' },
  { type: 'BUSINESS', name: 'Business' },
  { type: 'DEVICE', name: 'Device' },
  { type: 'ACCOUNT_ID', name: 'Account ID' },
  { type: 'IBAN', name: 'IBAN' },
  { type: 'ALIAS', name: 'Alias' }
];




const TokenRegistrationPage: React.FC = () => {
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [payeeId, setPayeeId] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState<boolean | null>(null);
  const [isGenerated, setIsGenerated] = useState<boolean | null>(null);
  const [accountPosted, setAccountPosted] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [idToken, setIdToken] = useState<string>('');
  const [isMatch, setIsMatch] = useState<boolean | null>(null);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const idTokenParam = urlParams.get('id_token');
    if (idTokenParam) {
      setIdToken(idTokenParam);
    }

/*
  //get parties
 const handleGetParties = async () => {
  try {
      const apiUrl = `http://192.168.1.55:3001/parties/MSISDN/tE0F0cbxGJ`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const { kycInformation }: ResponseData = await response.json();
      const kycData: KYCData = JSON.parse(kycInformation).data;
      console.log('Serialized KYC data:', kycData);

      // Compare KYC data after fetching
      compareKYCData(kycInfo, kycData);
    } catch (error) {
      console.error('An error occurred while fetching party details:', error);
      alert('Failed to fetch party details. Please try again later.');
    }
  };

  // Call the function to fetch KYC information when the component mounts
  handleGetParties();
*/
  }, []);

  const navigate = useNavigate();
  
  interface PaymentType {
    type: string;
    name: string;
  }
  
  
  interface KYCData {
    name: string;
    dob: string;
    gender: string;
    address: string;
    email: string;
    phone: string;
    nationality: string;
    passport_number: string;
    issue_date: string;
    expiry_date: string;
    bank_account_number: string;
    bank_name: string;
    employer: string;
    occupation: string;
    income: string;
    marital_status: string;
    dependents: number;
    risk_level: string;
  }
  
  interface ResponseData {
    kycInformation: string;
  }
  
  class KYCInformation {
    accessToken: string;
    idToken: string;
    tokenType: string;
    expiresIn: number;
    scope: string;
    sub: string;
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    address: string;
    // address: {
    //   streetAddress: string;
    //   city: string;
    //   state: string;
    //   postalCode: string;
    //   country: string;
    // };
    kycStatus: string;
    passportNumber: string;
    kycData: {
      idType: string;
      idNumber: string;
      idExpiration: string;
    };
  
    constructor(data: any) {
      this.accessToken = data.access_token;
      this.idToken = data.id_token;
      this.tokenType = data.token_type;
      this.expiresIn = data.expires_in;
      this.scope = data.scope;
      this.sub = data.user_info.sub;
      this.name = data.user_info.name;
      this.email = data.user_info.email;
      this.phoneNumber = data.user_info.phone_number;
      this.dateOfBirth = data.user_info.date_of_birth;
      this.address = data.user_info.address;
      this.passportNumber = data.user_info.passportNumber;
    //     this.address = {
    //     streetAddress: data.user_info.address.street_address,
    //     city: data.user_info.address.city,
    //     state: data.user_info.address.state,
    //     postalCode: data.user_info.address.postal_code,
    //     country: data.user_info.address.country
    //   };
      this.kycStatus = data.user_info.kyc_status;
      this.kycData = {
        idType: data.user_info.kyc_data.id_type,
        idNumber: data.user_info.kyc_data.id_number,
        idExpiration: data.user_info.kyc_data.id_expiration
      };
    }
  }
  
  // Assuming response contains the API response
  const responseData = {
    "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjIsImtleV9pZCI6IjEyMzQ1Njc4OTAifQ.QM1f2ZvWaV1US6P1wNBguzce7HAjmWzB2HsZVIkXwJeLEuBv2ZYvxsaYwTGnqFfVOVtD45Zp5_KZm98QR5AXEw",
    "id_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyNDI2MjIsImtleV9pZCI6IjEyMzQ1Njc4OTAifQ.QM1f2ZvWaV1US6P1wNBguzce7HAjmWzB2HsZVIkXwJeLEuBv2ZYvxsaYwTGnqFfVOVtD45Zp5_KZm98QR5AXEw",
    "token_type": "Bearer",
    "expires_in": 3600,
    "scope": "openid profile email",
    "user_info": {
      "sub": "1234567890",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone_number": "+1 555-123-4567",
      "date_of_birth": "1980-05-15",
      "passportNumber": "AB1234567",
      "address": "123 Main Street, Anytown, USA",
    //   "address": {
    //     "street_address": "123 Main Street, Anytown, USA",
    //     "city": "Anytown",
    //     "state": "CA",
    //     "postal_code": "12345",
    //     "country": "USA"
    //   },
      "kyc_status": "verified",
      "kyc_data": {
        "id_type": "passport",
        "id_number": "ABC123456",
        "id_expiration": "2025-12-31"
      }
    }
  };
  
  const kycInfo = new KYCInformation(responseData);
 
  
   // Comparison logic goes here
   const compareKYCData = useCallback(async(kycInfo: KYCInformation, kycData: KYCData, selectedPaymentType: string, payeeId: string) => {
    // Initialize a variable to store whether KYC data matches
    let match = true;
  
    // Compare relevant fields
    if (kycInfo.name !== kycData.name) {
      match = false;
      console.log('Name does not match');
    }
    if (kycInfo.dateOfBirth !== kycData.dob) {
      match = false;
      console.log('Date of Birth does not match');
    }
    if (kycInfo.email !== kycData.email) {
      match = false;
      console.log('Email does not match');
    }
    if (kycInfo.phoneNumber !== kycData.phone) {
      match = false;
      console.log('Phone Number does not match');
    }
    if (
      kycInfo.address !== kycData.address 
    //   kycInfo.address.streetAddress !== kycData.address ||
    //   kycInfo.address.city !== kycData.address ||
    //   kycInfo.address.state !== kycData.address ||
    //   kycInfo.address.postalCode !== kycData.address ||
    //   kycInfo.address.country !== kycData.address
    ) {
      match = false;
      console.log('Address does not match');
    }
    if (
      kycInfo.passportNumber !== kycData.passport_number
    //   kycInfo.kycData.idType !== 'passport' ||
    //   kycInfo.kycData.idNumber !== kycData.passport_number ||
    //   kycInfo.kycData.idExpiration !== kycData.expiry_date
    ) {
      match = false;
      console.log('KYC Data does not match');
    }
  
    // Log the result of comparison
    if (match) {
      console.log('KYC Data Matches');
      setIsMatch(true);


      
      //register token
    const token = await registerToken(selectedPaymentType, payeeId, kycInfo.accessToken);
    setLoading(false);
    setIsLoading(false);
    if (token) {
      setIsRegistered(true);
      setIsGenerated(true);
    } else {
      setIsRegistered(false);
      setIsGenerated(false);
      
    }

    const account = await registerAccount(selectedPaymentType, payeeId);
    setLoading(false);
    setIsLoading(false);
    if (token) {
      setAccountPosted(true);
    } else {
      setAccountPosted(false);
    }


      //await storeKYCInformationInRedis(kycInfo);
    } else {
      console.log('KYC Data Does Not Match');
      setIsMatch(false);
    }
  }, []);
  
  //get partines
const handleGetParties = async () => {
  try {
      const apiUrl = `http://localhost:3001/parties/${selectedPaymentType}/${payeeId}}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const { kycInformation }: ResponseData = await response.json();
      const kycData: KYCData = JSON.parse(kycInformation).data;
      console.log('Serialized KYC data:', kycData);

      // Compare KYC data after fetching
      compareKYCData(kycInfo, kycData, selectedPaymentType, payeeId);
    } catch (error) {
      console.error('An error occurred while fetching party details:', error);
    }
  };

  //handle form submition
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsLoading(true);
    await handleGetParties();
    setLoading(false);
    setIsLoading(false);
  };

  const handleRedirect = async () => {
    // Assuming userIdType and generatedToken are available
    const userIdType = selectedPaymentType;
    const generatedToken = 'token'; // Replace 'token' with the actual generated token

    // Construct the URL
    const redirectUrl = `http://localhost:3006/registered-beneficiaries?userIdType=${userIdType}&token=${generatedToken}`;
    

    // Send a GET request to the constructed URL
    try {
    
        // Redirect to the specified URL
        window.location.href = redirectUrl;
     
    } catch (error) {
      console.error('Error redirecting:', error);
    }
  };

  return (
    <div>
      <div style={{ margin: '1%' }}>
        <Header />
      
        <div className="w3-container w3-card-4">
          <h2>Token Registration</h2>
          <form className='w3-container w3-card w3-padding-16' onSubmit={handleSubmit}>
            <h4>Welcome <b>{kycInfo.name}</b>, Please select the payment type and number</h4>
            <div className='w3-padding-16'>
              <label htmlFor="paymentType">Payment Type:</label>
              <select className='w3-input w3-border w3-round w3-animate-input' style={{width:'30%'}} id="paymentType" value={selectedPaymentType} onChange={(e) => setSelectedPaymentType(e.target.value)}>
                <option value="">Select Payment Type</option>
                {paymentTypes.map(paymentType => (
                  <option key={paymentType.type} value={paymentType.type}>{paymentType.type}</option>
                ))}
              </select>
            </div>
            <div className='w3-padding-16'>
              <label htmlFor="payeeId">Payment Number:</label>
              <input className='w3-input w3-border w3-round w3-animate-input' style={{width:'30%'}} type="text" id="payeeId" value={payeeId} onChange={(e) => setPayeeId(e.target.value)} />
            </div>
            <button className='w3-btn w3-blue w3-padding-16' type="submit" disabled={!selectedPaymentType || !payeeId || loading}>
              {loading ? 'Loading...' : 'Register Token'}
            </button>
          </form>
        </div>
        <div className="w3-container w3-card-4">
          {isLoading && (
            <div className="w3-panel w3-yellow">
              <h3>Loading...</h3>
            </div>
          )}
           {isMatch === true && (
                
                <div className="w3-panel w3-green">
                  <h3>Success!</h3>
                  <p>KYC Data Matches</p>
                </div>

              )}
              {isMatch === false && (
              
                <div className="w3-panel w3-red">
                  <h3>Failure!</h3>
                  <p>KYC Data Doesn't Match, Check the information submited</p>
                </div>
                
              )}
              {isMatch === null && (
                <div className="w3-panel w3-yellow">
                  <h3>Waiting...</h3>
                  <p>Fill in the form and submit</p>
                </div>
              )}
          {isGenerated !== null && (
            <div className={`w3-panel ${isGenerated ? 'w3-green' : 'w3-red'}`}>
              <h3>{isGenerated ? 'Success!' : 'Failure!'}</h3>
              <p>{isGenerated ? 'Token Generated' : 'Token Not Generated'}</p>
            </div>
          )}
          {isRegistered !== null && (
            <div className={`w3-panel ${isRegistered ? 'w3-green' : 'w3-red'}`}>
              <h3>{isRegistered ? 'Success!' : 'Failure!'}</h3>
              <p>{isRegistered ? 'Token Registered' : 'Token Not Registered'}</p>
            </div>
          )}
          {accountPosted !== null && (
            <div className={`w3-panel ${accountPosted ? 'w3-green' : 'w3-red'}`}>
              <h3>{accountPosted ? 'Success!' : 'Failure!'}</h3>
              <p>{accountPosted ? 'Account posted' : 'Failed to post account'}</p>
            </div>
          )}
          {isGenerated && isRegistered && accountPosted && (
            <button className='w3-btn w3-blue w3-padding-16' onClick={handleRedirect}>
              Redirect
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenRegistrationPage;