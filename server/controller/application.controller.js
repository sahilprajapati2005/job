import Application from "../models/application.model.js";
import Job from "../models/job.model.js";
export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res
        .status(400)
        .json({ message: "Job ID is required", success: false });
    }
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applicants.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Application submitted successfully",
      success: true,
      application: newApplication,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error applying for job", success: false });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: {
          sort: { createdAt: -1 },
        },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res
        .status(404)
        .json({ message: "No applications found", success: false });
    }
    return res.status(200).json({
      message: "Applied jobs fetched successfully",
      success: true,
      applications: application,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching applied jobs", success: false });
  }
};

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: {
        sort: { createdAt: -1 },
      },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({
      message: "Applicants fetched successfully",
      job,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching applicants", success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res
        .status(400)
        .json({ message: "Status is required", success: false });
    }
    const application = await Application.findById(applicationId);
    if (!application) {
      return res
        .status(404)
        .json({ message: "Application not found", success: false });
    }

    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({
      message: "Application status updated successfully",
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating status", success: false });
  }
};
