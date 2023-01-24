import Sector from "../model/Sector.js";



// add a new sector
export const addSector = async (req, res) => {
    const sector = req.body;

    try {
        const newSector = new Sector(sector);
        await newSector.save();
        return res.status(200).json(newSector);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}

export const updateSector = async (req, res) => {
    const { id } = req.params;
    const sector = req.body;

    if (!id) {
        return res.status(404).json({ message: "Sector not found" });
    }
    try {
        const updatedSector = await Sector.findOneAndUpdate({ _id: id, uid: req.body.uid }, sector, { new: true });
        return res.status(200).json(updatedSector);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}


export const getSector = async (req, res) => {
    const { uid } = req.body;


    try {
        const sectors = await Sector.findOne({ uid });

        if (!sectors) {
            console.log("No sectors found")
            return;
        }
        return res.status(200).json(sectors);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}
