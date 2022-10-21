// Global variables list
  //Entire SpreadSheet Variable
var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  //Sheet Tab Variables
var inputSheet = spreadsheet.getSheetByName('Input');
var databaseSheet = spreadsheet.getSheetByName('Database');
var masterOutputSheet = spreadsheet.getSheetByName('MasterOutput');
var gmSheet = spreadsheet.getSheetByName('GM');
var logisticsSheet = spreadsheet.getSheetByName('Logistics');
var salesSheet = spreadsheet.getSheetByName('Sales');
var taproomSheet = spreadsheet.getSheetByName('Taproom');
var financeSheet = spreadsheet.getSheetByName('Finance');


var inputSheetLR = inputSheet.getLastRow();
var inputSheetLC = inputSheet.getMaxColumns();
var databaseSheetLR = databaseSheet.getLastRow();
var databaseSheetLC = databaseSheet.getLastColumn();

  //Database Stored As Array
var databaseArray = databaseSheet.getRange(1,1,databaseSheetLR,databaseSheetLC).getValues();


function onEdit(e) {
    //gets the range of the edited cell
  var range = e.range;
    //gets the column number of the edited cell
  var column = range.getColumn();
    //gets the row number of the edited cell
  var row = e.range.getRow();
    //gets the exact cell edited
  var cell = e.source.getActiveRange();
    //If the 'Change Type' is set to 'Sold', replaces checkbox with 'Please Select A Customer' and sets the customer cell to white, and gives it a dropdown of the available customers.
  if(e.value === 'Sold') {
    var customerCell = inputSheet.getRange(row,10);
    var validationRange = spreadsheet.getSheetByName('Helper').getRange('B2:B');
    var checkboxCell = inputSheet.getRange(row,9);
      //Reveals 'Customer' field at the end of the row where 'Sold' was selected.
    customerCell.setBackgroundRGB(255,255,255);
      //Set the data-validation rule for 'Customer' field to require a value from 'Helper' sheet, range B2:B.
    var rule = SpreadsheetApp.newDataValidation().requireValueInRange(validationRange).build();
    customerCell.setDataValidation(rule);
    checkboxCell.removeCheckboxes().setValue('Please Select A Customer');
  }
      //If the customer is selected, the message is removed, and checkbox is inserted.
  if(column == 10 && row <= 7 && e.value != '') {
    var checkboxCell = inputSheet.getRange(row,9);
    checkboxCell.clearContent().insertCheckboxes();
  }
      //If the customer field is made blank again, this removes the checkbox and reinstates the 'Please Select A Customer' message.
  if(column == 10 && row <= 7 && cell.isBlank()) {
    var checkboxCell = inputSheet.getRange(row,9);
    checkboxCell.removeCheckboxes().setValue('Please Select A Customer');
  }
    //When the Checkbox is ticked, send data to the 'database' sheet in an orientation and transformation that depends on the inventory type field.
  if(e.value === 'TRUE') {
    var row = e.range.getRow();
    var inputArray = inputSheet.getRange(row,1,1,inputSheetLC).getValues();
    var inputRange = inputSheet.getRange(row,1,1,inputSheetLC);
      //checks to see if the user has selected 'Packaged' as the inventory option, and then if so, gathers relevant data and copies it to the database sheet
    if(inputArray[0][0] === 'Packaged') {
      var inventoryChange = inputArray.map(function(r){return [r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[0]]; });
     databaseSheet.getRange(databaseSheetLR+1,1,1,inventoryChange[0].length).setValues(inventoryChange);
      }
        //if the selected inventory option is not 'Packaged', this gathers the relevant data, changes inventory values to negative, and then copies it to the database sheet
    if(inputArray[0][0] === 'Promo' || inputArray[0][0] === 'Taproom' || inputArray[0][0] === 'Loss') {
      inventoryChange = inputArray.map(function(r){return [r[1],r[2],r[3] *-1,r[4] *-1,r[5] *-1,r[6] *-1,r[7] *-1,r[0]]; });
      databaseSheet.getRange(databaseSheetLR+1,1,1,inventoryChange[0].length).setValues(inventoryChange);
      }
        //if the selected inventory option is for a future known large order, gather relevant data, and add to database to assist in brew calendar calculations.
    if(inputArray[0][0] === 'Large Event' || inputArray[0][0] === 'Merchandising' || inputArray[0][0] === 'Other Province'){
      inventoryChange = inputArray.map(function(r){return [r[2],r[3],r[4] *-1,r[5] *-1,r[6] *-1,r[7] *-1,r[8] *-1,'',r[0],r[1]]; });
      databaseSheet.getRange(databaseSheetLR+1,1,1,inventoryChange[0].length).setValues(inventoryChange); 
    }
        //if the selected inventory option is 'Sold' open gather the relevant data, changes the inventory values to negative, and then copies it to the database sheet, along with selected 'Customer'.
    if(inputArray[0][0] === 'Sold') {
      var inventoryChange = inputArray.map(function(r){return [r[1],r[2],r[3] *-1,r[4] *-1,r[5] *-1,r[6] *-1,r[7] *-1,r[0],'','',r[9]]; });
      databaseSheet.getRange(databaseSheetLR+1,1,1,inventoryChange[0].length).setValues(inventoryChange);
      inputSheet.getRange(row,inputSheetLC).clearDataValidations().setBackgroundRGB(0,0,0);
      }
      //Clears the input data from the input sheet
     inputRange.clearContent();
  }
}