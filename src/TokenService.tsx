
const mojaloopUrl = "http://localhost"
//get user info from esignet

export const GetUserInfo = async (code: string, clientId: string, grant_type: string, redirect_uri: string): Promise<string | null> => {

  const apiUrl = 'http://192.168.1.55:3000/tokens';
  const requestBody = {
    clientId: clientId,
    code: code,
    grant_type: grant_type,
    redirect_uri: redirect_uri
  };

  try {
    //await axios.post(apiUrl, requestBody);

    console.log('requestBody', requestBody);
    const response = await fetch(apiUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  //  alert('The token has been registered');
    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Error registering token:', error);
    return null;
  }
};

//get parties
export const registerToken = async (idType: string, payeeId: string, idToken: string): Promise<string | null> => {
  const token = await generateRandomToken(idToken);

  console.log('Generated token:', token);

  const apiUrl = `https://pta-portal-mosippayee.devpm4ml.labspm4ml1002.mojaloop.live/tokens`;
  const requestBody = {
    payeeId: payeeId,
    payeeIdType: idType,
    paymentToken: token
  };

  try {
    //await axios.post(apiUrl, requestBody);

    console.log('requestBody', requestBody);
    const response = await fetch(apiUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  //  alert('The token has been registered');
    
    return token;

  } catch (error) {
    console.error('Error registering token:', error);
    return null;
  }
};


export const registerAccount = async (idType: string, payeeId: string): Promise<string | null> => {
  const apiUrl = `https://test-mosippayee.devpm4ml.labspm4ml1002.mojaloop.live/mlcon-outbound/accounts`;
  const requestBody = [
    {
      idType: "ALIAS",
      idValue: payeeId,
      currency: "ZMW"
    }
  ];

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    // No need for .json() here as it's a non-CORS request
    const responseData = await response.json();

    // Handle the response here
    console.log('Response Data:', responseData);

    // Assuming the response contains the modelId
    const modelId: string = responseData.modelId;

    // Return the generated token
    return modelId;

    if (response.ok) {
      // If response is successful, return a success message or relevant data
      return 'Account registered successfully.';
    } else {
      // If response is not successful, handle the error
      console.error('Error registering account. Status:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error registering account:', error);
    return null;
  }
};



const generateRandomToken = async (idToken: string) => {
  console.log('idToken:', idToken);
  const characters = idToken;
    const length = 10;
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    //temporary
    const tkn = 'CM101343JW9EWE24';
    return tkn;
};
