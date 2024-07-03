const SHOPIFY_STORE_URL = import.meta.env.VITE_SHOPIFY_STORE_URL;
const STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_STOREFRONT_ACCESS_TOKEN;

interface ShopifyResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

interface ProductNode {
  id: string;
}

interface ProductsResponse {
  products: {
    edges: { node: ProductNode }[];
  };
}

interface MetafieldNode {
  namespace: string;
  key: string;
  value: string;
}

interface MetafieldEdge {
  node: MetafieldNode;
}

async function fetchShopify<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const response = await fetch(`${SHOPIFY_STORE_URL}/api/2024-04/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json: ShopifyResponse<T> = await response.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }
  return json.data!;
}

export async function getProducts(): Promise<ProductNode[]> {
  const query = `
    query {
      products(first: 250) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;
  const data = await fetchShopify<ProductsResponse>(query);
  return data.products.edges.map(edge => edge.node);
}


interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
}

interface ProductImage {
  src: string;
  mediaType:'IMAGE' | 'VIDEO'
}

interface ProductDetailsNode {
  id: string;
  title: string;
  descriptionHtml: string;
  availableForSale: boolean;
  media: {
    edges: ProductImage[];
  };
  variants: {
    edges: { node: ProductVariant }[];
  };
  metafields: Metafield[];
}

interface Metafield {
  namespace: string;
  key: string;
  value: string;
}

interface ProductResponse {
  product: ProductDetailsNode;
}

export async function getProductDetails(productId: string): Promise<ProductDetailsNode> {
  const query = `
    query ($id: ID!) {
      product(id: $id) {
        id
        title
        descriptionHtml
        media(first: 10) {
          edges {
            node {
              mediaContentType
              alt
              ... on MediaImage {
                image {
                  src
                }
              }
              ... on Video {
                sources {
                  url
                  format
                }
              }
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
        metafields(identifiers: [
          { namespace: "custom", key: "video_url" }
        ]) {
          namespace
          key
          value
        }
      }
    }
  `;
  const variables = { id: productId };
  const data = await fetchShopify<ProductResponse>(query, variables);
  return data.product;
}

export const fetchFAQData = async () => {
  const response = await fetch(`${SHOPIFY_STORE_URL}/api/2023-04/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': `${STOREFRONT_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query: `
        {
          shop {
            metafield(namespace: "faq", key: "faq_data") {
              value
            }
          }
        }
      `,
    }),
  });
  const { data } = await response.json();
  return JSON.parse(data.shop.metafield?data.shop.metafield.value:null);
};


type Checkout = {
  id: string;
  webUrl:string;
  lineItems: {
    edges: {
      node: {
        title: string;
        quantity: number;
        variant: {
          id: string;
          priceV2: {
            amount: string;
          };
        };
      };
    }[];
  };
};

type AddProductToCheckoutResponse = {
  data: {
    checkoutLineItemsAdd: {
      checkout: Checkout;
    };
  };
};
 
export const addProductToCheckout = async (
  checkoutId: string,
  variantId: string,
  quantity: number
): Promise<Checkout> => {
  const query = `
    mutation($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
      checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
        checkout {
          id
          webUrl
          lineItems(first: 250) {
            edges {
              node {
                title
                quantity
                variant {
                  id
                  priceV2 {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    checkoutId,
    lineItems: [
      {
        variantId,
        quantity,
      },
    ],
  };

  const response = await fetch(`${SHOPIFY_STORE_URL}/api/2024-04/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': `${STOREFRONT_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),

  });

  const data: AddProductToCheckoutResponse = await response.json();
  localStorage.setItem('checkoutUrl',data.data.checkoutLineItemsAdd.checkout.webUrl)
  
  return data.data.checkoutLineItemsAdd.checkout;
};



