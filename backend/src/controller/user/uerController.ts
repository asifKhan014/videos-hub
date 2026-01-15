import { AuthenticatedRequestHandler } from "./../../config/passportJwtStrategy.ts";
import User from "../../model/userSchema.ts";
import { sendResponse } from "../../utils/sendResponse.ts";

export const getUserDetails: AuthenticatedRequestHandler = async (req, res) => {
  try {
    if (req.user instanceof User) {
      const userId = req.user._id;
      if (!userId) {
        return sendResponse(res, 400, "please sign to continue");
      }
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return sendResponse(res, 404, "User not found");
      }
      return sendResponse(res, 200, "User details fetched successfully", {
        user,
      });
    }
  } catch (error) {
    console.error(`Error fetching user details: ${error}`);
    return sendResponse(res, 500, "Internal server error");
  }
};
