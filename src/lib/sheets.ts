import { google } from 'googleapis';

export async function createBusinessTrackingSheet(authClient: any) {
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  const response = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: 'Business Tracking - ICEPAB',
      },
    },
  });

  const spreadsheetId = response.data.spreadsheetId;
  
  if (!spreadsheetId) {
    throw new Error('Failed to create spreadsheet');
  }

  // Add headers
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Sheet1!A1:E1',
    valueInputOption: 'RAW',
    requestBody: {
      values: [['Date', 'Project', 'Category', 'Price', 'Status']],
    },
  });

  return spreadsheetId;
}
