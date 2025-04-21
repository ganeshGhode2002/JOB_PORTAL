import Company from '../models/company.model.js';


export const registerCompany = async (req, res) => {
    try {
        const { name, industry, location, description, website } = req.body;

        const companyExists = await Company.findOne({ name });
        if (companyExists) {
            return res.status(400).json({ message: "Company already exists" });
        }

        const newCompany = new Company({
            name,
            industry,
            location,
            description,
            website,
            userId: req.id
        });

        const savedCompany = await newCompany.save();

        res.status(201).json({
            success: true,
            message: "Company registered successfully",
            company: savedCompany,
        });
    } catch (error) {
        console.error("Error registering company:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const getAllCompanies = async (req, res) => {
    try {
        const userId = req.id;
        // console.log("req: ",userId)
        const companies = await Company.find({ userId });
        if (!companies) {
            res.status(404).json({ success: false, message: "company not found" });
        }
        res.status(200).json({ success: true, companies });
    } catch (error) {
        console.error("Error fetching companies:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json({ success: true, company });
    } catch (error) {
        console.error("Error finding company:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { name, industry, location, description, website } = req.body;

        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.id,
            { name, industry, location, description, website },
            { new: true }
        );

        if (!updatedCompany) {
            return res.status(404).json({ message: "Company not found" });
        }

        res.status(200).json({
            success: true,
            message: "Company updated successfully",
            company: updatedCompany,
        });
    } catch (error) {
        console.error("Error updating company:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};