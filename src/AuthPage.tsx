import React, { useState, useEffect } from 'react';
import Header from './Header';

const AuthPage: React.FC = () => {

  const [payeeId, setpayeeId] = useState<string>('');


  useEffect(() => {
    const clientId = 'XaOVhjFTX_H8UiZf-O1TuV4ChixshdO8RqghtA_cRUM';

    const urlParams = new URLSearchParams(window.location.search);
    const payeeIdParam = urlParams.get('payeeId');
    if (payeeIdParam) {
      setpayeeId(payeeIdParam);
    }

    const redirectUrl = encodeURIComponent('http://localhost:3007');
    const url = `https://esignet.collab.mosip.net/authorize?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=openid%20profile&response_type=code`;
   // const esigneturl = `https://esignet.collab.mosip.net/authorize?nonce=ere973eieljznge2311&state=eree2311&client_id=WMX5pO6dYdCFR3iaVWGclVPNxTNSADDv-kV7VBcnzvY&redirect_uri=https://healthservices-esignet.collab.mosip.net/userprofile&scope=openid%20profile&response_type=code&acr_values=mosip:idp:acr:generated-code%20mosip:idp:acr:biometrics%20mosip:idp:acr:linked-wallet&claims=%7B%7D&claims_locales=en&display=page&state=consent&ui_locales=en-US`;
    const esigneturl = `https://esignet.collab1.mosip.net/authorize?nonce=ere973eieljznge2311&state=eree2311&client_id=${clientId}&redirect_uri=${redirectUrl}&scope=openid%20profile&response_type=code&acr_values=mosip:idp:acr:generated-code%20mosip:idp:acr:biometrics%20mosip:idp:acr:static-code&claims_locales=en&display=page&state=consent&max_age=21&ui_locales=en`;
    // Redirect the browser to the specified URL
    window.location.href = esigneturl;
  }, []);

  return (
    <div>
      <div style={{ margin: '1%' }}>
        <Header />
        <div className="w3-container w3-card-4 w3-panel w3-blue w3-center">
          <h2>Redirecting...</h2>
          <p>You will be redirected to the KYC authorization page.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
