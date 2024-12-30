







const cannedSql=require('./canned-sql2.js');



demo();






async function demo() {


    // Setup your connection config
    const config = {
    server: 'whatever.database.windows.net',
    authentication: {
            type: 'default',
            options: {
                userName: '.........',
                password: '*************************'
            }
        },
        options: {
            database: 'Demo',
            trustServerCertificate: true
        }
    };




    const conn=await cannedSql.connect(config);

    const res=await cannedSql.query(conn, "SELECT database_id, [name] FROM sys.databases; SELECT SYSDATETIME() AS dt1;");
    console.log(res.results);

    const res2=await cannedSql.query(conn, "SELECT @test;", [{ "name": "test", "type": cannedSql.int, "value": 1234}]);
    console.log(res2.results);

    await cannedSql.begin(conn, cannedSql.SERIALIZABLE);
    const res3=await cannedSql.query(conn, "SELECT @@TRANCOUNT AS [@@TRANCOUNT]");
    console.log(res3.results);
    await cannedSql.rollback(conn);

    const res4=await cannedSql.query(conn, "SELECT @@TRANCOUNT AS [@@TRANCOUNT]");
    console.log(res4.results);
}



