# Google Sheets Setup Guide

## Overview

PLU Exporter fetches menu data from Google Sheets. This guide explains how to set up your Google Sheet correctly.

## Sheet Structure

Your Google Sheet must contain exactly two sheets:

### 1. Menu Sheet

Contains all product items. Required columns:

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| plu | Number | Product Lookup code | 1001 |
| group | String | Group name (must match Groups sheet) | "Starters" |
| name | String | Product name | "Bruschetta" |
| image | String | Image filename | "bruschetta.jpg" |
| allergies | String | Allergen information (comma separated) | "Gluten, Garlic" |
| details | String | Short description | "Tomato, basil, garlic" |
| description | String | Full description | "Classic Italian appetizer..." |
| size | String | Portion size | "Small" |
| price | String | Price with currency | "$8.99" |
| page | Number | Page number for printing | 1 |
| language | String | Language code (en, de, it, etc.) | "en" |

**Example Menu Sheet:**

| plu | group | name | image | allergies | details | description | size | price | page | language |
|-----|-------|------|-------|-----------|---------|-------------|------|-------|------|----------|
| 1001 | Starters | Bruschetta | bruschetta.jpg | Gluten, Garlic | Tomato, basil, garlic | Classic Italian appetizer... | Small | $8.99 | 1 | en |
| 1002 | Starters | Calamari | calamari.jpg | Gluten, Shellfish | Fried squid | Crispy squid... | Medium | $12.99 | 1 | en |
| 2001 | Main Courses | Grilled Salmon | salmon.jpg | Fish | With vegetables | Fresh Atlantic salmon... | Large | $24.99 | 2 | en |

### 2. Groups Sheet

Contains menu group categories. Required columns:

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| name | String | Group name | "Starters" |
| description | String | Group description | "Delicious appetizers..." |
| pre | String | Text to display before group | "" |
| post | String | Text to display after group | "All items to share" |
| page | Number | Page number | 1 |
| language | String | Language code | "en" |

**Example Groups Sheet:**

| name | description | pre | post | page | language |
|------|-------------|-----|------|------|----------|
| Starters | Delicious appetizers to begin your meal | | All starters are meant to be shared | 1 | en |
| Main Courses | Our chef's specialties | All main courses include a side salad | Ask about our daily specials | 2 | en |
| Desserts | Sweet treats to finish your meal | | | 3 | en |

## Multi-Language Support

To support multiple languages:

1. Add rows for each language in both sheets
2. Use the same `plu` and `group` names across languages
3. Set the `language` column to the appropriate language code
4. Configure `NEXT_PUBLIC_LANGUAGES` in your `.env` file

**Example Multi-Language Menu:**

| plu | group | name | ... | language |
|-----|-------|------|-----|----------|
| 1001 | Starters | Bruschetta | ... | en |
| 1001 | Starters | Bruschetta | ... | de |
| 1001 | Starters | Bruschetta | ... | it |

## Formatting Requirements

### Column Headers

- Must be in the first row
- Must match exactly (case-sensitive)
- No spaces or special characters
- Use lowercase for consistency

### Data Types

- **plu**: Must be numeric (or empty for null)
- **page**: Must be numeric
- **language**: Must be string (language code)
- All other fields: String values

### Empty Values

- Leave cells empty for null values
- Don't use "N/A" or "-" as placeholders
- Empty strings are treated as null

## Sharing Your Sheet

1. Open your Google Sheet
2. Click "Share" in the top-right corner
3. Add your service account email as an editor
4. The email looks like: `your-project@your-project-id.iam.gserviceaccount.com`

## Best Practices

### Performance

- Keep sheet size under 5,000 rows
- Avoid complex formulas in data cells
- Use separate sheets for different data types

### Data Organization

- Group related items together
- Use consistent naming conventions
- Keep descriptions concise
- Use standard currency formats

### Images

- Store images in `public/custom/` directory
- Use descriptive filenames
- Keep filenames short (under 50 characters)
- Use web-optimized formats (JPG, PNG, WebP)

## Troubleshooting

### Common Issues

**Issue: Data not loading**
- Check sheet sharing permissions
- Verify sheet ID in `.env` file
- Ensure column headers match exactly

**Issue: Missing products**
- Verify group names match between Menu and Groups sheets
- Check language codes are correct
- Ensure plu values are unique

**Issue: API errors**
- Check Google Sheets API is enabled
- Verify service account credentials
- Ensure credentials are base64 encoded correctly

### Debugging

1. Check browser console for errors
2. Test API endpoint directly: `/api/data`
3. Verify Google Cloud Console logs
4. Check Next.js server logs

## Example Sheet Template

Download our [template sheet](https://docs.google.com/spreadsheets/d/TEMPLATE_ID/edit) to get started quickly.

## Advanced Configuration

### Custom Ranges

You can modify the API call to use custom ranges by editing `src/utils/api.ts`:

```typescript
export const googleSheetsApiCall = async <T = string[]>({
  sheetName = "",
  startRange = "A1",  // Change default start
  endRange = "Z14989", // Change default end
  defaultData = {} as T,
}: GoogleSheetsApiCallProps = {}) => {
  // ...
}
```

### Multiple Sheets

To add additional data sheets:

1. Create a new model in `src/models/`
2. Add a new API function
3. Create a new endpoint in `src/app/api/`

## Maintenance

### Updating Data

- Changes to Google Sheet reflect immediately
- No cache to clear
- Refresh the page to see updates

### Backup

- Regularly export your sheet as Excel/CSV
- Use Google Drive version history
- Consider automated backups

## Support

For issues with Google Sheets integration:
- Check [Google Sheets API documentation](https://developers.google.com/sheets/api)
- Review [Google Cloud Console](https://console.cloud.google.com/)
- Contact Google Cloud Support for API issues
