import { Parser } from "json2csv";

import { Response } from "express";

import Lead from "../models/Lead";

import { AuthRequest }
  from "../middlewares/authMiddleware";


// CREATE LEAD
export const createLead = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const {
      name,
      email,
      source,
      status,
    } = req.body;

    const lead =
      await Lead.create({
        name,
        email,
        source,
        status,
        createdBy: req.user!.id,
      });

    res.status(201).json({
      success: true,
      message:
        "Lead created successfully",
      lead,
    });

  } catch (error) {

    throw error;

  }
};


// GET ALL LEADS
export const getLeads = async (
  req: AuthRequest,
  res: Response
) => {

  try {

    const {
      status,
      source,
      search,
      sort = "latest",
      page = "1",
      limit = "10",
    } = req.query;

    const filter: any = {};

    // Status filter
    if (
      status &&
      status !== ""
    ) {

      filter.status = status;

    }

    // Source filter
    if (
      source &&
      source !== ""
    ) {

      filter.source = source;

    }

    // Search
    if (
      search &&
      search !== ""
    ) {

      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // Pagination
    const pageNumber =
      Number(page);

    const limitNumber =
      Number(limit);

    const skip =
      (pageNumber - 1) *
      limitNumber;

    // Total Leads
    const totalLeads =
      await Lead.countDocuments(
        filter
      );

    // Sorting
    const sortOption: any =
      sort === "oldest"
        ? {
            createdAt: 1,
            _id: 1,
          }
        : {
            createdAt: -1,
            _id: -1,
          };

    // Fetch Leads
    const leads =
      await Lead.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber);

    res.status(200).json({
      success: true,
      leads,
      currentPage: pageNumber,
      totalPages: Math.ceil(
        totalLeads /
          limitNumber
      ),
      totalLeads,
    });

  } catch (error) {

    throw error;

  }
};


// GET SINGLE LEAD
export const getSingleLead =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const { id } =
        req.params;

      const lead =
        await Lead.findById(id);

      if (!lead) {

        const error: any =
          new Error(
            "Lead not found"
          );

        error.statusCode =
          404;

        throw error;
      }

      res.status(200).json({
        success: true,
        lead,
      });

    } catch (error) {

      throw error;

    }
  };


// UPDATE LEAD
export const updateLead =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const { id } =
        req.params;

      const updatedLead =
        await Lead.findByIdAndUpdate(
          id,
          req.body,
          {
            returnDocument:
              "after",
          }
        );

      if (!updatedLead) {

        const error: any =
          new Error(
            "Lead not found"
          );

        error.statusCode =
          404;

        throw error;
      }

      res.status(200).json({
        success: true,
        message:
          "Lead updated successfully",
        lead: updatedLead,
      });

    } catch (error) {

      throw error;

    }
  };


// DELETE LEAD
export const deleteLead =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const { id } =
        req.params;

      const deletedLead =
        await Lead.findByIdAndDelete(
          id
        );

      if (!deletedLead) {

        const error: any =
          new Error(
            "Lead not found"
          );

        error.statusCode =
          404;

        throw error;
      }

      res.status(200).json({
        success: true,
        message:
          "Lead deleted successfully",
      });

    } catch (error) {

      throw error;

    }
  };


// GET STATS
export const getLeadStats =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const totalLeads =
        await Lead.countDocuments();

      const newLeads =
        await Lead.countDocuments({
          status: "new",
        });

      const qualifiedLeads =
        await Lead.countDocuments({
          status:
            "qualified",
        });

      const lostLeads =
        await Lead.countDocuments({
          status: "lost",
        });

      res.status(200).json({
        success: true,
        totalLeads,
        newLeads,
        qualifiedLeads,
        lostLeads,
      });

    } catch (error) {

      throw error;

    }
  };


// EXPORT CSV
export const exportLeadsCSV =
  async (
    req: AuthRequest,
    res: Response
  ) => {

    try {

      const leads =
        await Lead.find();

      const fields = [
        "name",
        "email",
        "status",
        "source",
        "createdAt",
      ];

      const json2csv =
        new Parser({
          fields,
          withBOM: true,
        });

      const csv =
        json2csv.parse(
          leads
        );

      res.header(
        "Content-Type",
        "text/csv"
      );

      res.attachment(
        "leads.csv"
      );

      return res.send(csv);

    } catch (error) {

      throw error;

    }
  };