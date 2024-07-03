
export const creageSession=()=>{
  
const query = `
mutation {
  checkoutCreate(input: {}) {
    checkout {
      id
      webUrl
    }
    checkoutUserErrors {
      code
      field
      message
    }
  }
}
`;

const variables = {};

fetch(`${import.meta.env.VITE_SHOPIFY_STORE_URL}/api/2024-04/graphql`, {
method: 'POST',
headers: {
  'Content-Type': 'application/json',
  'X-Shopify-Storefront-Access-Token': import.meta.env.VITE_STOREFRONT_ACCESS_TOKEN,
},
body: JSON.stringify({ query, variables }),
})
.then((response) => response.json())
.then((data) => {
  if (data.errors) {
    console.error('Error creating checkout:', data.errors);
    return;
  }
  const checkoutId = data.data.checkoutCreate.checkout.id;
  const checkoutUrl = data.data.checkoutCreate.checkout.webUrl;
  // if(!localStorage.getItem('checkoutID')){
    localStorage.setItem('checkoutID', checkoutId)
  // }
  // if(!localStorage.getItem('checkoutUrl')){
    localStorage.setItem('checkoutUrl', checkoutUrl)
  // }
  console.log('Created checkout ID:', checkoutId);
  console.log('Checkout URL:', checkoutUrl);
  // Save checkoutId and checkoutUrl as needed (e.g., in localStorage)
})
.catch((error) => {
  console.error('Error creating checkout:', error);
});

}