'use strict';
const fs = require('fs');
var path = require('path');
const xlsx2json = require('xlsx2json');


module.exports = {
 async up (queryInterface, Sequelize) {
    try {
      let parseData;
      await xlsx2json(path.resolve(__dirname,'..','public','master.xlsx'),{
        dataStartingRow: 2,
        mapping: {
          'firstName': 'A',
          'lastName': 'B',
          'email': 'C'
      }
      }).then(jsonArray => {
        parseData = jsonArray
      });
      parseData[0].map(el => {
        el.createdAt = new Date();
        el.updatedAt = new Date();
      });

      return queryInterface.bulkInsert('Users', parseData[0]);

    } catch (error) {
      console.log(error)
    }
  },
  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Users', null, {});
  }
};