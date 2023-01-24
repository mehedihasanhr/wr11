

// login
export const login = async (req, res) => {




    // save to httpOnly cookie
    try {

        // check if cookie is already set
        if (req.cookies.__user) {
            return res.status(200).json({ message: "Already logged in" });
        }

        // 8 random characters
        const user = Math.random().toString(36).substr(2, 8);

        res.cookie('__user', user, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 7 * 60 * 60 * 1000) // 30 days
        })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}


// logout
export const logout = async (req, res) => {
    req.session.destroy();
    return res.json({ message: "Logged out" });
};
