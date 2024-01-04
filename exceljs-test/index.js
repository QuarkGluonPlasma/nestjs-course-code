const { Workbook } = require('exceljs');

async function main(){
    const workbook = new Workbook();

    const workbook2 = await workbook.xlsx.readFile('./data.xlsx');

    workbook2.eachSheet((sheet, index1) => {
        console.log('工作表' + index1);

        const value = sheet.getSheetValues();

        console.log(value);

        // sheet.eachRow((row, index2) => {
        //     const rowData = [];
    
        //     row.eachCell((cell, index3) => {
        //         rowData.push(cell.value);
        //     });

        //     console.log('行' + index2, rowData);
        // })
    })

}

main();
