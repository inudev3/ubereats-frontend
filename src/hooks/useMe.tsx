import { gql, useQuery } from "@apollo/client";
import React from "react";

import { ME_QUERY } from "../queries";
import { meQuery } from "../__generated__/meQuery";

export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY);
};
