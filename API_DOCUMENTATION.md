# PLU Exporter API Documentation

## Base URL

```
/api
```

## Endpoints

### GET `/data`

Returns complete menu data from Google Sheets.

**Parameters:** None

**Authentication:** None (optional TOTP secret can be configured)

**Response:**

```typescript
interface MenuResponse {
  values: Menu[]
}

interface Menu {
  group: Group
  products: Product[]
}

interface Group {
  name: string
  description: string
  pre: string
  post: string
  page: number
  language: string | null
}

interface Product {
  plu: number | null
  group: string
  name: string
  image: string
  allergies: string
  details: string
  description: string
  size: string
  price: string
  page: number | null
  language: string | null
}
```

**Example Response:**

```json
{
  "values": [
    {
      "group": {
        "name": "Starters",
        "description": "Delicious appetizers to begin your meal",
        "pre": "",
        "post": "All starters are meant to be shared",
        "page": 1,
        "language": "en"
      },
      "products": [
        {
          "plu": 1001,
          "group": "Starters",
          "name": "Bruschetta",
          "image": "bruschetta.jpg",
          "allergies": "Gluten, Garlic",
          "details": "Tomato, basil, garlic on toasted bread",
          "description": "Classic Italian appetizer with fresh ingredients",
          "size": "Small",
          "price": "$8.99",
          "page": 1,
          "language": "en"
        },
        {
          "plu": 1002,
          "group": "Starters",
          "name": "Calamari",
          "image": "calamari.jpg",
          "allergies": "Gluten, Shellfish",
          "details": "Fried squid with lemon aioli",
          "description": "Crispy squid served with our signature sauce",
          "size": "Medium",
          "price": "$12.99",
          "page": 1,
          "language": "en"
        }
      ]
    },
    {
      "group": {
        "name": "Main Courses",
        "description": "Our chef's specialties",
        "pre": "All main courses include a side salad",
        "post": "Ask about our daily specials",
        "page": 2,
        "language": "en"
      },
      "products": [
        {
          "plu": 2001,
          "group": "Main Courses",
          "name": "Grilled Salmon",
          "image": "salmon.jpg",
          "allergies": "Fish",
          "details": "With seasonal vegetables and mashed potatoes",
          "description": "Fresh Atlantic salmon grilled to perfection",
          "size": "Large",
          "price": "$24.99",
          "page": 2,
          "language": "en"
        }
      ]
    }
  ]
}
```

**Status Codes:**

- `200 OK`: Success
- `500 Internal Server Error`: Error fetching data from Google Sheets

## Error Handling

The API follows standard HTTP status codes:

- `200 OK`: Request successful
- `400 Bad Request`: Invalid parameters
- `401 Unauthorized`: Missing or invalid authentication
- `404 Not Found`: Endpoint not found
- `500 Internal Server Error`: Server error

## Rate Limiting

No explicit rate limiting is implemented. Google Sheets API has its own limits:

- 100 requests per 100 seconds per project
- 500 requests per 100 seconds per user

## Caching

Responses are not currently cached. For production use, consider:

1. Adding caching headers
2. Implementing Redis caching
3. Using a CDN for static responses

## Authentication

Optional TOTP secret can be configured via `TOTP_SECRET` environment variable. If set, clients should include the secret in request headers.

## Versioning

Current API version: `v1` (implied in path)

## Changelog

### v1.0.0 (Current)

- Initial release
- Basic menu data endpoint
- Google Sheets integration
- Multi-language support

## Examples

### cURL

```bash
curl -X GET https://your-domain.com/api/data
```

### JavaScript (Fetch API)

```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### JavaScript (Axios)

```javascript
axios.get('/api/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

## Data Source

All data is fetched from Google Sheets using the Google Sheets API v4. The sheet structure must match the expected format as documented in the main README.

## Performance

- Average response time: 200-500ms (depends on Google Sheets API)
- Response size: Typically 5-50KB depending on menu size
- No pagination implemented (all data returned in single response)

## Security

- Google Sheets API uses OAuth 2.0
- Service account credentials should be kept secure
- Consider implementing additional authentication for production use
