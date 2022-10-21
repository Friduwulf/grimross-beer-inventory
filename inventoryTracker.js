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
    if(e.value === 'Sold'){
    var row = e.range.getRow();
    var customerLC = row.getLastColumn();
    var customerCell = inputSheet.getRange(row,customerLC);

    customerCell.setBackgroundRGB(255,100,50)
  }
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
      var inventoryChange = inputArray.map(function(r){return [r[1],r[2],r[3] *-1,r[4] *-1,r[5] *-1,r[6] *-1,r[7] *-1,r[0],r[9]]; });
      databaseSheet.getRange(databaseSheetLR+1,1,1,inventoryChange[0].length).setValues(inventoryChange);
      }
      //Clears the input data from the input sheet
     inputRange.clearContent();
  }
}