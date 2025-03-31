exports.handler = async function(event, context) {
  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: 'Method Not Allowed'
      };
    }

    // Parse the form data
    const formData = new URLSearchParams(event.body);
    const password = formData.get('password');

    // If no password was provided, redirect to the main page
    if (!password) {
      return {
        statusCode: 302,
        headers: {
          'Location': '/'
        },
        body: 'Redirecting...'
      };
    }

    // Get the password links from environment variable
    const passwordLinksJson = process.env.PASSWORD_LINKS_JSON;
    
    if (!passwordLinksJson) {
      console.error('PASSWORD_LINKS_JSON environment variable is not set');
      return {
        statusCode: 500,
        body: 'Server configuration error'
      };
    }

    // Parse the JSON
    let passwordLinks;
    try {
      passwordLinks = JSON.parse(passwordLinksJson);
    } catch (error) {
      console.error('Failed to parse PASSWORD_LINKS_JSON:', error);
      return {
        statusCode: 500,
        body: 'Server configuration error'
      };
    }

    // Find a matching password
    const match = passwordLinks.find(entry => entry.pwd === password);

    if (match && match.link) {
      // Redirect to the Zoom link if there's a match
      return {
        statusCode: 302,
        headers: {
          'Location': match.link
        },
        body: 'Redirecting to Zoom...'
      };
    } else {
      // Redirect to the error page if there's no match
      return {
        statusCode: 302,
        headers: {
          'Location': '/error.html'
        },
        body: 'Password not found. Redirecting...'
      };
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error'
    };
  }
};
