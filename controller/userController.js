

// login
export const login = async (req, res) => {
    // save to session
    const { user } = req.session;
    req.session.user = user !== undefined ? user : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    res.json({ message: "Logged in" });

}


// logout
export const logout = async (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out" });
};
