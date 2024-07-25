// Define the spreadsheet ID
var spreadsheetId = '1L6ZO0DEPdWSRixcvCVWwAIH1RUEyVmy5MdANuS3b-RA';
var scoreColumn = 1; // Column index where the score is stored (1 for column B)

// Function to handle form submission and store score
function onFormSubmit(e) {
  try {
    var sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    var responses = e.values;

    if (!responses) {
      throw new Error("No responses found.");
    }

    // Assuming the score is in the specified column of the form responses
    var score = responses[scoreColumn]; // Use scoreColumn to fetch the score

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

    // Get the last stored score from the sheet
    var lastRow = sheet.getLastRow();
    var totalColumns = sheet.getLastColumn();
    var totalQuestions = totalColumns - 1; // Exclude the score column

    // Calculate percentage of correct answers
    var totalAnswers = sheet.getRange(lastRow, scoreColumn + 1).getValue(); // Adjusted to fetch score from dynamic column
    var percentage = (totalAnswers / totalQuestions) * 100;

    // Fetching data from Sheet1: categories, thresholds, and urlMap
    var data = records.getRange('A2:C' + lastRow).getValues(); // Assuming data range from A2:C to lastRow
    var numColumns = data[0].length - 1; 
    // Build urlMap object and determine storedScore based on percentage and thresholds
    var urlMap = {};
    var storedScore = '';

    for (var i = 0; i < numColumns; i++) {
      var level = data[i][0];
      var threshold = data[i][1];
      var url = data[i][2];

      // Build urlMap with level as key and URL as value
      urlMap[level] = url;

      // Determine storedScore based on percentage and thresholds
      if (percentage >= threshold) {
        storedScore = level;
      }
    }

    Logger.log('Percentage Score: ' + percentage.toFixed(2) + '%');
    Logger.log('Stored Score: ' + data.length);
     Logger.log('Stored Score: ' + urlMap[storedScore]);
    // Redirect to the corresponding URL based on storedScore
    var url = urlMap[storedScore];
    if (url) {
      return HtmlService.createHtmlOutput('<script>window.location.href="' + url + '";</script>');
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
  return parseFloat(expression); // Example implementation, parse float if expression is a number
}
