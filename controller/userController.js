
import crypto from 'crypto';

// login
export const login = async (req, res) => {

    try {

        let { __user } = req.cookies;

        if (__user) {
            return res.status(200).json({ message: "Logged in" });
        }

        // 8 random characters
        const user = crypto.randomBytes(8).toString('hex');


        res.cookie('__user', user, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 7 * 60 * 60 * 1000) // 30 days
        })

        return res.status(200).json({ message: "Logged in" });


    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}


// logout
export const logout = async (req, res) => {
    req.session.destroy();
    return res.json({ message: "Logged out" });
};
