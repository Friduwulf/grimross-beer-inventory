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

  //Sheets Stored As Arrays
var databaseArray = databaseSheet.getRange(1,1,databaseSheetLR,databaseSheetLC).getValues();
var inputArray = inputSheet.getRange(1,1,inputSheetLR,inputSheetLC).getValues();


function onEdit(e) {
  if(e.value === 'TRUE') {
    var inputArray = inputSheet.getRange(3,1,1,8).getValues();
    var inputRange = inputSheet.getRange(3,1,1,inputSheetLC);

    if(inputArray[0][0] == 'Packaged') {
      Logger.log(inputArray);
      var inventoryChange = inputArray.map(function(r){return [r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[0]]; });
      Logger.log(inventoryChange);
     databaseSheet.getRange(databaseSheetLR+1,1,1,inventoryChange[0].length).setValues(inventoryChange);
      }
      else if(inputArray[0][0] != 'Packaged') {
        inventoryChange = inputArray.map(function(r){return [r[1],r[2],r[3] *-1,r[4] *-1,r[5] *-1,r[6] *-1,r[7] *-1,r[0]]; });
        Logger.log(inventoryChange);
        databaseSheet.getRange(databaseSheetLR+1,1,1,inventoryChange[0].length).setValues(inventoryChange);
      }
     inputRange.clear();
  }
}