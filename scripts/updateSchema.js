#!/usr/bin/env babel-node --optional es7.asyncFunctions

import fs from 'fs';
import path from 'path';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import request from 'superagent';

request
  .get('http://localhost:3000/v1/introspection')
  .set('Accept', 'application/json')
  .end(function(err, res){
    if (err || !res.ok) {
      console.log(err);
    } else {
      fs.writeFileSync(
        path.join(__dirname, '../data/schema.json'),
        JSON.stringify(res.body, null, 2)
      );
    }
  });
