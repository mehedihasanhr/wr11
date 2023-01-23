import Sector from "../model/Sector.js";



// add a new sector
export const addSector = async (req, res) => {
    const sector = req.body;

    const oldData = await Sector.findOne({ uid: req.session.user });
    if (oldData) {
        return;
    }

    if (!sector.name || sector.sectors.length === 0 || !sector.term)
        return res.status(200).json({ message: "Please fill in all fields." })


    const newSector = new Sector(sector);
    try {
        await newSector.save();
        res.status(201).json(newSector);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const updateSector = async (req, res) => {
    const { id } = req.params;
    const sector = req.body;

    if (!id) {
        return res.status(404).json({ message: "Sector not found" });
    }

    console.log(req.header.user)
    try {
        const updatedSector = await Sector.findOneAndUpdate({ _id: id, uid: req.body.uid }, sector, { new: true });
        return res.status(200).json(updatedSector);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}


export const getSector = async (req, res) => {
    try {
        const sectors = await Sector.findOne({
            uid: req.session.user
        });
        if (!sectors) return res.status(200);

        return res.status(200).json(sectors);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}
