// Define the spreadsheet ID
var spreadsheetId = '1_4qF206N64ZJDlhrAkq3yMATskZpiyvniowO7pQzPa4'; // Old '1Z-VdO3Uwwno5vhBGc18pP9JFBeDh12VYc-k6J-gdjaw'
var scoreColumn = 2; // Column index where the score is stored (1 for column B)

// Function to handle form submission and store score
function onFormSubmit(e) {
  try {
    var sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    var responses = e.values;

    if (!responses) {
      throw new Error("No responses found.");
    }

    // Assuming the score is in the specified column of the form responses
    var score = responses[scoreColumn];
    
    // Check if score is empty, null, or undefined; if so, set it to 0
    if (!score) {
      score = 0;
    }

    // Evaluate score if it's a mathematical expression
    var scoreAsNumber = evaluateExpression(score);
    var formattedScore = scoreAsNumber.toFixed(1); // Adjust decimal places as needed

    // Store the formatted score in the spreadsheet
    var newRow = [formattedScore];
    sheet.appendRow(newRow);

    Logger.log('Score stored: ' + formattedScore);

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return HtmlService.createHtmlOutput('Error processing form submission.');
  }
}

// Function to handle redirection based on the storedScore category
function doGet(e) {
  try {
    var records = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Sheet1');
    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Form responses 1');

    // Get the user's email
    var userEmail = Session.getActiveUser().getEmail();
    if (!userEmail) {
      return HtmlService.createHtmlOutput('Error: User email not found or user is not logged in.');
    }

    // Get the column index for the 'Email Address' column (B) and 'Score' column (C)
    var emailColumnIndex = 2; // Column B
    var scoreColumnIndex = 3; // Column C

    // Find the last row with the user's email in column B
    var emailColumn = sheet.getRange(1, emailColumnIndex, sheet.getLastRow(), 1).getValues();
    var lastRow = -1; // Initialize variable for the last row with the user’s email

    // Loop through all rows to find the last row containing the user's email
    for (var i = emailColumn.length - 1; i >= 0; i--) {
      if (emailColumn[i][0] == userEmail) {
        lastRow = i + 1; // Adjust for 1-based indexing in Google Sheets
        break; // Exit loop after finding the last row
      }
    }

    // If no email is found, use the last row in the sheet as a fallback
    if (lastRow == -1) {
      lastRow = sheet.getLastRow(); // Use the last row if no email is found
    }

    // Get the score value from column C in the last row for this email (or fallback last row)
    var scoreValue = sheet.getRange(lastRow, scoreColumnIndex).getValue();
    if (!scoreValue) {
      scoreValue = 0; // If no score, default to 0
    }

    // Calculate the percentage of correct answers
    var totalColumns = sheet.getLastColumn();
    var totalQuestions = totalColumns - 4; // Exclude Timestamp (1), Email Address (2), Score (3), and Name (4) columns
    var percentage = (scoreValue / totalQuestions) * 100;

    // Fetching data from Sheet1: categories, thresholds, and urlMap
    var data = records.getRange('A2:C' + records.getLastRow()).getValues();
    var numColumns = data[0].length - 1; 

    // Build urlMap object and determine storedScore based on percentage and thresholds
    var urlMap = {};
    var storedScore = '';

    for (var i = 0; i < data.length; i++) {
      var level = data[i][0];
      var threshold = data[i][1];
      var url = data[i][2];

      // Check if threshold is empty, null, or undefined; if so, set it to 0
      if (!threshold) {
        threshold = 0;
      }

      // Build urlMap with level as key and URL as value
      urlMap[level] = url;

      // Determine storedScore based on percentage and thresholds
      if (percentage >= threshold) {
        storedScore = level;
      }
    }

    Logger.log('Percentage Score: ' + percentage.toFixed(2) + '%');
    Logger.log('Stored Score: ' + storedScore);
    Logger.log('Redirect URL: ' + urlMap[storedScore]);

    // Redirect to the corresponding URL based on storedScore
    var url = urlMap[storedScore];
    if (url) {
      // Return HTML to open URL in a new tab
      return HtmlService.createHtmlOutput(
        '<html><script>' +
        'window.open("' + url + '", "_blank");' +
        'window.close();' +
        '</script></html>'
      );
    } else {
      return HtmlService.createHtmlOutput('Invalid category or URL not found.');
    }

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return HtmlService.createHtmlOutput('Error redirecting.');
  }
}

// Helper function to evaluate mathematical expressions in form responses
function evaluateExpression(expression) {
  // Implement your logic to evaluate expressions if needed
  var result = parseFloat(expression);
  // Check if the result is NaN (Not a Number), if so, set it to 0
  if (isNaN(result)) {
    result = 0;
  }
  return result;
}
