import Job from "../models/job.model.js"

// @desc    Post a new job
export const postJob = async (req, res) => {
    try {
        const { title, company, position, location, salary, experince, description, jobType, companyId, skillsRequired } = req.body;
        const userId = req.id; // Assuming auth middleware adds user info

        if (!title || !description || !experince || !companyId || !jobType || !salary || !location) {
            return res.status(400).json({ message: "something is missing" });
        }

        const newJob = new Job({
            title,
            position,
            company: companyId,
            location,
            salary: Number(salary),
            jobType,
            experince,
            skillsRequired:skillsRequired.split(","),
            description,
            created_by: userId,
            // postedBy: userId,
        });

        const savedJob = await newJob.save();

        res.status(201).json({
            success: true,
            message: "Job posted successfully",
            job: savedJob,
        });
    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({
            success: false,
            message: "Server error while posting job",
        });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const query = {};
        const { title, location, company } = req.query;

        if (title) query.title = new RegExp(title, 'i'); // Case-insensitive match
        if (location) query.location = new RegExp(location, 'i');
        if (company) query.company = new RegExp(company, 'i');

        // Fetch jobs from DB
        const jobs = await Job.find(query).populate({path:"company"}).sort({createdAt:-1});

        res.status(200).json({ success: true, count: jobs.length, data: jobs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const foundJob = await Job.findById(jobId);

        if (!foundJob) {
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        }
        return res.status(200).json({
            success: true,
            job: foundJob
        })
    } catch (error) {
        console.log(error)
    }
}
export const getAdminJobs = async (req, res) => {
    try {
        const admin = req.id;
        console.log(admin)
        const adminJobs = await Job.find({ created_by: admin })
        if (!adminJobs) {
            return res.status(404).jsaon({ mesage: "admins job not found", success: false })
        }
        return res.status(200).json({
            adminJobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}