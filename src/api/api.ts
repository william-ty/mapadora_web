import { checkStatus, url_prefix } from "./util";
// import { LngLatLike } from "mapbox-gl";

// Models
import { Step } from "../model/Step";
import { InterestPoint } from "../model/InterestPoint";
import { Traveler } from "../model/Traveler";
import { Document } from "../model/Document";

export type APIObject = any;

/* AUTOMATICALLY GET ROUTENAME - PARTIALLY WORKS
// V1
const getRouteName = (object: APIObject) => {
  switch (object.constructor) {
    case Step:
      return Step.routeName;
    case InterestPoint:
      return InterestPoint.routeName;
  }
};
// V2
const getRouteName = (object: APIObject) => {
  let routeName = "";

  if (object instanceof InterestPoint) routeName = InterestPoint.routeName;
  else if (object instanceof Step) routeName = Step.routeName;

  return routeName;
};
*/

const USE_TOKEN_BY_DEFAULT = true;
const getToken = () => window.localStorage.getItem("token");

//! Keep comments for JWT implementation
const api = {
  // CREATE
  create: async ({
    route,
    body,
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
  }: CreateType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${idTravel ? `travel/${idTravel}/` : ``}${route}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then(checkStatus)
      .then((res) => res.json());

    // });
  },

  // READ
  get: async ({
    route,
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
  }: GetType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${idTravel ? `travel/${idTravel}/` : ``}${route}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(checkStatus)
      .then((res) => res.json())
      .catch((err: Error) => {
        console.log("ERREUR");
        console.log(err.message);
      });
  },
  getOne: async ({
    route,
    id,
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
  }: GetOneType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${idTravel ? `travel/${idTravel}/` : ``}${route}/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(checkStatus)
      .then((res) => res.json());
  },

  // UPDATE
  update: async ({
    route,
    id,
    body,
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
  }: UpdateType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${idTravel ? `travel/${idTravel}/` : ``}${route}/${id}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then(checkStatus)
      .then((res) => res.json());
  },

  // DELETE
  delete: async ({
    route,
    id,
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
  }: DeleteType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${idTravel ? `travel/${idTravel}/` : ``}${route}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      }
    )
      .then(checkStatus)
      .then((res) => res.json());
  },
  // FORMDATA
  createWithFormData: ({
    route,
    formData,
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
  }: CreateWithFormDataType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${idTravel ? `travel/${idTravel}/` : ``}${route}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )
      .then(checkStatus)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },
  // FORMDATA
  updateWithFormData: ({
    route,
    id,
    formData,
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
  }: UpdateWithFormDataType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${idTravel ? `travel/${idTravel}/` : ``}${route}/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )
      .then(checkStatus)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },

  // UPDATE ORDER
  reorder: async ({
    route,
    body,
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
  }: ReorderType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${idTravel ? `travel/${idTravel}/` : ``}${route}/reorder/`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then(checkStatus)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },

  // ASSOCIATE TO STEP
  associateToStep: async ({
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
    idInterestPoint,
    idStep,
  }: AssociateType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${
        idTravel
          ? `travel/${idTravel}/interestpoint/${idInterestPoint}/step/${idStep}`
          : ``
      }`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(checkStatus)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },

  // REMOVE FROM STEP
  removeFromStep: async ({
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
    idInterestPoint,
  }: AssociateType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${
        idTravel
          ? `travel/${idTravel}/interestpoint/${idInterestPoint}/removestep`
          : ``
      }`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(checkStatus)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },

  // ASSOCIATE TAG TO TASK
  addTagsToTask: async ({
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
    taskId,
    body,
  }: AddTagsToTaskType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${
        idTravel ? `travel/${idTravel}/task/${taskId}/addtags}` : ``
      }`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then(checkStatus)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },

  // ADD TAG TO TASK
  addTagToTask: async ({
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
    taskId,
    tagId,
  }: AddTagToTaskType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${
        idTravel ? `travel/${idTravel}/task/${taskId}/tag/${tagId}` : ``
      }`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(checkStatus)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },
  // REMOVE TAG FROM TASK
  removeTagFromTask: async ({
    hasToken = USE_TOKEN_BY_DEFAULT,
    idTravel,
    taskId,
    tagId,
  }: RemoveTagFromTaskType) => {
    const token = getToken();
    return fetch(
      `${url_prefix}/${
        idTravel ? `travel/${idTravel}/task/${taskId}/removetag/${tagId}` : ``
      }`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then(checkStatus)
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },

  getTravelById: async ({
    hasToken = USE_TOKEN_BY_DEFAULT,
    id,
  }: GetTravelByIdType) => {
    const token = getToken();
    return fetch(`${url_prefix}/travel/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  getAverageReview: async ({ idTravel }: GetAverageReviewType) => {
    const token = getToken();
    return fetch(`${url_prefix}/travel/${idTravel}/travelreview/average`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then(checkStatus)
      .then((res) => res.json());
  },

  // createWithFormData: async ({
  //   route,
  //   formData,
  //   hasToken = USE_TOKEN_BY_DEFAULT,
  //   idTravel
  // }: {
  //   route: string;
  //   formData: FormData;
  //   hasToken?: boolean;
  //   idTravel?:number
  // }) => {
  //   return tokenProvider.getToken().then((token) => {
  //   return fetch(`${url_prefix}/${idTravel ? `travel/${idTravel}/` : ``}${route}/`, {
  //     method: "POST",
  //     body: formData,
  //     headers : {
  //     authorization: `Bearer ${token}` ,
  //     }
  //   })
  //     .then(checkStatus)
  //     .then((res) => res.json())
  //     .catch((e) => console.log(e));
  //   // });
  // })
  // },
  // // FORMDATA
  // updateWithFormData: ({
  //   route,
  //   formData,
  //   hasToken = USE_TOKEN_BY_DEFAULT,
  // }: {
  //   route: string;
  //   formData: FormData;
  //   hasToken?: boolean;
  // }) => {
  //   // return getToken().then((token) => {
  //   return fetch(`${url_prefix}${route}/`, {
  //     method: "PUT",
  //     body: formData,
  //   })
  //     .then(checkStatus)
  //     .then((res) => res.json())
  //     .catch((e) => console.log(e));
  //   // });
  // },
};

export default api;

export type CreateType = {
  route: string;
  body: APIObject;
  hasToken?: boolean;
  idTravel?: number;
};
export type CreateWithFormDataType = {
  route: string;
  formData: FormData;
  hasToken?: boolean;
  idTravel?: number;
};
export type GetType = {
  route: string;
  hasToken?: boolean;
  idTravel?: number;
};
export type GetOneType = {
  route: string;
  id: number;
  hasToken?: boolean;
  idTravel?: number;
};
export type UpdateType = {
  route: string;
  id: number;
  body: APIObject;
  hasToken?: boolean;
  idTravel?: number;
};
export type UpdateWithFormDataType = {
  route: string;
  id: number;
  formData: FormData;
  hasToken?: boolean;
  idTravel?: number;
};
export type DeleteType = {
  route: string;
  id: number;
  hasToken?: boolean;
  idTravel?: number;
};
export type ReorderType = {
  route: string;
  body: APIObject[];
  hasToken?: boolean;
  idTravel?: number;
};
export type AssociateType = {
  hasToken?: boolean;
  idTravel?: number;
  idInterestPoint?: number;
  idStep?: number;
};
export type RemoveTagFromTaskType = {
  hasToken?: boolean;
  idTravel?: number;
  taskId?: number;
  tagId?: number;
};
export type AddTagsToTaskType = {
  hasToken?: boolean;
  idTravel?: number;
  taskId?: number;
  body: APIObject;
};
export type AddTagToTaskType = {
  hasToken?: boolean;
  idTravel?: number;
  taskId?: number;
  tagId?: number;
};
export type GetTravelByIdType = {
  hasToken?: boolean;
  id?: number;
};
export type GetAverageReviewType = {
  idTravel?: number;
};
