import { request } from "../utils/request";

export function getVideos(options = {}) {
  const params = new URLSearchParams();

  if (options.filter) {
    params.append("filter", JSON.stringify(options.filter));
  }
  if (options.page) params.append("page", options.page.toString());
  if (options.size) params.append("size", options.size.toString());
  if (options.search) params.append("search", options.search);
  if (options.sort) params.append("sort", options.sort);
  if (options.select) params.append("select", options.select);
  if (options.populate) params.append("populate", options.populate);
  if (options.populateSelect) {
    params.append("populateSelect", options.populateSelect);
  }

  return request({
    url: "/videos",
    method: "GET",
    params,
  });
}

export function createVideo(data) {
  return request({
    url: "/videos",
    method: "POST",
    data,
  });
}

export function updateVideo(id, data) {
  return request({
    url: `/videos/${id}`,
    method: "PATCH",
    data,
  });
}

export function deleteVideo(id) {
  return request({
    url: `/videos/${id}`,
    method: "DELETE",
  });
}
