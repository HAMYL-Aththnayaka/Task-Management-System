const bcrypt = require("bcrypt");
const db = require("./config/db");

const createAdmin = async () => {
    const adminPassword = "123456";
    const adminEmail ="admin@test.com";
    const adminName = "admin";

    const hashPass = await bcrypt.hash(adminPassword , 10);

    const adminCreated = await db.query(
        `INSERT INTO users(name,email,password)
        VALUES($1,$2,$3)`,
        [
            adminName,
            adminEmail,
            hashPass
        ]
    );

    if(adminCreated){
        console.log("Admin Created Successfully");
    }else{
        console.log("Something went Wrong Admin was not created")
    }
    
    process.exit();
}
createAdmin();