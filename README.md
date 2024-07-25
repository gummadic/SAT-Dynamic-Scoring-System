Project Documentation for Form Submission and Redirect App

Overview:
This Google Apps Script application manages form submissions and redirects users based on scores stored in a Google Spreadsheet. Apart from functionality, there are crucial setup and configuration steps outlined below.

Setup and Configuration
Create a New Google Spreadsheet:

Click on Google Sheets and create a new spreadsheet.
Note: You will need to identify where the score column is located. This column index will be used to configure the scoreColumn variable in the script.
Extract the Spreadsheet ID:

Once the spreadsheet is created, extract the Spreadsheet ID from the URL. It's the long string of characters between /d/ and /edit.
Create Required Sheets:

Sheet1: This sheet should be automatically created when you create a new spreadsheet. Ensure it exists and is named exactly Sheet1.
Update Sheet1 with Level, Threshold, and URL:

In Sheet1, configure the following columns:
Column A (level): Assign a numeric ID to each level (e.g., 1, 2, 3).
Column B (threshold): Set the percentage threshold for each level (e.g., 70%, 50%, etc.).
Column C (url): Provide the corresponding URL for each level where users should be redirected.
Script Configuration:

spreadsheetId: Replace spreadsheetId in the script with the ID of your Google Spreadsheet.
scoreColumn: Update scoreColumn to match the index of the column where scores from form submissions are stored (1 for column B, 2 for column C, etc.).
Functionality
1. onFormSubmit(e)
Purpose: Stores submitted scores in the designated column of the Google Spreadsheet.
2. doGet(e)
Purpose: Redirects users to a specific URL based on their stored score and predefined thresholds.
Helper Function
evaluateExpression(expression): Evaluates mathematical expressions in form responses.

Click on the script editor icon in Google Sheets to open the Apps Script editor.
Go to File > Import... and paste the GitHub script URL to import the script.
Update Top Two Variables:

Update spreadsheetId with your Google Spreadsheet ID.
Adjust scoreColumn to match the column index where scores are stored.
Deployment Configuration:

Click on Deploy > New deployment... in the script editor.
Choose a suitable deployment type (web app, API executable, etc.).
Configure deployment settings:
Presentation: Click here for next steps and script URL.
Confirmation message: Update to include instructions and script URL.
Usage
Form Submission: Ensure that form submissions populate the correct sheet (Form responses 1).

Redirection: Users will automatically be redirected to URLs defined in Sheet1 based on their score thresholds.

Screenshots:
<img width="1061" alt="Click on Link to Sheets" src="https://github.com/user-attachments/assets/681cdeab-7bd0-4c29-adc6-018d03698763">
<img width="650" alt="Create new spreadsheet" src="https://github.com/user-attachments/assets/123690cc-6c39-4cae-8235-d4073e7a256b">
<img width="701" alt="New Sheet creation along with level details " src="https://github.com/user-attachments/assets/c9786588-4dd6-420a-8c47-6500d8c632fe">
<img width="1092" alt="Extract Sheet ID" src="https://github.com/user-attachments/assets/c2eab982-9545-415d-865e-08952b45cb38">
<img width="820" alt="Identify Score Column" src="https://github.com/user-attachments/assets/286a4dc3-049c-478f-b52c-cd7f0336e5c2">
<img width="1584" alt="Click on script editor" src="https://github.com/user-attachments/assets/3d32f593-54c7-4287-95e8-291cf693bca4">
<img width="1433" alt="Import the script from github updating the top two variables" src="https://github.com/user-attachments/assets/1cddd567-8af6-42bf-b2c2-cad354027b29">
<img width="1510" alt="Click on Deployment and select new deployment" src="https://github.com/user-attachments/assets/9a2058e6-2a1e-447e-8aff-1945175d3209">
<img width="1344" alt="Updated values as below for deployment" src="https://github.com/user-attachments/assets/1269cac4-150a-4166-8706-54cbc5792c1d">
<img width="1061" alt="Copy the script id" src="https://github.com/user-attachments/assets/46c41da7-7e3c-4392-90ab-229d28a6606e">
<img width="1295" alt="Go to presentation and confirmation message and update as shown below" src="https://github.com/user-attachments/assets/c7311d93-ed61-464f-97de-f0982039bc81">
<img width="1412" alt="Update with Click here for next steps and script url" src="https://github.com/user-attachments/assets/fd1537e9-76ef-4df5-b33c-4affebfd841a">
<img width="829" alt="Ability to update the type of answer" src="https://github.com/user-attachments/assets/161a2855-5311-4445-9671-f6f08da12459">
<img width="737" alt="Instant pop up to correct student answer" src="https://github.com/user-attachments/assets/1f16d493-1f07-41e1-99f2-5efec3835f0a">


