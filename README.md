# cannedSql

Copyright Daniel Hutmacher under [Creative Commons 4.0 license with attribution](http://creativecommons.org/licenses/by/4.0/).

Source: [https://github.com/sqlsunday/sp_ctrl3](https://github.com/sqlsunday/cannedSql)

This is a rework of my original "canned SQL" abstraction layer that I
made some time ago because I got so tired or juggling the asynchronous
nightmare that was querying SQL Server with Tedious, not to mention
getting the error handling to do what I wanted.

A significant part of the code in this module was written with AI
assistance, although I've reviewed, tested, commented, and cleaned the
result manually.

## DISCLAIMER

This script may not be suitable to run in a production
environment. I cannot assume any responsibility regarding
the accuracy of the output information, performance
impacts on your server, or any other consequence. If
your juristiction does not allow for this kind of
waiver/disclaimer, or if you do not accept these terms,
you are NOT allowed to store, distribute or use this
code in any way.

## Prerequisites
 
This module depends on the "tedious" Node.js module.

## Simple example

```
  // Import the module:
  const cannedSql=require('./canned-sql2.js');

  // Configure the connection:
  const config = {
    server: 'somewhere.database.windows.net',
    authentication: {
            type: 'default',
            options: {
                userName: '.....',
                password: '**************'
            }
        },
        options: {
            database: 'database-name-goes-here',
            trustServerCertificate: true
        }
    };

  // Create the connection
  const conn=await cannedSql.connect(config);

  // An unparameterized queries:
  const res=await cannedSql.query(conn, "SELECT SYSDATETIME() AS dt1;");
  console.log(res.results);
```

## Parameterized queries

```
  // Parameterized queries:
  const res2=await cannedSql.query(conn, "SELECT @test;", [{ "name": "test", "type": cannedSql.int, "value": 1234}]);
  console.log(res2.results);
```

## SQL transactions

```
  // Begin transaction
  cannedSql.begin(conn);
  
  // ... or
  cannedSql.begin(conn, cannedSql.READ_COMMITTED);

  // Commit
  cannedSql.commit(conn);

  // Rollback
  cannedSql.rollback(conn);
```
