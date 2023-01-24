

// login
export const login = async (req, res) => {
    const user = "jhondoe";
    const password = 123456;
    // save to httpOnly cookie
    try {
        // save to session
        req.session.user = user;

        return res.json({ message: "Logged in" });

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}


// logout
export const logout = async (req, res) => {
    req.session.destroy();
    return res.json({ message: "Logged out" });
};
