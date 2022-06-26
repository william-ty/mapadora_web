import api from "api/api";
import { useQuery, useQueryClient } from "react-query";

export const useNotificationQuery = (user: any): any => {
  return useQuery("invitationsCount", () => {
    return api.get({
      route: `traveler/invitations/count`,
      hasToken: true,
    });
  });
};
