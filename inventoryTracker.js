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



function mathTest() {
var inputArray = inputSheet.getRange(3,1,1,8).getValues();

if(inputArray[0][0] = 'Packaged') {
  Logger.log(inputArray);
  var inventoryChange = inputArray.map(function(r){return [r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[0]]; });
  Logger.log(inventoryChange);
  databaseSheet.getRange(databaseSheetLR+1,1,1,inventoryChange[0].length).setValues(inventoryChange);
}





/*var inputArray = inputSheet.getRange(3,4,1,inputSheetLC).getValues();
Logger.log(inputArray);
var inventoryChange = inputArray.map(function(r){return [r[0] *-1, r[1] *-1, r[2] *-1, r[3] *-1, r[4] *-1]; });
Logger.log(inventoryChange);
databaseSheet.getRange(databaseSheetLR+1,3,1,inventoryChange[0].length).setValues(inventoryChange);

*/

}








function onEdit(e) {
    if (e.value === 'TRUE') {
        var sheet = e.range.getSheet();
        if (sheet.getSheetName() == 'Input') {
            logSheet = e.source.getSheetByName('Database');
            var row = e.range.getRow();
            var lastRow = logSheet.getLastRow();
            var range = sheet.getRange(row,1,1,sheet.getLastColumn());
            var copyRange = sheet.getRange(row,2,1,sheet.getLastColumn()-2);
            var entryType = sheet.getRange(row,1,1,1).getValue();
            var entryCell = sheet.getRange('A3');

          if(entryType == 'Sold' || entryType == 'Loss' || entryType == 'Taproom') {

            var newArray = [];

            // Variable that saves the data from G1->I1.
            var cellIn1 = ("D3");
            var cellIn2 = ("E3");
            var cellIn3 = ("F3");
            var cellIn4 = ("G3");
            var cellIn5 = ("H3");
              
            var sheet = SpreadsheetApp.getActiveSheet();
             
            var cellOut1 = sheet.getRange(cellIn1);
            var cellOut2 = sheet.getRange(cellIn2);
            var cellOut3 = sheet.getRange(cellIn3);
            var cellOut4 = sheet.getRange(cellIn4);
            var cellOut5 = sheet.getRange(cellIn5);
           
            var data1 = cellOut1.getValue();
            var data2 = cellOut2.getValue();
            var data3 = cellOut3.getValue();
            var data4 = cellOut4.getValue();
            var data5 = cellOut5.getValue();
              
            // Puts the data in the Array. (newArray)
            newArray.push(data1, data2, data3, data4, data5)

            for(var i=0; i<newArray.length; i++) {
              newArray[i] *= -1;
            }

            cellOut1.setValue(newArray[0, 0]);
            cellOut2.setValue(newArray[0, 1]);
            cellOut3.setValue(newArray[0, 2]);
            cellOut4.setValue(newArray[0, 3]);
            cellOut5.setValue(newArray[0, 4]);

          }

            copyRange.copyTo(logSheet.getRange(lastRow + 1,1), {contentsOnly: true});
            entryCell.copyTo(logSheet.getRange(lastRow + 1,8,1,1), {contentsOnly: true});
            range.clear();

        }
    }
}