

// login
export const login = async (req, res) => {
    // save to session
    try {
        const { user } = req.session;
        req.session.user = !user ? Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) : user;
        return res.json({ message: "Logged in" });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error });
    }

}


// logout
export const logout = async (req, res) => {
    req.session.destroy();
    return res.json({ message: "Logged out" });
};
