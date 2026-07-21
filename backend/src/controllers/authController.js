const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const { findUserByEmail } = require("../models/userModel");


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log(email);
            console.log(password);

            return res.status(400).json({
                message: "Please Enter Valid credentials",
            })

        }

        const user =await findUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                "message": "Please Enter a Valid Credentials",
            });
        }


        const passwordCheck = await bcrypt.compare( password,user.password);
        if (!passwordCheck) {
            console.log("invaid password");

            return res.status(401).json({
                "Message": "Invalid password or email",
            })
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        },
        process.env.JWT_SECRETE,
            {
                expiresIn: "1h",
            }
        );

        if (!token) {
            return res.status(403).json({
                "message": "Something went Wrong"
            });
        }

        return res.status(200).json({
            message: "Login successfull",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        console.log(err.toString());
        return res.status(500).json({
            message: err.toString(),
        });
    }
}

module.exports = { login };